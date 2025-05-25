import React, { useState, useEffect } from 'react';

function Time() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentTime(new Date());
        }, 0);

        return () => clearInterval(timer);
    }, []);

    const timeString = currentTime.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <>
            <span>{timeString}</span>
        </>
    )
}

export default Time;