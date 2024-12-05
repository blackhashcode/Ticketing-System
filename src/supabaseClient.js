import { createClient } from '@supabase/supabase-js';

// Your Supabase URL and API Key
const supabaseUrl = 'https://uypwmotuasqmhhtibylz.supabase.co'; // replace with your project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5cHdtb3R1YXNxbWhodGlieWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5NjU4NDQsImV4cCI6MjA0ODU0MTg0NH0.j5lwZvl-p-MeGSIvAazZPTvqlrDKWgXa_XBpMPuIgLw'; // replace with your API key

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;


