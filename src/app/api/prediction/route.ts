import { NextResponse } from 'next/server';
import { analyzePrediction, generateMatchingAdvice, type PredictionResult } from '@/utils/prediction';
import type { TestAnswers } from '@/types/common';

interface RequestBody {
  answers: TestAnswers;
  userId?: string;
}

// 初始化全局测试结果数组
if (!global.testResults) {
  global.testResults = [];
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as RequestBody;
    const { answers, userId } = body;

    // 验证请求数据
    if (!answers) {
      return NextResponse.json(
        { error: '请提供测试答案' },
        { status: 400 }
      );
    }

    // 生成预测结果
    const result = analyzePrediction(answers);
    
    // 生成额外的建议
    const additionalAdvice = generateMatchingAdvice(result);
    result.advice = [...result.advice, ...additionalAdvice];

    // 保存测试结果
    const testResult: TestResult = {
      id: Date.now().toString(),
      userId: userId || null,
      answers,
      ...result,
      createdAt: new Date().toISOString()
    };

    global.testResults.push(testResult);

    return NextResponse.json({
      success: true,
      result: {
        ...result,
        id: testResult.id
      }
    });

  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: '生成预测结果时发生错误' },
      { status: 500 }
    );
  }
} 