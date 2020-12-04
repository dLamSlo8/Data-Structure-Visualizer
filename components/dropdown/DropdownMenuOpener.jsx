import { CSSTransition } from 'react-transition-group';

// Responsibility: Render the dropdown menu based on open state (thus handles animation through CSSTransition)
export default function DropdownMenuOpener({ open, children }) {
    return (
        <CSSTransition 
        in={open}
        classNames="lift"
        timeout={300}
        unmountOnExit>
            {children}
        </CSSTransition>
    )
}