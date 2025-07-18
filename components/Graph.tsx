"use client"

import { ScreenTimeData } from "@/utils/screenTimedata"

const work = [
    {
        title: "learning",
        time:"52m 3s",
        color:"blue-600"
    },
    {
        title: "Entertainment",
        time:"52m 3s",
        color: "blue-400"
    },
    {
        title: "Games",
        time:"1h 35m",
        color:"amber-400"
    }
]

const colorMap: Record<string, string> = {
    'blue-600': 'text-blue-600',
    'blue-400': 'text-blue-400', 
    'amber-400': 'text-amber-400'
}

interface GraphsProps {
    screenTimeData: ScreenTimeData | null;
    loading: boolean;
    period: 'day' | 'week';
}

export const Graphs = ({ screenTimeData, loading, period }: GraphsProps) => {
    const maxHours = screenTimeData?.chartData?.length 
        ? Math.max(...screenTimeData.chartData.map(item => item.hours)) 
        : 12;


    const yAxisLabels = [];
    const stepSize = 2;
    const maxLabel = Math.ceil(maxHours / stepSize) * stepSize; 
    for (let i = maxLabel; i >= 0; i -= stepSize) {
        yAxisLabels.push(i);
    }

    const loadingHeights = ['120px', '80px', '140px', '60px', '100px', '90px', '110px'];

    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center mt-24 w-full">
                <div className="w-full max-w-4xl bg-black rounded-3xl p-8 mx-6">
                    {loading ? (
                        <div className="relative">
                            <div className="absolute left-0 top-0 h-80 flex flex-col justify-between text-gray-400 text-sm w-12">
                                <div className="text-right pr-2">12h</div>
                                <div className="text-right pr-2">10h</div>
                                <div className="text-right pr-2">8h</div>
                                <div className="text-right pr-2">6h</div>
                                <div className="text-right pr-2">4h</div>
                                <div className="text-right pr-2">2h</div>
                                <div className="text-right pr-2">0h</div>
                            </div>
                            
                            <div className="flex items-end justify-between h-80 ml-16">
                                {loadingHeights.map((height, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <div 
                                            className="w-12 bg-gray-700 rounded-t animate-pulse" 
                                            style={{height}}
                                        />
                                        <div className="text-white text-xs font-medium mt-2 animate-pulse">
                                            <div className="w-8 h-3 bg-gray-700 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="relative">
                        
                            <div className="absolute left-0 top-0 h-80 flex flex-col justify-between text-gray-400 text-sm w-12">
                                {yAxisLabels.map((hour, index) => (
                                    <div key={index} className="text-right pr-2 -mt-1">
                                        {hour}h
                                    </div>
                                ))}
                            </div>

    
                            <div className="absolute left-12 right-0 top-0 h-80 pointer-events-none">
                                {yAxisLabels.map((_, index) => (
                                    <div 
                                        key={index} 
                                        className="absolute w-full border-t border-gray-700 opacity-30"
                                        style={{ top: `${(index / (yAxisLabels.length - 1)) * 100}%` }}
                                    />
                                ))}
                            </div>

             
                            <div className="flex items-end justify-between h-80 ml-16">
                          
                                {screenTimeData?.chartData?.map((item, index) => {
                                    const heightPixels = (item.hours / maxHours) * 300; 
                                    const minHeightPixels = 20; 
                                    const finalHeight = Math.max(heightPixels, minHeightPixels);
                                    
                                    return (
                                        <div key={index} className="flex flex-col items-center">
                                            <div 
                                                className="w-12 rounded-t-lg transition-all duration-700 ease-out"
                                                style={{ 
                                                    height: `${finalHeight}px`,
                                                    background: 'linear-gradient(180deg, #1E40AF 0%, #3B82F6 40%, #60A5FA 70%, #93C5FD 100%)'
                                                }}
                                            />
                                            <div className="text-white text-xs font-medium mt-2">
                                                {item.name}
                                            </div>
                                        </div>
                                    );
                                }) || (
                                    <div className="text-white text-center py-8 w-full">
                                        No chart data available
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-between w-full max-w-md mt-8">
                    {work.map((workItem, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <h3 className={`${colorMap[workItem.color]} font-semibold capitalize mb-1`}>
                                {workItem.title}
                            </h3>
                            <p className="text-white text-sm">
                                {workItem.time}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="h-px bg-white my-8 mx-16"></div>
                <div className="flex justify-between gap-64 my-24">
                    <h3 className="text-gray-300 font-bold">Total Screen Time</h3>
                    {loading ? (
                        <div className="h-6 bg-gray-600 rounded w-16 animate-pulse"></div>
                    ) : (
                        <p className="text-white font-bold">
                            {screenTimeData?.totalTime || "15h 49m"}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}