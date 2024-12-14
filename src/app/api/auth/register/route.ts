import { NextResponse } from 'next/server';
import { hashPassword } from '@/utils/auth-utils';
import type { User } from '@/types/common';

// 模拟用户存储
const users: User[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    // 验证请求数据
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: '请填写所有必填字段' },
        { status: 400 }
      );
    }

    // 检查邮箱是否已被注册
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 400 }
      );
    }

    // 创建新用户
    const hashedPassword = await hashPassword(password);
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword
    };

    // 保存用户数据
    users.push(newUser);

    // 返回成功响应
    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: '注册过程中发生错误' },
      { status: 500 }
    );
  }
} 