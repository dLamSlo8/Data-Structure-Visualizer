import { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import CollapseIcon from '../public/icons/collapse.svg';
import ExpandIcon from '../public/icons/expand.svg';

export default function ActionSubsection({ sectionTitle, sectionDescription, propagateState, children: sectionContent }) {
    const [collapsed, setCollapsed] = useState(false);
    const [height, setHeight] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        setHeight(sectionRef.current.offsetHeight)
    }, []);

    const cssTransitionLifecycle = {
        onEnter: (node) => {
            node.style.marginTop = `-${sectionRef.current.offsetHeight}px`;
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
            node.style.marginTop = `-${sectionRef.current.offsetHeight}px`;
            node.style.opacity = 0;
        }
    }

    return (
        <section className="relative mb-5 not:first:pt-5 not:first:border-t-2 not:first:border-gray-300">
            <header className={`flex justify-between items-center ${!sectionDescription ? 'mb-3' : ''}`}>
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
                {...cssTransitionLifecycle}>
                    <div className="section-scroll">
                        <p className="font-semibold text-gray-500 mb-3">{sectionDescription}</p>
                        {
                            propagateState ? sectionContent({ collapsed, setHeight, sectionRef }) : sectionContent
                        }
                    </div>
                </CSSTransition>
            </div>
        </section>
    )
}