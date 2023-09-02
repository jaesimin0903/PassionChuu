"use client"

import { useState, useEffect ,FC} from 'react';

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

function getDayOfWeek(date: Date): number {
    return date.getDay();
}



const Calendar :FC = () =>{
    const [days, setDays] = useState<number[]>([]);
    const [todayDate, setTodayDate] = useState<string>('');
    const [startDay, setStartDay] = useState<number>(0);
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());

const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => {
        if (prevMonth === 0) {
            setCurrentYear(prevYear => prevYear - 1);
            return 11;
        }
        return prevMonth - 1;
    });
};

const goToNextMonth = () => {
    setCurrentMonth(prevMonth => {
        if (prevMonth === 11) {
            setCurrentYear(prevYear => prevYear + 1);
            return 0;
        }
        return prevMonth + 1;
    });
};



useEffect(() => {
    const daysInThisMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    const start = getDayOfWeek(new Date(currentYear, currentMonth, 1));

    setStartDay(start);

    const daysArray: number[] = [];

    for (let i = daysInLastMonth - start + 1; i <= daysInLastMonth; i++) {
        daysArray.push(i);
    }

    for (let i = 1; i <= daysInThisMonth; i++) {
        daysArray.push(i);
    }

    let nextDay = 1;
    while (daysArray.length < 42) {
        daysArray.push(nextDay);
        nextDay++;
    }

    setDays(daysArray);
}, [currentYear, currentMonth]);





    return (
        <div className="p-8">
            <h1 className="text-xl font-bold mb-6">오늘 날짜: {new Date(currentYear, currentMonth).toDateString()}</h1>
        
        <div className="flex justify-between mb-4">
            <button onClick={goToPreviousMonth} className="bg-blue-500 text-white px-4 py-2 rounded">←</button>
            <div className='text-xl font-bold'>{new Date(currentYear,currentMonth).getFullYear()} 년 {new Date(currentYear,currentMonth).getMonth()+1} 월</div>
            <button onClick={goToNextMonth} className="bg-blue-500 text-white px-4 py-2 rounded">→</button>
        </div>
            
            <div className="grid grid-cols-7 gap-4 mb-4">
                {daysOfWeek.map(day => (
                    <div key={day} className="text-center font-medium">{day}</div>
                ))}
            </div>
    
            <div className="grid grid-cols-7 gap-4">
    {days.map((day, index) => (
        <div 
            key={`${day}-${index}`} 
            className={`
                border border-gray-300 p-4 
                ${index < startDay ? 'text-gray-400 bg-gray-200' : ''}
                ${index >= startDay + new Date(currentYear, currentMonth + 1, 0).getDate() ? 'text-gray-400 bg-gray-200' : ''}
            `}
        >
            <span className="block text-center mb-2">{day}</span>
            <input type="text" placeholder="근무 내용" className="w-full px-2 py-1 border border-gray-300 rounded" />
        </div>
    ))}
</div>
        </div>
    );
    
}

export default Calendar