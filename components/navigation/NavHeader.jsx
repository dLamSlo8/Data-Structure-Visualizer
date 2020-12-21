import { useRouter } from 'next/router'; // React/Next-specific
import Link from 'next/link';

import NavDropdown from './NavDropdown'; // Components

import HelpIcon from '../../public/icons/help-circle.svg'; // Assets

const INDEX_OF_PAGE_TYPE = 1;
const INDEX_OF_PAGE_NAME = 2;

/**
 * Capitalize the input string
 * @param {String} str - Input string to capitalize
 */
const capitalize = (str) => {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export default function NavHeader() {
    const { pathname } = useRouter();
    
    // Generate name and type through route segments.
    const pageType = pathname.split('/')[INDEX_OF_PAGE_TYPE];
    const pageName = pathname.split('/')[INDEX_OF_PAGE_NAME];
    const dataStructureName = pageName.split('-').map((word) => capitalize(word)).join(' ');

    return (
        <header className="px-8 py-4 border-b border-gray-300">
            <ul 
            className="flex justify-between items-center max-w-container mx-auto"
            aria-label="Data Structure Page Header">
                <li>
                    <h1 className="font-bold text-3xl">
                        <Link href="/">
                            <a>DSV</a>
                        </Link>
                    </h1>
                </li>
                <li className="flex flex-col items-center">
                    <h2 className="font-semibold text-gray-500">Current {pageType === 'algorithms' ? 'Algorithm' : 'Data Structure'}</h2>
                    <div className="relative">
                        <p className="font-bold text-2xl">{dataStructureName}</p>
                        <button className="absolute -right-10 top-1/2 transform -translate-y-1/2" aria-label="More information">
                            <HelpIcon className="text-primary" aria-hidden="true" />
                        </button>
                    </div>
                </li>
                <li>
                    <NavDropdown />
                </li>
            </ul>
        </header>
    )
}