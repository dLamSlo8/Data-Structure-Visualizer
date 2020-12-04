import { useEffect } from 'react';
import { generateD3Tree } from '../../../../functions/tree';

function BinarysearchTreeVisualization({ rootNode, width, height }) {
    useEffect(() => {
        if (rootNode) {
            generateD3Tree(rootNode, width, height);
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

export default BinarysearchTreeVisualization;