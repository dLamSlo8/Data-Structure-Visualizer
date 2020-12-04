import ActionSubsection from '../../../ActionSubsection';
import ActionModeSection from './ActionModeSection';

export default function BinaryTreeActionLayout({ mode, setMode, children }) {

    return (
        <>
            <ActionSubsection sectionTitle="Select Mode" sectionComponent={<ActionModeSection mode={mode} setMode={setMode} />} />
            {children}
        </>
    )
}