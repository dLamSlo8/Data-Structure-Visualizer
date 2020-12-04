import React from 'react';

export default function DataStructureLayout({ children }) {
    const childrens = React.Children.toArray(children);
    
    return (
        <main className="flex-grow flex">
            <section className="flex-none w-1/3 py-5 px-8 border-r-2 border-gray-300">
                <h2 className="inline-block border-b-4 border-primary mb-5 font-bold text-2xl">Actions</h2>
                {childrens[0]}
            </section>
            <section className="flex-grow py-5 px-8">
                <h2 className="inline-block border-b-4 border-primary mb-5 font-bold text-2xl">Visualization</h2>
                {childrens[1]}
            </section>
        </main>
    )
}