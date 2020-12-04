import ActionSubsection from '../../../ActionSubsection';
import BinarysearchTreeForm from './BinarysearchTreeForm';

export default function BinarysearchTreeActions() {
    return (
        <>
            <ActionSubsection 
            sectionTitle="Enter Tree Input"
            sectionDescription="Here you can enter the binary tree representation from Binarysearch to visualize the tree.">
                <BinarysearchTreeForm />
            </ActionSubsection>
        </>
    )
}