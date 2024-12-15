import type { User } from '@/types/common';

// 用户数据存储
export const saveUser = (user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const getUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// 测试结果存储
export const saveTestResult = (result: TestResult): string => {
  if (typeof window !== 'undefined') {
    const results = getTestResults();
    const newResult = {
      ...result,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    results.push(newResult);
    localStorage.setItem('testResults', JSON.stringify(results));
    return newResult.id;
  }
  return '';
};

export const getTestResults = (): TestResult[] => {
  if (typeof window !== 'undefined') {
    const results = localStorage.getItem('testResults');
    return results ? JSON.parse(results) : [];
  }
  return [];
};

export const getTestResultById = (id: string): TestResult | null => {
  if (typeof window !== 'undefined') {
    const results = getTestResults();
    return results.find((result) => result.id === id) || null;
  }
  return null;
};

// 分享功能
export const saveSharedResult = (result: SharedResult): string => {
  if (typeof window !== 'undefined') {
    const shareId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const sharedResults = getSharedResults();
    sharedResults[shareId] = {
      ...result,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('sharedResults', JSON.stringify(sharedResults));
    return shareId;
  }
  return '';
};

export const getSharedResults = (): Record<string, SharedResult> => {
  if (typeof window !== 'undefined') {
    const results = localStorage.getItem('sharedResults');
    return results ? JSON.parse(results) : {};
  }
  return {};
};

export const getSharedResultById = (shareId: string): SharedResult | null => {
  if (typeof window !== 'undefined') {
    const results = getSharedResults();
    return results[shareId] || null;
  }
  return null;
}; 