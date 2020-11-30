import Head from 'next/head' // Next-specific
import Image from 'next/image';

import styles from '../styles/Home.module.css' // Page-specific styles and assets (e.g. images)
import BinaryTreeIcon from '../public/binary-tree.svg';

import DataStructureSection from '../components/pages/index/DataStructureSection'; // Page components
import DataStructureItem from '../components/pages/index/DataStructureItem';

export default function Home() {
  return (
    <>
        <Head>
        <title>Data Structure Visualizer | Home</title>
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <h1>Data Structure Visualizers</h1>
            <p>This website is meant to provide interactive data structure visualizations, built with D3.js. 
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
            </DataStructureSection>
        </main>
    </>
  )
}
