/**
 * Mock Authentication Service
 * Structured for easy future Firebase Auth / OAuth API integration.
 */

export interface AuthUser {
  uid: string;
  name: string;
  email: string;
  phone: string;
  photoURL?: string;
}

export const authService = {
  /**
   * Request OTP code for phone number or email address
   */
  async requestOtp(identifier: string): Promise<{ success: boolean; verificationId: string }> {
    // Simulate network latency
    await new Promise(res => setTimeout(res, 400));
    return {
      success: true,
      verificationId: `verif-${Date.now()}`
    };
  },

  /**
   * Verify OTP code (mock 6-digit code validation)
   */
  async verifyOtp(otpCode: string, identifier: string): Promise<{ success: boolean; user: AuthUser }> {
    await new Promise(res => setTimeout(res, 400));
    const isPhone = /^[0-9+ ]+$/.test(identifier);
    
    return {
      success: true,
      user: {
        uid: `user-${Date.now()}`,
        name: identifier.includes('@') ? identifier.split('@')[0] : 'Rajesh Sharma',
        email: isPhone ? 'user@apnaghar.com' : identifier,
        phone: isPhone ? identifier : '+91 98765 43210',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      }
    };
  },

  /**
   * Google Sign-In placeholder flow
   */
  async signInWithGoogle(): Promise<{ success: boolean; user: AuthUser }> {
    await new Promise(res => setTimeout(res, 500));
    return {
      success: true,
      user: {
        uid: `google-${Date.now()}`,
        name: 'Priya Sundaram',
        email: 'priya.sundaram@gmail.com',
        phone: '+91 98123 45678',
        photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
      }
    };
  },

  /**
   * Sign out user
   */
  async signOut(): Promise<void> {
    await new Promise(res => setTimeout(res, 200));
  }
};
