import { createContext, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

const D3Context = createContext();

export function D3ContextProvider({ children, structureUpdater }) { 
    const d3StructureRef = useRef(null);
    const visualizationRef = useRef(null);
    const updateD3Structure = useCallback((structure) => {
        d3StructureRef.current = structureUpdater(structure, visualizationRef.current.offsetWidth, visualizationRef.current.offsetHeight);
    }, [structureUpdater]);

    return (
        <D3Context.Provider value={{ d3StructureRef, visualizationRef, updateD3Structure }}>
            {children}
        </D3Context.Provider>
    )
};

D3ContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default D3Context;