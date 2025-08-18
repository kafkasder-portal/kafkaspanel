import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/auth';

export function AuthDebugger() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const authStore = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Test Supabase connection
        const { data: session, error: sessionError } = await supabase.auth.getSession();
        
        // Test database query
        const { data: profiles, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .limit(1);

        setDebugInfo({
          supabaseConnected: !sessionError,
          sessionError: sessionError?.message,
          session: !!session?.session,
          user: session?.session?.user?.email,
          profileQueryWorks: !profileError,
          profileError: profileError?.message,
          profileCount: profiles?.length || 0,
          authStoreState: {
            user: !!authStore.user,
            session: !!authStore.session,
            profile: !!authStore.profile,
            loading: authStore.loading,
            initializing: authStore.initializing,
            error: authStore.error
          }
        });
      } catch (error) {
        setDebugInfo({
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    };

    checkAuth();
  }, [authStore]);

  if (!debugInfo) {
    return <div>Loading debug info...</div>;
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 text-sm">
      <h3 className="font-bold mb-2">🔧 Authentication Debug Info</h3>
      <pre className="whitespace-pre-wrap text-xs">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
}
