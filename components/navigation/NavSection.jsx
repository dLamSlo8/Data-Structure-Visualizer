
export default function NavSection({ title, children, listLabel }) {
    return (
        <section>
            <h2 className="inline-block border-b-4 border-primary font-bold text-3xl">{title}</h2>
            <ul className="grid grid-cols-4 gap-5 mt-5" aria-label={listLabel}>{children}</ul>
        </section>
    )
};