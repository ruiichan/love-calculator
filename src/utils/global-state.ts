import type { User, TestAnswers } from '@/types/common';

// 全局状态接口
interface GlobalState {
  users: User[];
  testResults: {
    id: string;
    userId: string | null;
    answers: TestAnswers;
    score: number;
    compatibility: number;
    potential: number;
    tags: string[];
    advice: string[];
    createdAt: string;
  }[];
  sharedResults: Record<string, {
    userId: string | null;
    score: number;
    compatibility: number;
    potential: number;
    tags: string[];
    advice: string[];
    createdAt: string;
  }>;
}

// 初始化全局状态
const globalState: GlobalState = {
  users: [],
  testResults: [],
  sharedResults: {}
};

// 获取用户列表
export const getUsers = () => globalState.users;

// 设置用户列表
export const setUsers = (users: User[]) => {
  globalState.users = users;
};

// 添加用户
export const addUser = (user: User) => {
  globalState.users.push(user);
};

// 获取测试结果列表
export const getTestResults = () => globalState.testResults;

// 添加测试结果
export const addTestResult = (result: GlobalState['testResults'][0]) => {
  globalState.testResults.push(result);
};

// 获取分享结果
export const getSharedResults = () => globalState.sharedResults;

// 添加分享结果
export const addSharedResult = (id: string, result: GlobalState['sharedResults'][string]) => {
  globalState.sharedResults[id] = result;
}; 