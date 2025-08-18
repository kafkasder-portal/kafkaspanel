// Quick test to verify Supabase connection
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ibqhfgpdgzrhvyfpgjxx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlicWhmZ3BkZ3pyaHZ5ZnBnanh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMDk3NDcsImV4cCI6MjA3MDY4NTc0N30.1vSikm9_Dn978BctKWXhoOfPCKztLaBNgr8OEIVIXNg';

const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection
async function testConnection() {
  try {
    const { data, error } = await supabase.from('beneficiaries').select('count').limit(1);
    if (error) {
      console.log('⚠️  Table access error (expected for new projects):', error.message);
      return false;
    }
    console.log('✅ Supabase connection successful!');
    return true;
  } catch (err) {
    console.error('❌ Supabase connection failed:', err.message);
    return false;
  }
}

export { testConnection };
