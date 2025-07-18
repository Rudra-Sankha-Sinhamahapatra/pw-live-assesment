import { NextRequest, NextResponse } from 'next/server';

const generateChartData = (period: 'day' | 'week') => {
  if (period === 'day') {
    return [
      { name: '6AM', hours: Math.random() * 2 + 0.5 },
      { name: '9AM', hours: Math.random() * 3 + 1 },
      { name: '12PM', hours: Math.random() * 4 + 2 },
      { name: '3PM', hours: Math.random() * 5 + 1.5 },
      { name: '6PM', hours: Math.random() * 6 + 2 },
      { name: '9PM', hours: Math.random() * 4 + 1 },
      { name: '12AM', hours: Math.random() * 2 + 0.5 },
    ];
  } else {
    return [
      { name: 'Mon', hours: Math.random() * 6 + 2 },
      { name: 'Tue', hours: Math.random() * 8 + 3 },
      { name: 'Wed', hours: Math.random() * 7 + 2.5 },
      { name: 'Thu', hours: Math.random() * 9 + 4 },
      { name: 'Fri', hours: Math.random() * 8 + 3.5 },
      { name: 'Sat', hours: Math.random() * 10 + 5 },
      { name: 'Sun', hours: Math.random() * 12 + 4 },
    ];
  }
};

const generateScreenTimeData = (period: 'day' | 'week') => {
  if (period === 'day') {
    return {
      dailyAverage: `${Math.floor(Math.random() * 5 + 1)}h ${Math.floor(Math.random() * 60)}m`,
      totalTime: `${Math.floor(Math.random() * 8 + 4)}h ${Math.floor(Math.random() * 60)}m`,
      percentageChange: Math.floor(Math.random() * 40 - 20), 
      period: 'today',
      chartData: generateChartData(period)
    };
  } else {
    return {
      dailyAverage: `${Math.floor(Math.random() * 3 + 2)}h ${Math.floor(Math.random() * 60)}m`,
      totalTime: `${Math.floor(Math.random() * 25 + 15)}h ${Math.floor(Math.random() * 60)}m`,
      percentageChange: Math.floor(Math.random() * 60 - 30),
      period: 'this week',
      chartData: generateChartData(period)
    };
  }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') as 'day' | 'week' || 'week';
    
    const data = generateScreenTimeData(period);
    
    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch screen time data' },
      { status: 500 }
    );
  }
}