declare global {
  // 用户类型
  interface User {
    id: string;
    email: string;
    password: string;
    username: string;
  }

  // 测试结果类型
  interface TestResult {
    id: string;
    userId: string | null;
    answers: TestAnswers;
    score: number;
    compatibility: number;
    potential: number;
    tags: string[];
    advice: string[];
    createdAt: string;
  }

  // 分享结果类型
  interface SharedResult {
    userId: string | null;
    score: number;
    compatibility: number;
    potential: number;
    tags: string[];
    advice: string[];
    createdAt: string;
  }

  // 扩展全局变量
  var users: User[];
  var testResults: TestResult[];
  var sharedResults: Record<string, SharedResult>;
}

export {}; 