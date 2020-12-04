import { useState } from 'react';

import BinarysearchTreeMode from '../../components/pages/binary-tree/BinarysearchTreeMode';
import CustomBinaryTreeMode from '../../components/pages/binary-tree/CustomBinaryTreeMode';

export default function BinaryTree() {
    const [mode, setMode] = useState('Binarysearch Input');

    return (
        mode === 'Binarysearch Input' ? (
            <BinarysearchTreeMode mode={mode} setMode={setMode} />
        ) : (
            <CustomBinaryTreeMode mode={mode} setMode={setMode} />
        )
    )
}