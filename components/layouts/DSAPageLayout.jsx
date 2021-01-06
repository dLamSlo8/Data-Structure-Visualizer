import React, { useRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import AnimationContext from '@contexts/AnimationContext';
import D3Context from '@contexts/D3Context';

import CloseIcon from '@icons/x-circle.svg';
import Button from '@components/Button';

// Responsibility: Render layout for every DSA page.
function DSAPageLayout({ actions, visualization, visualizationDescription }) {
    const [mounted, setMounted] = useState(false); 
    const { isAnimatingMode, setAnimatingMode } = useContext(AnimationContext);
    const { visualizationRef } = useContext(D3Context);
    const actionsRef = useRef(null); // Ref to get height of action section

    /**
     * Effect  
     * Update state when mounted to get current ref information
     */ 
    useEffect(() => { 
        setMounted(true);
    }, []);

    return (
        <main className="flex-grow flex">
            <section className="relative flex-none w-1/3 py-5 px-8 border-r border-gray-300 max-h-data-structure-layout overflow-y-auto" ref={actionsRef}>
                <h2 className="inline-block border-b-4 border-primary mb-5 font-bold text-2xl">Actions</h2>
                <div> {/* This div is essential for styling the sections (uses first-child) */}
                    {actions}
                </div>
                <CSSTransition 
                in={isAnimatingMode && mounted}
                classNames="lift-animating-actions"
                timeout={300}
                unmountOnExit>
                    <div className="absolute inset-0 flex items-start justify-center bg-black bg-opacity-50" style={{height: actionsRef.current?.scrollHeight }} aria-hidden="true">
                        <div id="animating-label" className="sticky top-2 inline-flex items-center space-x-3 px-4 py-2 rounded-lg bg-primary-light shadow-main">
                                <p className="font-semibold text-primary">Currently in animating mode</p>
                                <Button onClick={() => setAnimatingMode(false)}>
                                    <CloseIcon />
                                </Button>
                        </div>
                    </div>
                </CSSTransition>

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
                        mounted ? visualization : null
                    }
                </div>
            </section>
        </main>
    )
}

DSAPageLayout.propTypes = {
    actions: PropTypes.node.isRequired, // Action child(s)
    visualization: PropTypes.node.isRequired, // Visualization child(s)
    visualizationDescription: PropTypes.string // Description of visualization to be rendered underneath Visualization header
};

export default DSAPageLayout;