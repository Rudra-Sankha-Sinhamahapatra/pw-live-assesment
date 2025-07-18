import { NextRequest, NextResponse } from 'next/server';

const apps = [
  { name: "Instagram", logo: "/instagram (2) 1.png" },
  { name: "SnapChat", logo: "/Frame 1171276187 (4).png" },
  { name: "Youtube", logo: "/Frame 1171276187.png" },
  { name: "WhatsApp", logo: "/Frame 1171276187 (2).png" },
  { name: "Physics Wallah", logo: "/Frame 1171276187 (1).png" },
  { name: "Chrome", logo: "/Frame 1171276187 (3).png" },
];

const generateRandomTime = (maxHours: number) => {
  const hours = Math.floor(Math.random() * maxHours);
  const minutes = Math.floor(Math.random() * 60);
  
  if (hours === 0) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
};

const generateAppUsageData = (period: 'day' | 'week') => {
  const maxTime = period === 'day' ? 6 : 20; 
  const shuffledApps = [...apps].sort(() => Math.random() - 0.5);
  
  return shuffledApps.slice(0, 6).map((app, index) => {
    const basePercentage = period === 'day' ? 
      [90, 75, 60, 45, 30, 20][index] : 
      [95, 85, 70, 55, 40, 25][index];
    
    const percentage = basePercentage + Math.floor(Math.random() * 20 - 10);
    
    return {
      name: app.name,
      logo: app.logo,
      time: generateRandomTime(maxTime - index),
      percentage: Math.max(10, Math.min(100, percentage))
    };
  });
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') as 'day' | 'week' || 'week';
    
    const data = generateAppUsageData(period);
    
    return NextResponse.json({
      success: true,
      data,
      period
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch app usage data' },
      { status: 500 }
    );
  }
}
