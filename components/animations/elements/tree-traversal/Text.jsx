import PropTypes from 'prop-types';

function Text({ x, y, value }) {
    return (
        <text x={x} y={y} dy="6" textAnchor="middle">{value}</text>
    )
}

Text.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
};

export default Text;