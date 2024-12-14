// 用户类型
export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
}

// 测试答案类型
export interface TestAnswer {
  questionId: number;
  value: string | number | string[];
}

// 测试答案集合类型
export interface TestAnswers {
  [key: number]: string | number | string[];
}

// 用户输入类型
export interface UserInput {
  username?: string;
  email?: string;
  password?: string;
}

// API 响应类型
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// 存储项类型
export interface StorageItem {
  id: string;
  createdAt: string;
  [key: string]: unknown;
} 