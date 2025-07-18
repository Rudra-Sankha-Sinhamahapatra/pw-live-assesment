export interface ScreenTimeData {
    dailyAverage: string;
    totalTime: string;
    percentageChange: number;
    period: string;
    chartData: Array<{
        name: string;
        hours: number;
    }>;
}