import { createContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const AnimatingModeContext = createContext();

export function AnimatingModeContextProvider({ children }) {
    const [isAnimatingMode, setAnimatingMode] = useState(null); 

    return (
        <AnimatingModeContext.Provider value={{ isAnimatingMode, setAnimatingMode }}>
            {children}
        </AnimatingModeContext.Provider>
    );
}

AnimatingModeContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AnimatingModeContext;