"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface AppUsage {
    name: string;
    logo: string;
    time: string;
    percentage: number;
}

interface UsageProps {
    period: 'day' | 'week';
}

export const Usage = ({ period }: UsageProps) => {
    const [appUsageData, setAppUsageData] = useState<AppUsage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppUsage = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/app-usage?period=${period}`);
                const result = await response.json();
                
                if (result.success) {
                    setAppUsageData(result.data);
                }
            } catch (error) {
                console.error('Failed to fetch app usage:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppUsage();
    }, [period]);

    if (loading) {
        return (
            <div className="bg-gray-100 mx-6 my-8 rounded-3xl">
                <div className="bg-white mx-4 pt-6 pb-4 px-6 rounded-3xl">
                    <h2 className="text-black text-2xl font-bold mb-6">Most Used</h2>
                    <div className="space-y-6">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="flex items-center justify-between animate-pulse">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded mb-2 w-24"></div>
                                        <div className="w-full bg-gray-200 rounded-full h-2"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 ml-4">
                                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 mx-6 my-8 rounded-3xl">
            <div className="bg-white mx-4 pt-6 pb-4 px-6 rounded-3xl">
                <h2 className="text-black text-2xl font-bold mb-6">Most Used</h2>
                <div className="space-y-6">
                    {appUsageData.map((app, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image 
                                        src={app.logo} 
                                        alt={`${app.name} logo`} 
                                        width={48} 
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-black font-semibold text-lg mb-2">{app.name}</h3>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-gray-400 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${app.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 ml-4">
                                <span className="text-gray-600 font-medium">{app.time}</span>
                                <svg 
                                    className="w-5 h-5 text-gray-400" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}