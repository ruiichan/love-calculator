import { NextResponse } from 'next/server';
import { getSharedResults } from '@/utils/global-state';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const shareId = params.id;

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
      result
    });

  } catch (error) {
    console.error('Get shared result error:', error);
    return NextResponse.json(
      { error: '获取分享结果时发生错误' },
      { status: 500 }
    );
  }
}