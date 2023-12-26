import React, { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import { supabase } from "../supabase/supabase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userBookmarks, setUserBookmarks] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const deletePin = async (pinId) => {
    try {
      const { data, error } = await supabase
        .from("user_pins")
        .delete()
        .eq("id", pinId)
        .select();
      if (error) console.log(error);
      setUserBookmarks((prev) => prev.filter((item) => item.id !== pinId));
    } catch (err) {
      console.log(err, "error");
    }
  };
  const fetchUserData = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) console.log(error);
    setUserData(data);
  };
  const fetchUserBookmarks = async (userId) => {
    const { data, error } = await supabase
      .from("user_pins")
      .select("*")
      .eq("user_id", userId);
    if (error) console.log(error);
    setUserBookmarks(data);
  };
  const savePin = async (name, latitude, longitude) => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("user_pins")
        .insert([{ name, latitude, longitude, user_id: user.id }])
        .select();
      if (error) console.log(error);
      setUserBookmarks((prev) => [...prev, data[0]]);
    } catch (err) {
      console.log(err, "error");
    }
  };
  const updateUserData = async (firstName, lastName) => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ first_name: firstName, last_name: lastName })
        .eq("id", user.id)
        .select();
      if (error) console.log(error);
      setUserData(data[0]);
    } catch (err) {
      console.log(err, "error");
    }
  };
  // Auth State changed
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id);
        fetchUserBookmarks(session.user.id);
      }
      if (!session?.user) {
        setUserData(null);
        setUserBookmarks(null);
      }
    });
  }, []);

  // Ask location permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        userData,
        location,
        errorMsg,
        userBookmarks,
        savePin,
        updateUserData,
        deletePin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
