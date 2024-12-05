from supabase import create_client, Client

# Your Supabase URL and Key from the Supabase project settings
url = "https://uypwmotuasqmhhtibylz.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5cHdtb3R1YXNxbWhodGlieWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5NjU4NDQsImV4cCI6MjA0ODU0MTg0NH0.j5lwZvl-p-MeGSIvAazZPTvqlrDKWgXa_XBpMPuIgLw"
supabase: Client = create_client(url, key)
