import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// JWT密钥 - 在生产环境中应该使用环境变量
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 测试密码加密
const TEST_PASSWORD = 'test123';
// 使用同步方法生成哈希，确保初始化时就有正确的哈希值
const TEST_PASSWORD_HASH = bcrypt.hashSync(TEST_PASSWORD, 10);

// 模拟用户数据 - 在实际应用中应该使用数据库
export const users = [
  {
    id: 1,
    email: 'test@example.com',
    // 密码: test123
    password: TEST_PASSWORD_HASH,
    name: '测试用户'
  }
];

// 生成JWT token
export function generateToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
}

// 验证密码
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    console.log('验证密码:', {
      plainPassword,
      hashedPassword,
      testHash: TEST_PASSWORD_HASH
    });
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('验证结果:', result);
    return result;
  } catch (error) {
    console.error('密码验证错误:', error);
    return false;
  }
}

// 根据邮箱查找用户
export function findUserByEmail(email: string) {
  return users.find(user => user.email === email);
}

// 用于开发：生成加密密码
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
} 