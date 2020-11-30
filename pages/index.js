import Head from 'next/head' // Next-specific
import Image from 'next/image';

import BinaryTreeIcon from '../public/binary-tree.svg';
import BinarySearchTreeIcon from '../public/binary-search-tree.svg';

import DataStructureSection from '../components/pages/index/DataStructureSection'; // Page components
import DataStructureItem from '../components/pages/index/DataStructureItem';


export default function Home() {
  return (
    <>
        <Head>
        <title>Data Structure Visualizer | Home</title>
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="index__header">
            <h1 className="index__header-heading">Data Structure Visualizers</h1>
            <p className="index__header-description">This website is meant to provide interactive data structure visualizations, built with D3.js. 
            Currently our MVP includes binary trees and binary search trees. To begin, choose a data structure from 
            the options below.</p>
        </header>
        <main>
            <DataStructureSection
            title="Trees"
            listLabel="Tree Data Structures">
                <DataStructureItem 
                title="Binary Tree"
                img={<BinaryTreeIcon />}
                description={`Build your own binary tree using interactive controls, or 
                enter a tree string from popular programming challenge sites like LeetCode and Binarysearch.`} />
                <DataStructureItem
                title="Binary Search Tree"
                img={<BinarySearchTreeIcon />}
                description={`Visualize a BST through adding, deleting, and searching for nodes, with animated steps.`} />
            </DataStructureSection>
        </main>
    </>
  )
}
