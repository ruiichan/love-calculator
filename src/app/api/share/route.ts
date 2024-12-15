import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { getTestResults, addSharedResult, getSharedResults } from '@/utils/global-state';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { resultId } = body;

    if (!resultId) {
      return NextResponse.json(
        { error: '请提供测试结果ID' },
        { status: 400 }
      );
    }

    // 查找测试结果
    const testResult = getTestResults().find(result => result.id === resultId);
    if (!testResult) {
      return NextResponse.json(
        { error: '未找到测试结果' },
        { status: 404 }
      );
    }

    // 生成分享ID
    const shareId = nanoid(10);

    // 保存分享结果
    const sharedResult = {
      userId: testResult.userId,
      score: testResult.score,
      compatibility: testResult.compatibility,
      potential: testResult.potential,
      tags: testResult.tags,
      advice: testResult.advice,
      createdAt: new Date().toISOString()
    };

    addSharedResult(shareId, sharedResult);

    return NextResponse.json({
      success: true,
      shareId
    });

  } catch (error) {
    console.error('Share error:', error);
    return NextResponse.json(
      { error: '分享过程中发生错误' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const shareId = url.searchParams.get('id');

    if (!shareId) {
      return NextResponse.json(
        { error: '请提供分享ID' },
        { status: 400 }
      );
    }

    // 获取分享的结果
    const sharedResults = getSharedResults();
    const result = sharedResults[shareId];

    if (!result) {
      return NextResponse.json(
        { error: '分享的结果不存在或已过期' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      result: {
        score: result.score,
        compatibility: result.compatibility,
        potential: result.potential,
        tags: result.tags,
        advice: result.advice
      }
    });

  } catch (error) {
    console.error('Get shared result error:', error);
    return NextResponse.json(
      { error: '获取分享结果时发生错误' },
      { status: 500 }
    );
  }
} 