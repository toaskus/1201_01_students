import { NextRequest, NextResponse } from 'next/server';

// 간단한 인메모리 저장 (실제로는 DB 사용 권장)
// v1에서는 결과만 저장하고 관리자 페이지는 없음
const results: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const result = {
      id: `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      scores: body.scores,
      primaryTypes: body.primaryTypes,
      secondaryTypes: body.secondaryTypes,
      clientType: body.clientType,
      sessionId: body.sessionId,
    };

    results.push(result);

    // 실제 프로덕션에서는 DB에 저장
    // 예: await db.insert('test_results', result);

    return NextResponse.json({
      id: result.id,
      createdAt: result.createdAt,
    });
  } catch (error) {
    console.error('Error saving result:', error);
    return NextResponse.json(
      { error: 'Failed to save result' },
      { status: 500 }
    );
  }
}

// 개발용: 결과 조회 (v1에서는 공식 기능 아님)
export async function GET() {
  return NextResponse.json({
    count: results.length,
    results: results.slice(-10), // 최근 10개만
  });
}

