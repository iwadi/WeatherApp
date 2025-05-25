import React, { useState, useEffect } from 'react';

function DayOfWeek() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const now = new Date();
    const msUntilMidnight = new Date(now.setHours(24, 0, 0, 0)).getTime() - now.getTime();

    const timer = setTimeout(() => {
      setCurrentDate(new Date());
      setInterval(() => {
        setCurrentDate(new Date());
      }, 1000 * 60 * 60 * 24); 
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  const dayString = currentDate.toLocaleDateString('ru-RU', {
    weekday: 'long', 
  });

  const capitalizedDayString = dayString.charAt(0).toUpperCase() + dayString.slice(1);

  return (
    <>
      <span>{capitalizedDayString}</span>
    </>
  )
}

export default DayOfWeek;