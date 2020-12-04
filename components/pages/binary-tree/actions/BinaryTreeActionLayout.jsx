import ActionSubsection from '../../../ActionSubsection';
import ActionModeSection from './ActionModeSection';

export default function BinaryTreeActionLayout({ mode, setMode, children }) {

    return (
        <>
            <ActionSubsection sectionTitle="Select Mode" propagateState>
                {
                    ({ collapsed }) => (
                        <ActionModeSection mode={mode} setMode={setMode} sectionCollapsed={collapsed} />
                    )
                }
            </ActionSubsection>
            {children}
        </>
    )
}