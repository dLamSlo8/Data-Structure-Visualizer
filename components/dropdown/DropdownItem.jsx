import PropTypes from 'prop-types';

import Link from 'next/link';

import RightIcon from '../../public/icons/chevron-right.svg';
import LeftIcon from '../../public/icons/chevron-left.svg';

function DropdownItem({ icon, title, description, hasNestedDropdown, isReturn, handleClick, isLink, linkProps, rootClass }) {
    return (
        isLink ? (
            <Link {...linkProps}>
                <a className={`group flex items-center w-full p-3 rounded-lg bg-primary-light hover:bg-primary
                focus:bg-primary focus:ring-4 focus:ring-primary focus:ring-opacity-25 focus:outline-none transition--colors-shadow ${rootClass ?? ''}`} onClick={handleClick}>
                    {icon}
                    <h3 className="ml-5 font-semibold group-hover:text-white group-focus:text-white transition--colors">{title}</h3>
                    {
                        description && (
                            <p className="mt-3 font-medium text-gray-500 group-hover:text-white group-focus:text-white transition--colors">{description}</p>
                        )
                    }
                </a>
            </Link>
        ) : (
            <button className={`group flex items-center w-full p-3 rounded-lg bg-primary-light hover:bg-primary
            focus:bg-primary focus:ring-4 focus:ring-primary focus:ring-opacity-25 focus:outline-none transition--colors-shadow ${rootClass ?? ''}`} onClick={handleClick}>
                {icon}
                {
                    isReturn && (
                        <LeftIcon className="group-hover:text-white group-focus:text-white transition--colors mr-5" />
                    )
                }
                <div className={icon && 'ml-5'}>
                    <h3 className="font-semibold text-lg group-hover:text-white group-focus:text-white transition--colors">{title}</h3>
                    {
                        description && (
                            <p className="mt-2 font-medium text-gray-500 group-hover:text-white group-focus:text-white transition--colors">{description}</p>
                        )
                    }
                </div>

                {
                    hasNestedDropdown && (
                        <RightIcon className="ml-auto group-hover:text-white group-focus:text-white transition--colors" />
                    )
                }
            </button>
        )
    )
}   

DropdownItem.propTypes = {
    icon: PropTypes.element,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    hasNestedDropdown: PropTypes.bool,
    isReturn: PropTypes.bool,
    handleClick: PropTypes.func.isRequired,
    isLink: PropTypes.bool,
    linkProps: PropTypes.object,
    rootClass: PropTypes.string
}

export default DropdownItem;