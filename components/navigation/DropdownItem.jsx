import RightIcon from '../../public/icons/chevron-right.svg';

export default function DropdownItem({ icon, title, hasNestedDropdown, handleClick }) {
    return (
        <li className="p-3 rounded-lg bg-primary-light">
            <button className="flex items-center w-full" onClick={handleClick}>
                {icon}
                <p className="ml-5 font-semibold">{title}</p>
                {
                    hasNestedDropdown && (
                        <RightIcon className="ml-auto hover:text-white" />
                    )
                }
            </button>
        </li>
    )
}