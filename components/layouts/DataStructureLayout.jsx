import React, { useRef, useState, useEffect } from 'react';

export default function DataStructureLayout({ actions, visualization, visualizationDescription, propagateDimensions }) {
    const [mounted, setMounted] = useState(false);

    const visualizationRef = useRef(null);

    // Need to wait for after initial mount to get ref information.
    useEffect(() => { 
        setMounted(true);
    }, []);

    return (
        <main className="flex-grow flex">
            <section className="flex-none w-1/3 py-5 px-8 border-r border-gray-300 max-h-data-structure-layout overflow-y-auto">
                <h2 className="inline-block border-b-4 border-primary mb-5 font-bold text-2xl">Actions</h2>
                <div> {/* This div is essential for styling the sections (uses first-child) */}
                    {actions}
                </div>
            </section>
            <section className="flex-grow flex flex-col py-5 px-8">
                <h2 className={`inline-block self-start border-b-4 border-primary font-bold text-2xl ${visualizationDescription ? 'mb-2' : 'mb-5'}`}>Visualization</h2>
                {
                    visualizationDescription && (
                        <p className="font-semibold text-gray-500 mb-3 md:w-4/5">{visualizationDescription}</p>
                    )
                }
                <div className="relative flex-grow" ref={visualizationRef}>
                    {
                        propagateDimensions && mounted ? visualization({ width: visualizationRef.current.offsetWidth, height: visualizationRef.current.offsetHeight }) : visualization
                    }
                </div>
            </section>
        </main>
    )
}