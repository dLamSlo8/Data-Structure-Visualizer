import { useState, useEffect, useRef } from 'react'; // React/Next-specific
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import BinaryTreeIcon from '../../public/icons/binary-tree.svg';
import BinarySearchTreeIcon from '../../public/icons/binary-search-tree.svg';

import DropdownItem from './DropdownItem';
import DropdownList from './DropdownList';

export default function NavDropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activeList, setActiveList] = useState('init');
    const [listHeight, setListHeight] = useState(null);

    const calcHeight = (el) => {
        const height = el.scrollHeight;

        setListHeight(height);
    }

    const handleDropdownClick = () => {
        setDropdownOpen((dropdownOpen) => !dropdownOpen);
        if (dropdownOpen) {
            setActiveList('init');
        }
    }
    const dropdownRef = useRef(null);


    useEffect(() => {
        if (dropdownOpen) {
            setListHeight(dropdownRef.current.offsetHeight);
        }
    }, [dropdownOpen]);

    return (
        <nav className="relative">
            <button className={`btn ${dropdownOpen ? 'btn--primary' : 'btn--secondary'}`} onClick={handleDropdownClick}>Choose Data Structure</button>
            <CSSTransition 
            in={dropdownOpen}
            classNames="lift"
            timeout={300}
            unmountOnExit>
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
            </CSSTransition>
        </nav>
    )
}