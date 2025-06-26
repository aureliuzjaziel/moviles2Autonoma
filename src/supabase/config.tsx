import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://ykzyurhnblafwmlxcrrx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrenl1cmhuYmxhZndtbHhjcnJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDM4OTAsImV4cCI6MjA2NTQ3OTg5MH0.oeXr2amizdIDNMy1Xo3HbVHpfLsXjdoC4xkky8bNVec');