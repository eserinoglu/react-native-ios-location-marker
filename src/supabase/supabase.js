import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://owszeebuzkdgauvaxqib.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93c3plZWJ1emtkZ2F1dmF4cWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0NDE5MzcsImV4cCI6MjAxOTAxNzkzN30.D_EmQOSpfBultX3I5SSpePd3hi05He6qgmySrmLLdZM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
