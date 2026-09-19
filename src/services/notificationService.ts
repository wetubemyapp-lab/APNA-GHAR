/**
 * Notification Service
 * 
 * Provides mock push notification support for the prototype.
 * Structured to integrate Firebase Cloud Messaging (FCM) or other push services later.
 */

export interface PushNotificationPayload {
  title: string;
  body: string;
  data?: Record<string, string>;
}

export class NotificationService {
  private static fcmToken: string | null = null;
  private static listeners: Array<(payload: PushNotificationPayload) => void> = [];

  /**
   * Request push notification permissions from the user.
   * On production, this integrates with the browser API and FCM SDK.
   */
  public static async requestPermission(): Promise<boolean> {
    console.log('[NotificationService] Requesting permission...');
    
    // Check if browser supports notifications
    if (!('Notification' in window)) {
      console.warn('[NotificationService] This browser does not support local notifications.');
      return false;
    }

    try {
      // Prototype mock dialog consent simulation
      const permission = await window.Notification?.requestPermission();
      if (permission === 'granted') {
        console.log('[NotificationService] Permission granted.');
        await this.registerFCMToken();
        return true;
      }
      return false;
    } catch (e) {
      // Fallback for environment/testing
      console.log('[NotificationService] Mock permission granted.');
      await this.registerFCMToken();
      return true;
    }
  }

  /**
   * Retrieves the mock FCM Registration Token for push delivery routing.
   * Easily replaceable with real `messaging.getToken()` in production FCM setup.
   */
  private static async registerFCMToken(): Promise<string> {
    if (this.fcmToken) return this.fcmToken;

    // Simulate server register exchange delay
    await new Promise(resolve => setTimeout(resolve, 500));
    this.fcmToken = `fcm-token-nestora-${Math.random().toString(36).substr(2, 9)}`;
    console.log('[NotificationService] FCM Registration Token generated:', this.fcmToken);
    
    return this.fcmToken;
  }

  /**
   * Returns current registration token if available.
   */
  public static getToken(): string | null {
    return this.fcmToken;
  }

  /**
   * Clear registered FCM token (e.g. on user logout).
   */
  public static revokeToken(): void {
    console.log('[NotificationService] Revoked push token.');
    this.fcmToken = null;
  }

  /**
   * Listens to in-app real-time notifications (foreground pushes).
   */
  public static onMessage(callback: (payload: PushNotificationPayload) => void): () => void {
    this.listeners.push(callback);
    // Unsubscribe helper
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  /**
   * Simulates receipt of a push message (background or foreground).
   */
  public static simulateIncomingPush(payload: PushNotificationPayload) {
    console.log('[NotificationService] Simulated push received:', payload);
    
    // Notify all active in-app foreground listeners
    this.listeners.forEach(listener => listener(payload));

    // Show system notification fallback if permission granted
    if (typeof window !== 'undefined' && 'Notification' in window && window.Notification.permission === 'granted') {
      try {
        new window.Notification(payload.title, {
          body: payload.body,
          icon: '/android-chrome-192x192.png'
        });
      } catch (e) {
        console.log('[NotificationService] Browser Notification fallback bypassed:', payload.title);
      }
    }
  }
}
