'use client';

import Image from "next/image";
import leftNavbarIcon from "@/public/Left Nav Icons.png"
import { Graphs } from "@/components/Graph";
import { Toggle } from "@/components/Toggle";
import { GraphsHero } from "@/components/GraphHero";
import { Usage } from "@/components/Usage";
import { ScreenTimeData } from "@/utils/screenTimedata";
import { useState, useEffect } from "react";

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState<'Day' | 'Week'>('Week');
  const [screenTimeData, setScreenTimeData] = useState<ScreenTimeData | null>(null);
  const [loading, setLoading] = useState(true);

  const apiPeriod = selectedPeriod.toLowerCase() as 'day' | 'week';

  useEffect(() => {
    const fetchScreenTime = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/screen-time?period=${apiPeriod}`);
        const result = await response.json();
        
        if (result.success) {
          setScreenTimeData(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch screen time:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScreenTime();
  }, [apiPeriod]);

  const handleToggleChange = (option: 'Day' | 'Week') => {
    setSelectedPeriod(option);
  };

  return (
   <div className="bg-black min-h-screen">
    <div className="relative flex items-center py-12">
      <div className="absolute left-0">
        <Image src={leftNavbarIcon} alt="left-nav" height={100} width={100} />
      </div>
      
      <div className="flex-1 text-center">
        <h1 className="text-white text-2xl font-semibold">Screen Time</h1>
      </div>
    </div>
     
     <div className="flex justify-center mb-8">
       <Toggle defaultOption={selectedPeriod} onToggle={handleToggleChange} />
     </div>
     
     <GraphsHero 
       period={apiPeriod} 
       screenTimeData={screenTimeData} 
       loading={loading} 
     />
     <Graphs 
       screenTimeData={screenTimeData} 
       loading={loading} 
       period={apiPeriod}
     />
     
     <Usage period={apiPeriod} />
   </div>
  );
}
