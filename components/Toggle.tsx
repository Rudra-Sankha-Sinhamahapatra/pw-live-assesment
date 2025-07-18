'use client';

import { useState } from 'react';

type ToggleOption = 'Day' | 'Week';

interface ToggleProps {
  defaultOption?: ToggleOption;
  onToggle?: (option: ToggleOption) => void;
}

export const Toggle = ({ defaultOption = 'Week', onToggle }: ToggleProps) => {
  const [selected, setSelected] = useState<ToggleOption>(defaultOption);

  const handleToggle = (option: ToggleOption) => {
    setSelected(option);
    onToggle?.(option);
  };

  return (
    <div className="relative inline-flex items-center bg-neutral-700 rounded-full p-1 border border-gray-600">
      <div
        className={`absolute top-1 bottom-1 w-1/2 bg-black rounded-full transition-all duration-300 ease-in-out ${
          selected === 'Week' ? 'left-1' : 'left-1/2'
        }`}
      />
      
      <button
        onClick={() => handleToggle('Week')}
        className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-in-out min-w-[60px] ${
          selected === 'Week'
            ? 'text-white'
            : 'text-gray-300 hover:text-white'
        }`}
      >
        Week
      </button>
      
      <button
        onClick={() => handleToggle('Day')}
        className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-in-out min-w-[60px] ${
          selected === 'Day'
            ? 'text-white'
            : 'text-gray-300 hover:text-white'
        }`}
      >
        Day
      </button>
    </div>
  );
}; 