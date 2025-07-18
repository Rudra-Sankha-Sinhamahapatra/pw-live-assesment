"use client"
import graph1 from "@/public/graph-long.png"
import { ScreenTimeData } from "@/utils/screenTimedata";
import Image from "next/image"

interface GraphsHeroProps {
    period: 'day' | 'week';
    screenTimeData: ScreenTimeData | null;
    loading: boolean;
}

export const GraphsHero = ({ period, screenTimeData, loading }: GraphsHeroProps) => {
    if (loading) {
        return (
            <div className="flex justify-between items-center max-w-4xl mx-auto px-8 py-6 animate-pulse">
                <div className="flex flex-col">
                    <div className="h-4 bg-gray-600 rounded mb-1 w-24"></div>
                    <div className="h-8 bg-gray-600 rounded w-32"></div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="w-15 h-15 bg-gray-600 rounded"></div>
                    <div className="flex items-center gap-1">
                        <div className="h-6 bg-gray-600 rounded w-6"></div>
                        <div className="h-6 bg-gray-600 rounded w-32"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!screenTimeData) return null;

    const isPositive = screenTimeData.percentageChange >= 0;
    const changeText = `${Math.abs(screenTimeData.percentageChange)}% from last ${period === 'day' ? 'day' : 'week'}`;

    return (
        <div className="flex justify-between items-center max-w-4xl mx-auto px-8 py-6">
            <div className="flex flex-col">
                <p className="text-gray-400 text-sm mb-1">{period==='day'?"Daily":"Weekly"} Average</p>
                <p className="text-white text-3xl font-bold">{screenTimeData.dailyAverage}</p>
            </div>
            
            <div className="flex items-center gap-4">
                <Image src={graph1} alt="graph1" height={60} width={60}/>
                <div className="flex items-center gap-1">
                    <span className={`text-xl ${isPositive ? 'text-red-500' : 'text-green-500'}`}>
                        {isPositive ? '📈' : '📉'}
                    </span>
                    <h3 className="text-white font-semibold">{changeText}</h3>
                </div>
            </div>
        </div>
    )
}