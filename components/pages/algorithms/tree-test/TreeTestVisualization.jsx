import { useContext, useEffect, useState, useRef } from 'react';

import D3Context from '@contexts/D3Context';

import TreeNode from '@classes/tree-node';

import Button from '@components/Button';
import VisualizationLayout from '@components/layouts/VisualizationLayout';
import Tree from '@components/data-structures/tree/BaseTree';
import TestTreeNode from '@components/data-structures/tree/TestTreeNode';
import BinaryTree from '@classes/binary-tree';
import BaseTree from '@components/data-structures/tree/BaseTree';

import * as d3 from 'd3';
export default function TreeTestVisualization({ root }) {
    console.log(root);
    const { visualizationRef } = useContext(D3Context);
    const svgTreeRef = useRef(null);
    const [tree, setTree] = useState(null);
    const [links, setLinks] = useState([]);

    /**
     * CREATE TREE HERE
     */
    const drawTree = () => {
        let root = new TreeNode(1, "a");
        root.setLeft(new TreeNode(2, "b"));
        root.setRight(new TreeNode(3, "c"));
        root.children[0].setRight(new TreeNode(3, "d"))
        root.children[1].setLeft(new TreeNode(4, "e"));
        root.children[1].children[0].setLeft(new TreeNode(5, "f"));
        root.children[1].children[0].children[0].setLeft(new TreeNode(5, "g"));
        root.children[1].children[0].children[0].children[0].setLeft(new TreeNode(5, "h"));
        root.children[1].children[0].children[0].children[0].setRight(new TreeNode(5, "i"));

        root.generateBinaryTreePositions(350, 0);
        console.log(root);
        setTree(new BinaryTree(root));
    }   

    useEffect(() => {

        if (tree) {
            d3.select(svgTreeRef.current).call(d3.zoom()
            .extent([[0, 0], [visualizationRef.current.offsetWidth, visualizationRef.current.offsetHeight + 50]])
            .scaleExtent([0.5, 8])
            .filter(function filter(event) { // Only allows zoom and pan when holding down shift key (on non-mobile screens!)
                return document.documentElement.clientWidth <= 640 || event.shiftKey;
            })
            .on('zoom', function zoomed({transform}) {
                d3.select(svgTreeRef.current).select('g').attr('transform', transform);
            }));
        }

    }, [tree]);

    /** Effect
     *  Creates links based on nodes.
     */
    useEffect(() => {
        if (tree) {
            let newLinks = [];
            let nodes = Object.values(tree.uuidToNodeMap);
            console.log(nodes);
            nodes.forEach(({ edges: [edgeLeft, edgeRight] }) => {
                if (edgeLeft) {
                    newLinks.push({
                        x1: edgeLeft.startX,
                        x2: edgeLeft.endX,
                        y1: edgeLeft.startY,
                        y2: edgeLeft.endY
                    })
                }

                if (edgeRight) {
                    newLinks.push({
                        x1: edgeRight.startX,
                        x2: edgeRight.endX,
                        y1: edgeRight.startY,
                        y2: edgeRight.endY
                    })
                }
            })

            setLinks(newLinks);
        }
    }, [tree]);

    return (
        <>
            <Button btnStyle="primary" onClick={() => drawTree()} rootClass="mt-2 ml-2">Draw Tree</Button>
            <VisualizationLayout>
                <div id="tree" className="border  border-red-600"> 
                    <svg cursor="grab" width={visualizationRef.current.offsetWidth} height={visualizationRef.current.offsetHeight} ref={svgTreeRef}>
                        <g transform="translate(0, 60)">
                            {
                                tree && links && <BaseTree nodes={Object.values(tree.uuidToNodeMap)} links={links} />
                            }
                        </g>
                    </svg>
                </div>
            </VisualizationLayout>
        </>
    )
}