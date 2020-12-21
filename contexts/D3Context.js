import { createContext, useRef } from 'react';
import PropTypes from 'prop-types';

const D3Context = createContext();

export function D3ContextProvider({ children }) { 
    const d3StructureRef = useRef(null);

    return (
        <D3Context.Provider value={{ d3StructureRef }}>
            {children}
        </D3Context.Provider>
    )
};

D3ContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default D3Context;