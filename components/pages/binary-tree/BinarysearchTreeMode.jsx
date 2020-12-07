import { useState } from 'react';

import DataStructureLayout from '../../layouts/DataStructureLayout';
import BinaryTreeActionLayout from './actions/BinaryTreeActionLayout';
import BinarysearchTreeActions from './actions/BinarysearchTreeActions';
import BinarysearchTreeVisualization from './visualization/BinarysearchTreeVisualization';

export default function BinarysearchTreeMode({ mode, setMode }) {
    const [rootNode, setRootNode] = useState(null);

    const handleVisualize = (root) => {
        setRootNode(root);
    }

    return (
        <DataStructureLayout 
        propagateDimensions
        actions={
            <BinaryTreeActionLayout mode={mode} setMode={setMode}>
                <BinarysearchTreeActions handleVisualize={handleVisualize} />
            </BinaryTreeActionLayout>
        }
        visualization={({ width, height }) => <BinarysearchTreeVisualization rootNode={rootNode} width={width} height={height} />}
        >   
        </DataStructureLayout>
    )
}