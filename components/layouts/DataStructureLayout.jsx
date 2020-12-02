export default function DataStructureLayout({ children }) {
    console.log(children);
    return (
        <main className="flex-grow flex">
            <section className="flex-none w-1/3 py-5 px-8 border-r-2 border-gray-300">
                <h1 className="inline-block border-b-4 border-primary font-bold text-2xl">Actions</h1>
                {children[0]}
            </section>
            <section className="flex-grow py-5 px-8">
                <h1 className="inline-block border-b-4 border-primary font-bold text-2xl">Visualizations</h1>
                {children[1]}
            </section>
        </main>
    )
}