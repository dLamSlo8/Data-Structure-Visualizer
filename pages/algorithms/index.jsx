import Head from 'next/head'; // Next-specific

import NavSection from '@components/navigation/NavSection'; // Page-specific
import NavSectionItem from '@components/navigation/NavSectionItem';

import BinarySearchTreeIcon from '@icons/binary-search-tree.svg'; // Assets

export default function Algorithms() {
    return (
        <>
            <Head>
            <title>Data Structure Visualizer | Home</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="max-w-5xl p-12 pb-0">
                <h1 className="font-bold text-5xl">Algorithm Visualizers</h1>
                <p className="mt-5 font-semibold text-lg text-gray-500">This website is meant to provide <span className="text-primary">interactive data structure visualizations</span>, built with D3.js. 
                Currently our MVP includes binary trees and binary search trees. To begin, <span className="text-primary">choose a data structure</span> from 
                the options below.</p>
            </header>
            <main className="px-12 mt-12">
                <NavSection
                title="Trees"
                listLabel="Tree Data Structures">
                    <NavSectionItem
                    title="Tree Traversal"
                    img={<BinarySearchTreeIcon />}
                    description={`Visualize a inorder, preorder, postorder, or level order traversals on a binary tree.`} 
                    routeName="/algorithms/tree-traversal" />
                </NavSection>
            </main>
        </>
    )
}