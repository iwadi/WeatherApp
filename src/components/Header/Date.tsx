import React, { useState, useEffect } from 'react';

function DateDisplay() {
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

    const months = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
    ];

    const day = currentDate.getDate(); 
    const monthIndex = currentDate.getMonth(); 
    const capitalizedMonth = months[monthIndex];

    const dateString = `${day} ${capitalizedMonth}`;

    return (
        <>
            <span>{dateString}</span>
        </>
    )
}

export default DateDisplay;