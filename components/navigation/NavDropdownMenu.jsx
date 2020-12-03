import { useState, useEffect, useRef } from 'react'; // React/Next-specific
import { CSSTransition } from 'react-transition-group';

import BinaryTreeIcon from '../../public/icons/binary-tree.svg';
import BinarySearchTreeIcon from '../../public/icons/binary-search-tree.svg';

import DropdownItem from './DropdownItem';
import DropdownList from './DropdownList';

export default function NavDropdownMenu({ dropdownOpen }) {
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
        <div ref={dropdownRef} className="absolute mt-3 right-0 w-96 rounded-lg shadow-main bg-white overflow-hidden transition-height duration-500 ease-in-out menu" style={{ height: listHeight }}>
            <CSSTransition
            in={activeList === 'init'}
            timeout={500}
            classNames="fade-side"
            onEnter={calcHeight}
            unmountOnExit>
                <DropdownList>
                    <DropdownItem 
                    icon={<BinaryTreeIcon />} 
                    title="Trees" 
                    hasNestedDropdown
                    handleClick={() => setActiveList('trees')} />
                    <DropdownItem 
                    icon={<BinaryTreeIcon />} 
                    title="Graphs" 
                    hasNestedDropdown
                    handleClick={() => setActiveList('graphs')} />
                </DropdownList>
            </CSSTransition>
            <CSSTransition
            in={activeList === 'trees'}
            timeout={500}
            onEnter={calcHeight}
            classNames="fade-side-reverse"
            unmountOnExit>
                <DropdownList>
                    <DropdownItem 
                    isReturn
                    title="Back to Data Structure Types"
                    handleClick={() => setActiveList('init')} />
                    <DropdownItem 
                    icon={<BinaryTreeIcon />} 
                    title="Trees" 
                    handleClick={() => console.log('Selected binary tree!')} />
                    <DropdownItem 
                    icon={<BinarySearchTreeIcon />} 
                    title="Binary Search Tree" 
                    handleClick={() => console.log('Selected binary search tree!')} />
                </DropdownList>
            </CSSTransition>
        </div>
    )
}