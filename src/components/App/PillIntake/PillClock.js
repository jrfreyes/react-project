import React, { useEffect, useState } from "react";
import Clock from "react-clock";

export default function PillClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => {
            clearInterval(interval);
        };
    });

    return (
        <React.Fragment>
            <div className="PillClock center">
                <Clock value={time} />
            </div>
            <p className="center">
                {time.toLocaleString('default', { 'day': 'numeric', 'month': 'long' })}
            </p>
        </React.Fragment>
    );

}
