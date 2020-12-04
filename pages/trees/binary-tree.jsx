import { useState } from 'react';

import DataStructureLayout from '../../components/layouts/DataStructureLayout';
import BinaryTreeActionLayout from '../../components/pages/binary-tree/actions/BinaryTreeActionLayout';
import BinarysearchTreeActions from '../../components/pages/binary-tree/actions/BinarysearchTreeActions';
import CustomBinaryTreeActions from '../../components/pages/binary-tree/actions/CustomBinaryTreeActions';

export default function BinaryTree() {
    const [mode, setMode] = useState('binary-search');

    return (
        <DataStructureLayout>
            <BinaryTreeActionLayout mode={mode} setMode={setMode}>
                {
                    mode === 'binary-search' ? (
                        <BinarysearchTreeActions />
                    ) : (
                        <CustomBinaryTreeActions />
                    )
                }
            </BinaryTreeActionLayout>
            <div>Visualization</div>
        </DataStructureLayout>
    )
}