// 用户数据存储
export const saveUser = (user: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// 测试结果存储
export const saveTestResult = (result: any) => {
  if (typeof window !== 'undefined') {
    const results = getTestResults();
    results.push({
      ...result,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('testResults', JSON.stringify(results));
    return result.id;
  }
};

export const getTestResults = () => {
  if (typeof window !== 'undefined') {
    const results = localStorage.getItem('testResults');
    return results ? JSON.parse(results) : [];
  }
  return [];
};

export const getTestResultById = (id: string) => {
  if (typeof window !== 'undefined') {
    const results = getTestResults();
    return results.find((result: any) => result.id === id);
  }
  return null;
};

// 分享功能
export const saveSharedResult = (result: any) => {
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
};

export const getSharedResults = () => {
  if (typeof window !== 'undefined') {
    const results = localStorage.getItem('sharedResults');
    return results ? JSON.parse(results) : {};
  }
  return {};
};

export const getSharedResultById = (shareId: string) => {
  if (typeof window !== 'undefined') {
    const results = getSharedResults();
    return results[shareId] || null;
  }
  return null;
}; 