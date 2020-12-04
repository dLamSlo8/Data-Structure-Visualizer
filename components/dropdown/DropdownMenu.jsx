export default function DropdownMenu({ children, asSelect, rootClass }) {
    return (
        <ul className={`space-y-3 w-full p-3 ${rootClass ?? ''}`}>
            {children}
        </ul>
    )
}