import { useRouter } from 'next/router';

import SelectableDropdownItem from '../dropdown/SelectableDropdownItem';

// DropdownItem with extra styling based on whether the data structure is selected
export default function NavDropdownItem({ ...props }) {
    const { pathname } = useRouter();
    const isSelected = props.linkProps.href === pathname;

    return (
        <SelectableDropdownItem isSelected={isSelected} {...props} />
    )
}