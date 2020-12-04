import DropdownMenu from '../../../dropdown/DropdownMenu';
import SelectableDropdownItem from '../../../dropdown/SelectableDropdownItem';
import DropdownSelect from '../../../dropdown/DropdownSelect';

export default function ActionModeSection({ mode, setMode }) {
    return (
        <div className="">
            <DropdownSelect title="Mode" defaultValue={mode} dropdownWrapperClass="mt-1">
                {
                    ({ selectedItem, setSelectedItem, setOpen }) => {
                        const handleClick = (item) => {
                            setSelectedItem(item);
                            setMode(item);
                            setOpen(false);
                        }

                        return (
                            <>
                                <SelectableDropdownItem 
                                title="Binarysearch Input" 
                                description="Input the array representation of the tree given by binarysearch" 
                                isSelected={selectedItem === 'Binarysearch Input'}
                                handleClick={() => handleClick('Binarysearch Input')} />
                                <SelectableDropdownItem 
                                title="Build custom tree"
                                description="Create your own binary tree using interactive controls" 
                                isSelected={selectedItem === 'Custom Tree Input'}
                                handleClick={() => handleClick('Custom Tree Input')} />
                            </>
                        )

                    }

                }
            </DropdownSelect>

        </div>
    )
}