import { NextResponse } from 'next/server';
import { verifyPassword, generateToken } from '@/utils/auth-utils';

// 使用注册API中的用户数组
declare global {
  var users: any[];
}

if (!global.users) {
  global.users = [];
}

export async function POST(request: Request) {
  try {
    // 解析请求体
    const body = await request.json();
    const { email, password } = body;

    // 验证请求数据
    if (!email || !password) {
      return NextResponse.json(
        { error: '请提供邮箱和密码' },
        { status: 400 }
      );
    }

    // 查找用户
    const user = global.users.find(u => u.email === email);
    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 401 }
      );
    }

    // 验证密码
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: '密码错误' },
        { status: 401 }
      );
    }

    // 生成token
    const token = generateToken(user.id);

    // 返回成功响应
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: '登录过程中发生错误' },
      { status: 500 }
    );
  }
} 