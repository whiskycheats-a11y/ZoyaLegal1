import React, { useEffect, useState } from 'react';

const TopProgressBar: React.FC = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(30);
        const timer = setTimeout(() => {
            setWidth(100);
        }, 500);

        const hideTimer = setTimeout(() => {
            setWidth(-1); // Hide
        }, 800);

        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    if (width === -1) return null;

    return (
        <div
            id="top-progress-bar"
            style={{ width: `${width}%`, opacity: width === 100 ? 0 : 1 }}
        />
    );
};

export default TopProgressBar;
