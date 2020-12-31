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

    it ("Should make a copy of original heap for copy constructor", () => {
        let expected = new TreeNode(10, "a");
        expected.setLeft(new TreeNode(8, "b"));
        expected.children[0].setLeft(new TreeNode(5, "c"));
        expected.setRight(new TreeNode(6, "d"));

        let expectedElements = [expected, expected.children[0], expected.children[1], expected.children[0].children[0]];

        let input = new Heap(expected);
        let result = new Heap(null, null, null, input);

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

describe ("Test clearParentChild method", () => {
    it ("Should remove child from parent", () => {
        // test remove left
        let root = new TreeNode(11, "a");
        root.setLeft(new TreeNode(7, "b"));

        let input = new Heap(root);

        let expected = new TreeNode(11, "a");

        input.clearParentChildren(root, root.children[0]);
        expect(input.elements[0]).toMatchObject(expected);

        // test remove right
        root = new TreeNode(11, "a");
        root.setLeft(new TreeNode(7, "b"));
        root.setRight(new TreeNode(10, "c"));

        input = new Heap(root);

        expected = new TreeNode(11, "a");
        expected.setLeft(new TreeNode(7, "b"))

        input.clearParentChildren(root, root.children[1]);
        expect(input.elements[0]).toMatchObject(expected);
    })
})

describe ("Test top method", () => {
    it ("Should throw an error when empty tree", () => {
        let result = new Heap();

        expect(() => result.top()).toThrow("Please insert a node into the tree!");
    })

    it ("Should return highest priority node", () => {
        let root = new TreeNode(10, "a");
        root.setLeft = new TreeNode(4, "b");
        root.setRight = new TreeNode(8, "c");

        let input = new Heap(root);

        let expected = new TreeNode(10, "a");
        expected.setLeft = new TreeNode(4, "b");
        expected.setRight = new TreeNode(8, "c");

        let result = input.top();

        expect(result).toMatchObject(expected);
    })
})

describe ("Test remove method", () => {
    it ("Should throw an error when empty tree", () => {
        let result = new Heap();

        expect(() => result.remove()).toThrow("Please insert a node into the tree!");
    })

    it ("Should set tree and update moves array after remove", () => {
        // discuss moves array
        // delete one element in tree
        let root = new TreeNode(10, "a");

        let input = new Heap(root, "max");

        let expectedNode = new TreeNode(10, "a"); 
        let expectedMoves = [];
        let expectedElements = [];

        let result = input.remove();

        expect(result[0]).toMatchObject(expectedNode);
        expect(result[1]).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        // delete no bubble
        root = new TreeNode(10, "a");
        root.setLeft(new TreeNode(12, "b"));

        input = new Heap(root);

        let expected = new TreeNode(10, "a");

        expectedNode = new TreeNode(12, "b"); 
        expectedMoves = ["b"];
        expectedElements = [expectedNode];

        result = input.remove();

        expect(result[0]).toMatchObject(expected);
        expect(result[1]).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        root = new TreeNode(10, "a");
        root.setLeft(new TreeNode(12, "b"));
        root.children[0].setLeft(new TreeNode(18, "c"));
        root.children[0].setRight(new TreeNode(20, "d"));
        root.setRight(new TreeNode(15, "e"));

        input = new Heap(root);

        expected = new TreeNode(10, "a");

        expectedNode = new TreeNode(12, "b");
        expectedNode.setLeft(new TreeNode(18, "c"));
        expectedNode.children[0].setLeft(new TreeNode(20, "d"));
        expectedNode.setRight(new TreeNode(15, "e"));

        expectedMoves = ["d", "b", "c"];
        expectedElements = [
            expectedNode,
            expectedNode.children[0], expectedNode.children[1],
            expectedNode.children[0].children[0]
        ];

        result = input.remove();
 
        expect(result[0]).toMatchObject(expected);
        expect(result[1]).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);


        // delete and bubble down left
        root = new TreeNode(10, "a");
        root.setLeft(new TreeNode(7, "b"));
        root.children[0].setLeft(new TreeNode(5, "c"));
        root.children[0].children[0].setLeft(new TreeNode(2, "d"));
        root.children[0].children[0].setRight(new TreeNode(1, "e"));
        root.children[0].setRight(new TreeNode(6, "f"));
        root.children[0].children[1].setLeft(new TreeNode(3, "g"));
        root.children[0].children[1].setRight(new TreeNode(-4, "h"));
        root.setRight(new TreeNode(4, "i"));
        root.children[1].setLeft(new TreeNode(2, "j"));
        root.children[1].setRight(new TreeNode(-1, "k"));

        input = new Heap(root, "max");

        expected = new TreeNode(10, "a");

        expectedNode = new TreeNode(7, "b");
        expectedNode.setLeft(new TreeNode(6, "f"));
        expectedNode.children[0].setLeft(new TreeNode(5, "c"));
        expectedNode.children[0].children[0].setLeft(new TreeNode(2, "d"));
        expectedNode.children[0].children[0].setRight(new TreeNode(1, "e"));
        expectedNode.children[0].setRight(new TreeNode(3, "g"));
        expectedNode.children[0].children[1].setLeft(new TreeNode(-4, "h"));
        expectedNode.setRight(new TreeNode(4, "i"));
        expectedNode.children[1].setLeft(new TreeNode(2, "j"));
        expectedNode.children[1].setRight(new TreeNode(-1, "k"));

        result = input.remove();

        expectedMoves = ["h", "b", "f", "g"];
        expectedElements = [
            expectedNode,
            expectedNode.children[0], expectedNode.children[1],
            expectedNode.children[0].children[0], expectedNode.children[0].children[1], expectedNode.children[1].children[0], expectedNode.children[1].children[1],
            expectedNode.children[0].children[0].children[0], expectedNode.children[0].children[0].children[1], expectedNode.children[0].children[1].children[0]
        ];

        expect(result[0]).toMatchObject(expected);
        expect(result[1]).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);
    })
})

