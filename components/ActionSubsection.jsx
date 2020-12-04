import { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import CollapseIcon from '../public/icons/collapse.svg';
import ExpandIcon from '../public/icons/expand.svg';

export default function ActionSubsection({ sectionTitle, sectionDescription, sectionComponent }) {
    const [collapsed, setCollapsed] = useState(false);
    const [height, setHeight] = useState(null);
    const sectionRef = useRef(null);

    console.log(height);
    useEffect(() => {
        console.log(sectionRef.current.offsetHeight);
        setHeight(sectionRef.current.offsetHeight)
    }, []);

    const cssTransitionLifecycle = {
        onEnter: (node) => {
            node.style.marginTop = `-${height}px`;
            node.style.opacity = 0;
        },
        onEntering: (node) => {
            node.style.marginTop = 0;
            node.style.opacity = 1;
        },
        onExit: (node) => {
            node.style.marginTop = 0;
            node.style.opacity = 1;
        },
        onExiting: (node) => {
            node.style.marginTop = `-${height}px`;
            node.style.opacity = 0;
        }
    }

    return (
        <section className="relative">
            <header className="flex justify-between items-center">
                <h3 className="font-semibold text-2xl">{sectionTitle}</h3>
                <button aria-label={`${collapsed ? 'Expand' : 'Collapse'} Section Named ${sectionTitle}`} onClick={() => setCollapsed((collapsed) => !collapsed)}>
                    {
                        collapsed ? (
                            <ExpandIcon aria-hidden="true" />
                        ) : (
                            <CollapseIcon aria-hidden="true" />
                        )
                    }
                </button>
            </header>

            <div className="overflow-hidden" ref={sectionRef}>
                <CSSTransition
                in={!collapsed}
                timeout={300}
                {...cssTransitionLifecycle}
                unmountOnExit
                >
                    <div className="section-scroll">
                        <p>{sectionDescription}</p>
                        {sectionComponent}
                    </div>
                </CSSTransition>
            </div>

            {/* {
                !collapsed && (
 
                )
            } */}

        </section>
    )
}