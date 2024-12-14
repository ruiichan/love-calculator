'use client';
import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 检查本地存储的登录状态
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // TODO: 实现实际的登录逻辑，目前使用模拟数据
  const login = async (email: string, _password: string) => {
    // 在实际实现中，这里应该：
    // 1. 调用后端 API 进行密码验证
    // 2. 获取用户信息和认证令牌
    // 3. 存储认证状态
    const mockUser = { id: '1', username: 'test', email };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  // TODO: 实现实际的注册逻辑，目前使用模拟数据
  const register = async (username: string, email: string, _password: string) => {
    // 在实际实现中，这里应该：
    // 1. 调用后端 API 创建新用户
    // 2. 进行密码加密
    // 3. 获取注册成功后的用户信息
    const mockUser = { id: '1', username, email };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 