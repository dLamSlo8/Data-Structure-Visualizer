import Head from 'next/head' // Next-specific
import Image from 'next/image';

import DataStructureSection from '../components/pages/index/DataStructureSection'; // Page components
import DataStructureItem from '../components/pages/index/DataStructureItem';

import BinaryTreeIcon from '../public/icons/binary-tree.svg'; // Assets
import BinarySearchTreeIcon from '../public/icons/binary-search-tree.svg';

export default function Home() {
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
            <DataStructureSection
            title="Trees"
            listLabel="Tree Data Structures">
                <DataStructureItem 
                title="Binary Tree"
                img={<BinaryTreeIcon />}
                description={`Build your own binary tree using interactive controls, or 
                enter a tree string from popular programming challenge sites like LeetCode and Binarysearch.`} 
                routeName="/trees/binary-tree" />
                <DataStructureItem
                title="Binary Search Tree"
                img={<BinarySearchTreeIcon />}
                description={`Visualize a BST through adding, deleting, and searching for nodes, with animated steps.`} 
                routeName="/trees/binary-search-tree" />
            </DataStructureSection>
        </main>
    </>
  )
}
