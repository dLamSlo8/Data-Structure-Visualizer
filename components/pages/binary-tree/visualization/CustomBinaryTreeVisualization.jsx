import { useEffect } from 'react';
import { generateD3Tree } from '../../../../functions/tree';

function CustomBinaryTreeVisualization({ rootNode }) {
    useEffect(() => {
        if (rootNode) {
            generateD3Tree(rootNode, document.documentElement.clientWidth);
        }
    }, [rootNode]);

    return (
        <div className="">
        {
            rootNode && (
                <div id="tree">
                </div>
            )
        }
        </div>
    )
}

export default CustomBinaryTreeVisualization;