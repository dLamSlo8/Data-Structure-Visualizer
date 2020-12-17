import Head from 'next/head'; // Next-specific

import NavSection from '@components/pages/data-structures'; // Page-specific
import NavSectionItem from '@components/pages/data-structures';

import BinarySearchTreeIcon from '../public/icons/binary-search-tree.svg'; // Assets
export default function DataStructures() {
    return (
    <>
        <Head>
        <title>Data Structure Visualizer | Home</title>
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="max-w-5xl p-12 pb-0">
            <h1 className="font-bold text-5xl">Data Structure Visualizers</h1>
            <p className="mt-5 font-semibold text-lg text-gray-500">This website is meant to provide <span className="text-primary">interactive data structure visualizations</span>, built with D3.js. 
            Currently our MVP includes binary trees and binary search trees. To begin, <span className="text-primary">choose a data structure</span> from 
            the options below.</p>
        </header>
        <main className="px-12 mt-12">
            <NavSection
            title="Trees"
            listLabel="Tree Data Structures">
                <NavSectionItem
                title="Binary Search Tree"
                img={<BinarySearchTreeIcon />}
                description={`Visualize a BST through adding, deleting, and searching for nodes, with animated steps.`} 
                routeName="/data-structures/binary-search-tree" />
            </NavSection>
        </main>
    </>
    )
}