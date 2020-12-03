import { useState } from 'react';

import BinaryTreeActions from '../../components/pages/binary-tree/actions/BinaryTreeActions';
import BinaryTreeVisualization from '../../components/pages/binary-tree/visualization/BinaryTreeVisualization';
import DataStructureLayout from '../../components/layouts/DataStructureLayout';

export default function BinaryTree() {
    return (
        <DataStructureLayout>
            <BinaryTreeActions />
            <BinaryTreeVisualization />
        </DataStructureLayout>
    )
}