describe ("Test insert method", () => {
    it ("Should update tree and set moves array after insert", () => {
        // insert into empty tree
        let input = new Heap();

        let expected = new TreeNode(10, "a");

        let expectedMoves = [];
        let expectedElements = [
            expected
        ];

        let result = input.insert(10, "a");

        expect(result).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        // insert left no bubble
        let root = new TreeNode(10, "a");

        input = new Heap(root);

        expected = new TreeNode(10, "a");
        expected.setLeft(new TreeNode(12, "b"));

        expectedMoves = [];
        expectedElements = [
            expected,
            expected.children[0]
        ];

        result = input.insert(12, "b");

        expect(result).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        // insert right no bubble
        root = new TreeNode(10, "a");
        root.setLeft(new TreeNode(12, "b"));

        input = new Heap(root);

        expected = new TreeNode(10, "a");
        expected.setLeft(new TreeNode(12, "b"));
        expected.setRight(new TreeNode(14, "c"));

        expectedMoves = [];
        expectedElements = [
            expected,
            expected.children[0], expected.children[1],
        ];

        result = input.insert(14, "c");

        expect(result).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        root = new TreeNode(10, "a");
        root.setLeft(new TreeNode(10, "b"));
        root.children[0].setLeft(new TreeNode(19, "c"));
        root.children[0].setRight(new TreeNode(16, "d"));
        root.setRight(new TreeNode(20, "e"));

        input = new Heap(root);

        expected = new TreeNode(10, "a");
        expected.setLeft(new TreeNode(10, "b"));
        expected.children[0].setLeft(new TreeNode(19, "c"));
        expected.children[0].setRight(new TreeNode(16, "d"));
        expected.setRight(new TreeNode(15, "f"));
        expected.children[1].setLeft(new TreeNode(20, "e"));

        expectedMoves = ["e"];
        expectedElements = [
            expected,
            expected.children[0], expected.children[1],
            expected.children[0].children[0], expected.children[0].children[1], expected.children[1].children[0]
        ];

        result = input.insert(15, "f");

        expect(result).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        root = new TreeNode(10, "a");
        root.setLeft(new TreeNode(10, "b"));
        root.children[0].setLeft(new TreeNode(19, "c"));
        root.children[0].setRight(new TreeNode(16, "d"));
        root.setRight(new TreeNode(15, "e"));
        root.children[1].setLeft(new TreeNode(20, "f"));

        input = new Heap(root);

        expected = new TreeNode(-1, "g");
        expected.setLeft(new TreeNode(10, "b"));
        expected.children[0].setLeft(new TreeNode(19, "c"));
        expected.children[0].setRight(new TreeNode(16, "d"));
        expected.setRight(new TreeNode(10, "a"));
        expected.children[1].setLeft(new TreeNode(20, "f"));
        expected.children[1].setRight(new TreeNode(15, "e"));

        expectedMoves = ["e", "a"];
        expectedElements = [
            expected,
            expected.children[0], expected.children[1],
            expected.children[0].children[0], expected.children[0].children[1], expected.children[1].children[0], expected.children[1].children[1]
        ];

        result = input.insert(-1, "g");

        expect(result).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);
    })
})

