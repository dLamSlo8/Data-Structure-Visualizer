import PropTypes from 'prop-types';

// Responsibility: Render layout for visualization section
function VisualizationLayout({ children }) {
    return (
        <div className="group">
            <div className="absolute inset-0 border border-gray-400 rounded-lg z-negative group-hover:border-primary" aria-hidden="true" />
            {children}
        </div>
    )
}

VisualizationLayout.propTypes = {
    children: PropTypes.node.isRequired // Visualization child(s)
};

export default VisualizationLayout;