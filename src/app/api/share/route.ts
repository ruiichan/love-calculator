import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

// 初始化全局分享结果对象
if (!global.sharedResults) {
  global.sharedResults = {};
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { result, userId } = body;

    if (!result) {
      return NextResponse.json(
        { error: '请提供预测结果' },
        { status: 400 }
      );
    }

    // 生成分享ID
    const shareId = nanoid(10);
    
    // 保存结果
    const sharedResult: SharedResult = {
      userId: userId || null,
      ...result,
      createdAt: new Date().toISOString()
    };
    
    global.sharedResults[shareId] = sharedResult;

    // 生成分享链接
    const shareUrl = `/share/${shareId}`;

    return NextResponse.json({
      success: true,
      shareId,
      shareUrl
    });

  } catch (error) {
    console.error('Share error:', error);
    return NextResponse.json(
      { error: '生成分享链接时发生错误' },
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
    const result = global.sharedResults[shareId];

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