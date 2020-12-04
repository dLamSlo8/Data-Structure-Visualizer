import React, { useRef, useState, useEffect } from 'react';

export default function DataStructureLayout({ actions, visualization, propagateDimensions }) {
    const [mounted, setMounted] = useState(false);

    const visualizationRef = useRef(null);

    // Need to wait for after initial mount to get ref information.
    useEffect(() => { 
        setMounted(true);
    }, []);

    console.log(visualizationRef.current);
    return (
        <main className="flex-grow flex">
            <section className="flex-none w-1/3 py-5 px-8 border-r-2 border-gray-300">
                <h2 className="inline-block border-b-4 border-primary mb-5 font-bold text-2xl">Actions</h2>
                <div> {/* This div is essential for styling the sections (uses first-child) */}
                    {actions}
                </div>
            </section>
            <section className="flex-grow flex flex-col py-5 px-8">
                <h2 className="inline-block self-start border-b-4 border-primary mb-5 font-bold text-2xl">Visualization</h2>
                <div className="flex-grow" ref={visualizationRef}>
                    {
                        propagateDimensions && mounted ? visualization({ width: visualizationRef.current.offsetWidth, height: visualizationRef.current.offsetHeight }) : visualization
                    }
                </div>
            </section>
        </main>
    )
}