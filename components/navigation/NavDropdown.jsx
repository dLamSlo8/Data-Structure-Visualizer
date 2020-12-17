import { useState } from 'react';

import NavDropdownMenu from './NavDropdownMenu';
import DropdownMenuOpener from '../dropdown/DropdownMenuOpener';

export default function NavDropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownClick = () => {
        setDropdownOpen((dropdownOpen) => !dropdownOpen);
    }

    return (
        <nav className="relative">
            <button className={`btn ${dropdownOpen ? 'btn--primary' : 'btn--secondary'}`} onClick={handleDropdownClick}>Choose Visualizer</button>
            <DropdownMenuOpener open={dropdownOpen}>
                <NavDropdownMenu dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
            </DropdownMenuOpener>
        </nav>
    )
}