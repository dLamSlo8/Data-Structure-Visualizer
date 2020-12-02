import RightIcon from '../../public/icons/chevron-right.svg';
import LeftIcon from '../../public/icons/chevron-left.svg';

export default function DropdownItem({ icon, title, hasNestedDropdown, isReturn, handleClick }) {
    return (
        <li>
            <button className={`group flex items-center w-full p-3 rounded-lg bg-primary-light hover:bg-primary
            focus:bg-primary focus:ring-4 focus:ring-primary focus:ring-opacity-25 focus:outline-none transition--colors-shadow`} onClick={handleClick}>
                {icon}
                {
                    isReturn && (
                        <LeftIcon className="group-hover:text-white group-focus:text-white transition--colors-shadow" />
                    )
                }
                <p className="ml-5 font-semibold group-hover:text-white group-focus:text-white transition--colors-shadow">{title}</p>
                {
                    hasNestedDropdown && (
                        <RightIcon className="ml-auto group-hover:text-white group-focus:text-white transition--colors-shadow" />
                    )
                }
            </button>
        </li>
    )
}   