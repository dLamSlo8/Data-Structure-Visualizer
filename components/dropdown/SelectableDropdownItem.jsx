import DropdownItem from '../dropdown/DropdownItem';

// DropdownItem with extra styling based on whether it is selected/active
export default function SelectableDropdownItem({ isSelected, ...props }) {
    return (
        <li className="relative"> 
            <DropdownItem {...props} handleClick={!isSelected ? props.handleClick : (e) => e.preventDefault()} rootClass={isSelected && 'border-2 border-primary pointer-events-none'} />
            {
                isSelected && (
                    <div className="absolute top-2 right-2 py-1 px-2 rounded-lg bg-green-200 font-bold text-sm text-green-700 pointer-events-none shadow-main">
                        <p>Selected</p>
                    </div>
                )
            }
        </li>
    )
}