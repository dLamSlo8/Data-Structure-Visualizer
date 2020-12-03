import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import NavDropdownMenu from './NavDropdownMenu';

export default function NavDropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownClick = () => {
        setDropdownOpen((dropdownOpen) => !dropdownOpen);
    }

    return (
        <nav className="relative">
            <button className={`btn ${dropdownOpen ? 'btn--primary' : 'btn--secondary'}`} onClick={handleDropdownClick}>Choose Data Structure</button>
            <CSSTransition 
            in={dropdownOpen}
            classNames="lift"
            timeout={300}
            unmountOnExit>
                <NavDropdownMenu dropdownOpen={dropdownOpen} />
            </CSSTransition>
        </nav>
    )
}