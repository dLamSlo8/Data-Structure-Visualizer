import { useState, useEffect, useRef } from 'react'; // React/Next-specific
import { CSSTransition } from 'react-transition-group';

import BinaryTreeIcon from '../../public/icons/binary-tree.svg';
import BinarySearchTreeIcon from '../../public/icons/binary-search-tree.svg';

import DropdownItem from '../dropdown/DropdownItem';
import DropdownMenu from '../dropdown/DropdownMenu';
import NavDropdownItem from './NavDropdownItem';

export default function NavDropdownMenu({ dropdownOpen, setDropdownOpen }) {
    const [activeList, setActiveList] = useState('init');
    const [listHeight, setListHeight] = useState(null);

    const dropdownRef = useRef(null);

    const calcHeight = (el) => {
        const height = el.scrollHeight;

        setListHeight(height);
    }

    useEffect(() => {
        if (dropdownOpen) {
            setListHeight(dropdownRef.current.offsetHeight);
        }
    }, [dropdownOpen]);

    return (
        <div ref={dropdownRef} className="absolute mt-3 right-0 w-96 rounded-lg shadow-main bg-white overflow-hidden transition-height duration-300 ease-in-out" style={{ height: listHeight }}>
            <CSSTransition
            in={activeList === 'init'}
            timeout={300}
            classNames="fade-side"
            onEnter={calcHeight}
            unmountOnExit>
                <DropdownMenu>
                    <li>
                        <DropdownItem 
                        icon={<BinaryTreeIcon />} 
                        title="Trees" 
                        hasNestedDropdown
                        handleClick={() => setActiveList('trees')} />
                    </li>
                    <li>
                        <DropdownItem 
                        icon={<BinaryTreeIcon />} 
                        title="Graphs" 
                        hasNestedDropdown
                        handleClick={() => setActiveList('graphs')} />
                    </li>
                </DropdownMenu>
            </CSSTransition>
            <CSSTransition
            in={activeList === 'trees'}
            timeout={300}
            onEnter={calcHeight}
            classNames="fade-side-reverse"
            unmountOnExit>
                <DropdownMenu>
                    <li>
                        <DropdownItem 
                        isReturn
                        title="Back to Data Structure Types"
                        handleClick={() => setActiveList('init')}
                        rootClass="bg-gray-500" />
                    </li>
                    <NavDropdownItem 
                    icon={<BinaryTreeIcon />} 
                    title="Binary Tree" 
                    isLink
                    linkProps={{ href: '/trees/binary-tree' }}
                    handleClick={() => setDropdownOpen(false)} />
                    <NavDropdownItem 
                    icon={<BinarySearchTreeIcon />} 
                    title="Binary Search Tree" 
                    isLink
                    linkProps={{ href: '/trees/binary-search-tree' }}
                    handleClick={(e) => setDropdownOpen(false)} />
                </DropdownMenu>
            </CSSTransition>
        </div>
    )
}