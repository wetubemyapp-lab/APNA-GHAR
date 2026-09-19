import { Property, Project, User, ChatThread, NotificationItem } from '../types';
import { INITIAL_PROPERTIES, FEATURED_PROJECTS, INITIAL_USER, INITIAL_CHAT_THREADS, INITIAL_NOTIFICATIONS } from '../data/mockData';

/**
 * Decoupled Property repository contract
 */
export class MockPropertyRepository {
  public static async getAll(): Promise<Property[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve([...INITIAL_PROPERTIES]), 100);
    });
  }

  public static async getById(id: string): Promise<Property | null> {
    return new Promise(resolve => {
      const item = INITIAL_PROPERTIES.find(p => p.id === id) || null;
      setTimeout(() => resolve(item), 80);
    });
  }

  public static async create(property: Property): Promise<Property> {
    return new Promise(resolve => {
      setTimeout(() => resolve(property), 150);
    });
  }

  public static async update(id: string, updates: Partial<Property>): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => resolve(true), 120);
    });
  }
}

/**
 * Decoupled Project repository contract
 */
export class MockProjectRepository {
  public static async getAll(): Promise<Project[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve([...FEATURED_PROJECTS]), 100);
    });
  }

  public static async getById(id: string): Promise<Project | null> {
    return new Promise(resolve => {
      const item = FEATURED_PROJECTS.find(p => p.id === id) || null;
      setTimeout(() => resolve(item), 80);
    });
  }
}

/**
 * Decoupled User repository contract
 */
export class MockUserRepository {
  public static async getProfile(userId: string): Promise<User | null> {
    return new Promise(resolve => {
      setTimeout(() => resolve({ ...INITIAL_USER }), 100);
    });
  }

  public static async updateProfile(userId: string, updates: Partial<User>): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => resolve(true), 120);
    });
  }
}

/**
 * Decoupled Chat Threads repository contract
 */
export class MockMessageRepository {
  public static async getAllThreads(): Promise<ChatThread[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve([...INITIAL_CHAT_THREADS]), 100);
    });
  }

  public static async getThreadById(id: string): Promise<ChatThread | null> {
    return new Promise(resolve => {
      const item = INITIAL_CHAT_THREADS.find(t => t.id === id) || null;
      setTimeout(() => resolve(item), 80);
    });
  }
}

/**
 * Decoupled Notifications repository contract
 */
export class MockNotificationRepository {
  public static async getAll(): Promise<NotificationItem[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve([...INITIAL_NOTIFICATIONS]), 100);
    });
  }

  public static async markAsRead(id: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => resolve(true), 50);
    });
  }
}
export default {
  MockPropertyRepository,
  MockProjectRepository,
  MockUserRepository,
  MockMessageRepository,
  MockNotificationRepository
};
