import TreeNode, { NullTreeNode } from "../../classes/tree-node.js";
import Heap from "../../classes/heap.js";

describe ("Test constructor", () => {
    it ("Should fill up elements array on creation", () => {
        let root = new TreeNode(1, "a");
        
        let result = new Heap(root);

        let expected = [new TreeNode(1, "a")];

        expect(result.elements).toEqual(expected);

        root = new TreeNode(10, "a");
        root.setLeft(new TreeNode(8, "b"));
        root.children[0].setLeft(new TreeNode(5, "c"));
        root.setRight(new TreeNode(6, "d"));
        
        result = new Heap(root);

        expected = new TreeNode(10, "a");
        expected.setLeft(new TreeNode(8, "b"));
        expected.children[0].setLeft(new TreeNode(5, "c"));
        expected.setRight(new TreeNode(6, "d"));

        let expectedElements = [expected, expected.children[0], expected.children[1], expected.children[0].children[0]];
        expect(result.elements).toEqual(expectedElements);

        root = new TreeNode(10, "a");
        root.setLeft(new TreeNode(8, "b"));
        root.children[0].setLeft(new TreeNode(5, "c"));
        root.children[0].setRight(new TreeNode(5, "e"));
        root.setRight(new TreeNode(6, "d"));
        
        result = new Heap(root);

        expected = new TreeNode(10, "a");
        expected.setLeft(new TreeNode(8, "b"));
        expected.children[0].setLeft(new TreeNode(5, "c"));
        expected.children[0].setRight(new TreeNode(5, "e"));
        expected.setRight(new TreeNode(6, "d"));

        expectedElements = [expected, expected.children[0], expected.children[1], expected.children[0].children[0], expected.children[0].children[1]];
        expect(result.elements).toEqual(expectedElements);
    })
})

describe ("Test updateParentChildren method", () => {
    it ("Should properly set parent's children", () => {
        // test left child is set properly
        let root = new TreeNode(5, "a");

        let input = new Heap(root);
        input.elements.push(new TreeNode(-1, "b"));

        let expected = new TreeNode(5, "a");
        expected.setLeft(new TreeNode(-1, "b"));
        
        input.updateParentChildren(1);

        expect(input.elements[0]).toMatchObject(expected);

        // test right child is set properly
        root = new TreeNode(5, "a");
        root.setLeft(new TreeNode(-1, "b"));

        input = new Heap(root);
        input.elements.push(new TreeNode(2, "c"));

        expected = new TreeNode(5, "a");
        expected.setLeft(new TreeNode(-1, "b"));
        expected.setRight(new TreeNode(2, "c"));

        input.updateParentChildren(2);

        expect(input.elements[0]).toMatchObject(expected);
    })
})

describe ("Test swap method", () => {
    it ("Should swap two elements and update parent to match", () => {
        // test node swap w/o parent of idx1
        let root = new TreeNode(10, "a");
        root.setLeft(new TreeNode(8, "b"));
        root.setRight(new TreeNode(12, "c"));

        let result = new Heap(root);

        let expected = new TreeNode(12, "c");
        expected.setLeft(new TreeNode(8, "b"));
        expected.setRight(new TreeNode(10, "a"));

        let expectedElements = [expected, expected.children[0], expected.children[1]];

        result.swap(0, 2, []);
        
        expect(result.elements).toEqual(expectedElements);

        // test node swap, only left child of idx1 exists
        root = new TreeNode(12, "c");
        root.setLeft(new TreeNode(8, "b"));
        root.children[0].setLeft(new TreeNode(10, "d"));
        root.setRight(new TreeNode(10, "a"));

        expected = new TreeNode(12, "c");
        expected.setLeft(new TreeNode(10, "d"));
        expected.children[0].setLeft(new TreeNode(8, "b"));
        expected.setRight(new TreeNode(10, "a"));

        result = new Heap(root);

        expectedElements = [
            expected,
            expected.children[0], expected.children[1],
            expected.children[0].children[0]
        ];

        result.swap(1, 3, []);
        
        expect(result.elements).toEqual(expectedElements);

        // test node swap, both child of idx1 exists
        root = new TreeNode(12, "c");
        root.setLeft(new TreeNode(8, "b"));
        root.children[0].setLeft(new TreeNode(10, "d"));
        root.children[0].setRight(new TreeNode(5, "e"));
        root.setRight(new TreeNode(10, "a"));

        result = new Heap(root);

        expected = new TreeNode(12, "c");
        expected.setLeft(new TreeNode(10, "d"));
        expected.children[0].setLeft(new TreeNode(8, "b"));
        expected.children[0].setRight(new TreeNode(5, "e"));
        expected.setRight(new TreeNode(10, "a"));

        expectedElements = [
            expected,
            expected.children[0], expected.children[1],
            expected.children[0].children[0], expected.children[0].children[1]
        ];

        result.swap(1, 3, []);
        
        expect(result.elements).toEqual(expectedElements);

        // test node swap, both child of idx1 exists
        root = new TreeNode(12, "c");
        root.setLeft(new TreeNode(10, "d"));
        root.children[0].setLeft(new TreeNode(8, "b"));
        root.children[0].setRight(new TreeNode(5, "e"));
        root.setRight(new TreeNode(5, "bb"));
        root.children[1].setLeft(new TreeNode(6, "aa"));
        root.children[1].setRight(new TreeNode(9, "a"));

        result = new Heap(root);

        expected = new TreeNode(12, "c");
        expected.setLeft(new TreeNode(10, "d"));
        expected.children[0].setLeft(new TreeNode(8, "b"));
        expected.children[0].setRight(new TreeNode(5, "e"));
        expected.setRight(new TreeNode(9, "a"));
        expected.children[1].setLeft(new TreeNode(6, "aa"));
        expected.children[1].setRight(new TreeNode(5, "bb"));

        expectedElements = [
            expected,
            expected.children[0], expected.children[1],
            expected.children[0].children[0], expected.children[0].children[1], expected.children[1].children[0], expected.children[1].children[1]
        ];

        result.swap(2, 6, []);
        expect(result.elements).toEqual(expectedElements);
    })
})