describe ("Test insert and delete", () => {
    it ("Should update tree and set moves after series of insert and delete", () => {
        // taken from backtobackswe binheap example
        let input = new Heap();

        let expected = new TreeNode(10, "a");

        let expectedMoves = [];
        let expectedElements = [
            expected
        ];

        let result = input.insert(10, "a");

        expect(result).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        result = input.insert(4, "b");

        expected = new TreeNode(4, "b");
        expected.setLeft(new TreeNode(10, "a"));

        expectedMoves = ["a"];
        expectedElements = [
            expected,
            expected.children[0]
        ];

        expect(result).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        result = input.insert(15, "c");

        expected = new TreeNode(4, "b");
        expected.setLeft(new TreeNode(10, "a"));
        expected.setRight(new TreeNode(15, "c"));

        expectedMoves = [];
        expectedElements = [
            expected,
            expected.children[0], expected.children[1]
        ];

        expect(result).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        result = input.remove();

        let expectedNode = new TreeNode(4, "b");

        expected = new TreeNode(10, "a");
        expected.setLeft(new TreeNode(15, "c"));

        expectedMoves = ["c", "a"];
        expectedElements = [
            expected,
            expected.children[0]
        ];

        expect(result[0]).toMatchObject(expectedNode);
        expect(result[1]).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        result = input.insert(20, "d");

        expected = new TreeNode(10, "a");
        expected.setLeft(new TreeNode(15, "c"));
        expected.setRight(new TreeNode(20, "d"));

        expectedMoves = [];
        expectedElements = [
            expected,
            expected.children[0], expected.children[1]
        ];

        expect(result).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        result = input.insert(0, "e");

        expected = new TreeNode(0, "e");
        expected.setLeft(new TreeNode(10, "a"));
        expected.children[0].setLeft(new TreeNode(15, "c"));
        expected.setRight(new TreeNode(20, "d"));

        expectedMoves = ["c", "a"];
        expectedElements = [
            expected,
            expected.children[0], expected.children[1],
            expected.children[0].children[0]
        ];

        expect(result).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        result = input.insert(30, "f");

        expected = new TreeNode(0, "e");
        expected.setLeft(new TreeNode(10, "a"));
        expected.children[0].setLeft(new TreeNode(15, "c"));
        expected.children[0].setRight(new TreeNode(30, "f"));
        expected.setRight(new TreeNode(20, "d"));

        expectedMoves = [];
        expectedElements = [
            expected,
            expected.children[0], expected.children[1],
            expected.children[0].children[0], expected.children[0].children[1]
        ];

        expect(result).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        result = input.remove();

        expectedNode = new TreeNode(0, "e");

        expected = new TreeNode(10, "a");
        expected.setLeft(new TreeNode(15, "c"));
        expected.children[0].setLeft(new TreeNode(30, "f"));
        expected.setRight(new TreeNode(20, "d"));

        expectedMoves = ["f", "a", "c"];
        expectedElements = [
            expected,
            expected.children[0], expected.children[1],
            expected.children[0].children[0]
        ];

        expect(result[0]).toMatchObject(expectedNode);
        expect(result[1]).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        result = input.remove();

        expectedNode = new TreeNode(10, "a");

        expected = new TreeNode(15, "c");
        expected.setLeft(new TreeNode(30, "f"));
        expected.setRight(new TreeNode(20, "d"));

        expectedMoves = ["f", "c"];
        expectedElements = [
            expected,
            expected.children[0], expected.children[1],
        ];

        expect(result[0]).toMatchObject(expectedNode);
        expect(result[1]).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        result = input.insert(2, "g");

        expected = new TreeNode(2, "g");
        expected.setLeft(new TreeNode(15, "c"));
        expected.children[0].setLeft(new TreeNode(30, "f"));
        expected.setRight(new TreeNode(20, "d"));

        expectedMoves = ["f", "c"];
        expectedElements = [
            expected,
            expected.children[0], expected.children[1],
            expected.children[0].children[0]
        ];

        expect(result).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        result = input.insert(4, "h");

        expected = new TreeNode(2, "g");
        expected.setLeft(new TreeNode(4, "h"));
        expected.children[0].setLeft(new TreeNode(30, "f"));
        expected.children[0].setRight(new TreeNode(15, "c"));
        expected.setRight(new TreeNode(20, "d"));

        expectedMoves = ["c"];
        expectedElements = [
            expected,
            expected.children[0], expected.children[1],
            expected.children[0].children[0], expected.children[0].children[1]
        ];

        expect(result).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        result = input.insert(-1, "i");

        expected = new TreeNode(-1, "i");
        expected.setLeft(new TreeNode(4, "h"));
        expected.children[0].setLeft(new TreeNode(30, "f"));
        expected.children[0].setRight(new TreeNode(15, "c"));
        expected.setRight(new TreeNode(2, "g"));
        expected.children[1].setLeft(new TreeNode(20, "d"));

        expectedMoves = ["d", "g"];
        expectedElements = [
            expected,
            expected.children[0], expected.children[1],
            expected.children[0].children[0], expected.children[0].children[1], expected.children[1].children[0]
        ];

        expect(result).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);

        result = input.insert(-3, "j");

        expected = new TreeNode(-3, "j");
        expected.setLeft(new TreeNode(4, "h"));
        expected.children[0].setLeft(new TreeNode(30, "f"));
        expected.children[0].setRight(new TreeNode(15, "c"));
        expected.setRight(new TreeNode(-1, "i"));
        expected.children[1].setLeft(new TreeNode(20, "d"));
        expected.children[1].setRight(new TreeNode(2, "g"));

        expectedMoves = ["g", "i"];
        expectedElements = [
            expected,
            expected.children[0], expected.children[1],
            expected.children[0].children[0], expected.children[0].children[1], expected.children[1].children[0], expected.children[1].children[1]
        ];

        expect(result).toEqual(expectedMoves);
        expect(input.elements).toEqual(expectedElements);
    })
})