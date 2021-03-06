import { memo } from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

function NavSectionItem({ title, img, description, routeName }) {
    return (
        <li className="bg-primary-light hover:bg-primary rounded-lg shadow-main hover:text-white hover:ring-4 hover:ring-primary hover:ring-opacity-25 transition-colors-shadow duration-200 ease-in-out">
            <Link href={routeName}>
                <a className="h-full block p-6">
                    <article className="flex flex-col items-center">
                        <h3 className="font-bold text-2xl text-center mb-5">{title}</h3>
                        {img}
                        <p className="text-center mt-5">{description}</p>
                    </article>
                </a>
            </Link>
        </li>
    )
}

NavSectionItem.propTypes = {
    title: PropTypes.string.isRequired,
    img: PropTypes.element.isRequired,
    description: PropTypes.string.isRequired,
    routeName: PropTypes.string.isRequired
};

export default memo(NavSectionItem);