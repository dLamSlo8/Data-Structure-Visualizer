import DropdownMenu from '../../../dropdown/DropdownMenu';
import SelectableDropdownItem from '../../../dropdown/SelectableDropdownItem';
import DropdownSelect from '../../../dropdown/DropdownSelect';

export default function ActionModeSection({ mode, setMode }) {
    return (
        <div className="">
            <DropdownSelect title="Mode" defaultValue={mode}>
                {
                    ({ selectedItem, setSelectedItem }) => {
                        const handleClick = (item) => {
                            setSelectedItem(item);
                            setMode(item);
                        }

                        return (
                            <>
                                <SelectableDropdownItem 
                                title="Binarysearch Input" 
                                description="Input the array representation of the tree given by binarysearch" 
                                isSelected={selectedItem === 'binary-search'}
                                handleClick={() => handleClick('binary-search')} />
                                <SelectableDropdownItem 
                                title="Build custom tree"
                                description="Create your own binary tree using interactive controls" 
                                isSelected={selectedItem === 'custom-tree'}
                                handleClick={() => handleClick('custom-tree')} />
                            </>
                        )

                    }

                }
            </DropdownSelect>

        </div>
    )
}