import { useState } from 'react';

import DataStructureLayout from '../../layouts/DataStructureLayout';
import BinaryTreeActionLayout from './actions/BinaryTreeActionLayout';
import CustomBinaryTreeActions from './actions/CustomBinaryTreeActions';
import CustomBinaryTreeVisualization from './visualization/CustomBinaryTreeVisualization';

export default function CustomBinaryTreeMode({ mode, setMode }) {
    return (
        <DataStructureLayout
        actions={
            <BinaryTreeActionLayout mode={mode} setMode={setMode}>
                <CustomBinaryTreeActions />
            </BinaryTreeActionLayout>
        }
        visualization={<CustomBinaryTreeVisualization />}>
        </DataStructureLayout>
    )
}