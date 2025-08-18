// Mock authentication service for development
export const mockAuth = {
  isEnabled: import.meta.env.VITE_MOCK_API === 'true',
  
  // Mock user data
  mockUser: {
    id: 1,
    email: 'demo@example.com',
    role: 'admin',
    name: 'Demo User'
  },

  // Mock login function
  async login(credentials: { email: string; password: string }) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.email === 'demo@example.com' && credentials.password === 'demo') {
      const tokens = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token'
      };
      
      return {
        success: true,
        user: this.mockUser,
        ...tokens
      };
    }
    
    throw new Error('Invalid credentials. Use demo@example.com / demo');
  },

  // Mock session validation
  async validateSession() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      user: this.mockUser
    };
  },

  // Mock token refresh
  async refreshToken() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      accessToken: 'mock-access-token-refreshed',
      refreshToken: 'mock-refresh-token-refreshed'
    };
  },

  // Mock logout
  async logout() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  }
};

// Helper to check if we should use mock auth
export const shouldUseMockAuth = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  return mockAuth.isEnabled || 
         !supabaseUrl || 
         !supabaseKey || 
         supabaseUrl.includes('placeholder') || 
         supabaseUrl.includes('your_') ||
         supabaseKey.includes('placeholder') ||
         supabaseKey.includes('your_');
};
