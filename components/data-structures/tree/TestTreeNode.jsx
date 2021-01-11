
function TestTreeNode({ node }) {
    console.log(node);
    return (
        node  ? (
            node.name !== null && (
                <>
                    <g>
                        <circle r={20} fill="white" stroke="black" strokeWidth="2" cx={node.x} cy={node.y} />
                        <text textAnchor="middle" dy="6" x={node.x} y={node.y}>{node.name}</text>
                    </g>
                    <TestTreeNode node={node.children && node.children[0]} />
                    <TestTreeNode node={node.children && node.children[1]} />
                </>
            )
        ) : null
    )
}

export default TestTreeNode;