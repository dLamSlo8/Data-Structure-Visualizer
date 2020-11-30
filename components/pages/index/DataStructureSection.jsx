
export default ({ title, children, listLabel }) => {
    return (
        <section>
            <h2>{title}</h2>
            <ul aria-label={listLabel}>{children}</ul>
        </section>
    )
}