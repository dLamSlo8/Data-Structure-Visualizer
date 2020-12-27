import PropTypes from 'prop-types';

function calculatePositionClasses(position) {
    switch (position) {
        case 'top': 
            return 'bottom-full left-1/2 -translate-x-1/2 mb-4';
        case 'right':
            return 'left-full top-1/2 -translate-y-1/2 ml-4';
        case 'bottom': 
            return 'top-full left-1/2 -translate-x-1/2 mt-4';
        case 'left':
            return 'right-full top-1/2 -translate-y-1/2 mr-4';
        default:
            break;
    }
}

function Tooltip({ id, position, rootClass, children: tooltipContent }) {
    return (
        <div role="tooltip" id={id} className={`absolute ${calculatePositionClasses(position)} transform whitespace-nowrap hidden group-hover:block group-focus:block p-2 bg-black rounded-lg ${rootClass ?? ''} z-20`}>
            <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-4 h-4 -rotate-45 bg-black" />
            <div className="text-sm text-white">
                {tooltipContent}
            </div>
        </div>
    )
}

Tooltip.propTypes = {
    id: PropTypes.string.isRequired, // ID of tooltip to use aria-labelledby in the describing container
    position: PropTypes.oneOf([
        "top",
        "bottom",
        "left",
        "right"
    ]).isRequired, // Where the tooltip is positioned relative to its parent container (parent must have position relative!)
    rootClass: PropTypes.string, // Any extra styling for the tooltip
    children: PropTypes.node.isRequired
};

export default Tooltip;