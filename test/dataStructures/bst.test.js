import { insertNode, deleteNode, findNode } from "../../functions/dataStructures/helper/bst.js";
import { Node } from "../../functions/dataStructures/helper/bst.js";

describe("Test insertNode function", () => {
    it ("Should create a new node if tree does not exist", () => {
        var input = null;

        var expectedTree = new Node(5, 4);

        var expectedMoves = [4];

        var result = insertNode(input, 5, 4);

        expect(result[0]).toEqual(expectedMoves);
        expect(result[1]).toMatchObject(expectedTree);
    })

    it ("Should give proper moves array and tree", () => {
        var input = new Node(5, 1);
        input.left = new Node(5, 2);
        input.right = new Node(7, 3);

        var expectedTree = new Node(5, 1);
        expectedTree.left = new Node(5, 2);
        expectedTree.left.left = new Node(5, 4);
        expectedTree.right = new Node(7, 3);

        var expectedMoves = [1, 2, 4]

        var result = insertNode(input, 5, 4);
        
        expect(result[0]).toEqual(expectedMoves);
        expect(result[1]).toMatchObject(expectedTree);

        var input = new Node(5, 1);
        input.left = new Node(5, 2);
        input.left.left = new Node(4, 4);
        input.right = new Node(7, 3);

        var expectedTree = new Node(5, 1);
        expectedTree.left = new Node(5, 2);
        expectedTree.left.left = new Node(4, 4);
        expectedTree.left.left.right = new Node(5, 5);
        expectedTree.right = new Node(7, 3);

        var expectedMoves = [1, 2, 4, 5]

        var result = insertNode(input, 5, 5);
        expect(result[0]).toEqual(expectedMoves);
        expect(result[1]).toMatchObject(expectedTree);

        var input = new Node(5, 1);
        input.left = new Node(5, 2);
        input.left.left = new Node(4, 4);
        input.right = new Node(7, 3);
        input.right.right = new Node(10, 5);

        var expectedTree = new Node(5, 1);
        expectedTree.left = new Node(5, 2);
        expectedTree.left.left = new Node(4, 4);
        expectedTree.right = new Node(7, 3);
        expectedTree.right.right = new Node(10, 5);
        expectedTree.right.right.left = new Node(9, 6);

        var expectedMoves = [1, 3, 5, 6]

        var result = insertNode(input, 9, 6);

        expect(result[0]).toEqual(expectedMoves);
        expect(result[1]).toMatchObject(expectedTree);

        var input = new Node(5, 1);
        input.left = new Node(5, 2);
        input.left.left = new Node(4, 4);
        input.right = new Node(7, 3);
        input.right.right = new Node(10, 5);

        var expectedTree = new Node(5, 1);
        expectedTree.left = new Node(5, 2);
        expectedTree.left.left = new Node(4, 4);
        expectedTree.right = new Node(7, 3);
        expectedTree.right.left = new Node(6, 6);
        expectedTree.right.right = new Node(10, 5);

        var expectedMoves = [1, 3, 6]

        var result = insertNode(input, 6, 6);

        expect(result[0]).toEqual(expectedMoves);
        expect(result[1]).toMatchObject(expectedTree);

    })

    
})

describe("Test deleteNode function", () => {
    it ("Should give null if just one node", () => {
        var input = new Node(5, 1);

        var expectedMoves = [1];

        var result = deleteNode(input, 5);
        
        expect(result[0]).toEqual(expectedMoves);
        expect(result[1]).toBeNull();

    })

    it ("Should give error if node does not exist", () => {
        var input = new Node(5, 1);
        expect(() => deleteNode(input, 4)).toThrow("A node with this value does not exist in the tree");
    })

    it ("Should delete just the node if no children", () => {
        var input = new Node(5, 1);
        input.left = new Node(5, 2);
        input.left.left = new Node(5, 3);
        input.right = new Node(10, 5);
        input.right.left = new Node(8, 6);
        input.right.right = new Node(11, 7);

        var expectedTree = new Node(5, 1);
        expectedTree.left = new Node(5, 2);
        expectedTree.left.left = new Node(5, 3);
        expectedTree.right = new Node(10, 5);
        expectedTree.right.left = new Node(8, 6);

        var expectedMoves = [1, 5, 7];

        var result = deleteNode(input, 11);
        expect(result[0]).toEqual(expectedMoves);
        expect(result[1]).toMatchObject(expectedTree);

        var input = new Node(5, 1);
        input.left = new Node(5, 2);
        input.left.left = new Node(5, 3);
        input.right = new Node(10, 5);
        input.right.left = new Node(8, 6);
        input.right.right = new Node(11, 7);

        var expectedTree = new Node(5, 1);
        expectedTree.left = new Node(5, 2);
        expectedTree.left.left = new Node(5, 3);
        expectedTree.right = new Node(10, 5);
        expectedTree.right.right = new Node(11, 7);

        var expectedMoves = [1, 5, 6];

        var result = deleteNode(input, 8);
        expect(result[0]).toEqual(expectedMoves);
        expect(result[1]).toMatchObject(expectedTree);
    })

    it ("Should bring subtree up if one subtree is missing", () => {
        var input = new Node(5, 1);
        input.left = new Node(3, 2);
        input.left.left = new Node(-1, 3);
        input.left.left.right = new Node(1, 10);
        input.left.left.right.left = new Node(0, 11);
        input.left.left.right.right = new Node(2, 12);
        input.right = new Node(10, 5);
        input.right.left = new Node(8, 6);
        input.right.right = new Node(11, 7);

        var expectedTree = new Node(5, 1);
        expectedTree.left = new Node(3, 2);
        expectedTree.left.left = new Node(1, 10);
        expectedTree.left.left.left = new Node(0, 11);
        expectedTree.left.left.right = new Node(2, 12);
        expectedTree.right = new Node(10, 5);
        expectedTree.right.left = new Node(8, 6);
        expectedTree.right.right = new Node(11, 7);

        var expectedMoves = [1, 2, 3];

        var result = deleteNode(input, -1);
        expect(result[0]).toEqual(expectedMoves);
        expect(result[1]).toMatchObject(expectedTree);

        var input = new Node(5, 1);
        input.right = new Node(20, 2);
        input.right.right = new Node(25, 3);
        input.right.right.left = new Node(23, 4);
        input.right.right.right = new Node(27, 5);

        var expectedTree = new Node(5, 1);
        expectedTree.right = new Node(25, 3);
        expectedTree.right.left = new Node(23, 4);
        expectedTree.right.right = new Node(27, 5);

        var expectedMoves = [1, 2];

        var result = deleteNode(input, 20);
        expect(result[0]).toEqual(expectedMoves);
        expect(result[1]).toMatchObject(expectedTree);

        var input = new Node(5, 1);
        input.right = new Node(20, 2);
        input.right.left = new Node(10, 3);
        input.right.left.left = new Node(7, 4);
        input.right.left.right = new Node(15, 5);

        var expectedTree = new Node(5, 1);
        expectedTree.right = new Node(10, 3);
        expectedTree.right.left = new Node(7, 4);
        expectedTree.right.right = new Node(15, 5);

        var expectedMoves = [1, 2];

        var result = deleteNode(input, 20);
        expect(result[0]).toEqual(expectedMoves);
        expect(result[1]).toMatchObject(expectedTree);
    })

    it ("Should remove inorder successor when two children", () => {
        var input = new Node(50, 1);
        input.left = new Node(40, 2);
        input.right = new Node(70, 5);
        input.right.left = new Node(60, 6);
        input.right.right = new Node(80, 7);

        var expectedTree = new Node(60, 6);
        expectedTree.left = new Node(40, 2);
        expectedTree.right = new Node(70, 5);
        expectedTree.right.right = new Node(80, 7);

        var expectedMoves = [1];
        var expectedNode = {"id": 6}

        var result = deleteNode(input, 50);
        
        expect(result[0].slice(0, -1)).toEqual(expectedMoves);
        expect(result[0][result.length - 1]).toMatchObject(expectedNode);
        expect(result[1]).toMatchObject(expectedTree);

        var input = new Node(50, 1);
        input.left = new Node(40, 2);
        input.right = new Node(70, 5);

        var expectedTree = new Node(70, 5);
        expectedTree.left = new Node(40, 2);

        var expectedMoves = [1];
        var expectedNode = {"id": 5};
        var result = deleteNode(input, 50);

        expect(result[0].slice(0, -1)).toEqual(expectedMoves);
        expect(result[0][result.length - 1]).toMatchObject(expectedNode);
        expect(result[1]).toMatchObject(expectedTree);

        var input = new Node(50, 1);
        input.left = new Node(40, 2);
        input.right = new Node(70, 5);
        input.right.left = new Node(60, 4);
        input.right.left.left = new Node(55, 7);
        input.right.left.left.left = new Node(53, 9);
        input.right.left.left.left.left = new Node(51, 10);
        input.right.left.right = new Node(63, 8);
        input.right.right = new Node(77, 6);

        var expectedTree = new Node(51, 10);
        expectedTree.left = new Node(40, 2);
        expectedTree.right = new Node(70, 5);
        expectedTree.right.left = new Node(60, 4);
        expectedTree.right.left.left = new Node(55, 7);
        expectedTree.right.left.left.left = new Node(53, 9);
        expectedTree.right.left.right = new Node(63, 8);
        expectedTree.right.right = new Node(77, 6);

        var expectedMoves = [1];
        var expectedNode = {"id": 10};
        var result = deleteNode(input, 50);

       
        expect(result[0].slice(0, -1)).toEqual(expectedMoves);
        expect(result[0][result.length - 1]).toMatchObject(expectedNode);
        expect(result[1]).toMatchObject(expectedTree);
    })

    it ("Should delete first value if duplicates", () => {
        var input = new Node(5, 1);
        input.left = new Node(5, 2);
        input.left.left = new Node(5, 3);
        input.right = new Node(10, 5);
        input.right.left = new Node(8, 6);
        input.right.right = new Node(11, 7);

        var expectedTree = new Node(8, 6);
        expectedTree.left = new Node(5, 2);
        expectedTree.left.left = new Node(5, 3)
        expectedTree.right = new Node(10, 5);
        expectedTree.right.right = new Node(11, 7);

        var expectedMoves = [1];
        var expectedNode = {"id": 6};

        var result = deleteNode(input, 5);
        
        expect(result[0].slice(0, -1)).toEqual(expectedMoves);
        expect(result[0][result.length - 1]).toMatchObject(expectedNode);
        expect(result[1]).toMatchObject(expectedTree);

    })
})

describe("Test findNode function", () => {
    it ("Should throw error if node does not exist", () => {
        var input = new Node(5, 1);
        input.left = new Node(2, 2);
        input.left.right = new Node(3, 3);
        
        expect(() => findNode(input, 4)).toThrow("A node with this value does not exist in the tree");

        var input = null;
        expect(() => findNode(input, 4)).toThrow("A node with this value does not exist in the tree");
    })

    it ("Should find node if it exists in tree", () => {
        var input = new Node(5, 1);
        input.left = new Node(2, 2);
        input.left.left = new Node(-1, 10)
        input.left.right = new Node(3, 3);
        input.left.right.right = new Node(4, 4);

        var expectedMoves = [1, 2, 3, 4];
        
        var result = findNode(input, 4);
        expect(result).toEqual(expectedMoves);

        var input = new Node(6, 1);
        input.left = new Node(5, 2);
        input.left.left = new Node(5, 3);
        input.right = new Node(10, 5);
        input.right.left = new Node(8, 6);
        input.right.right = new Node(11, 7);

        var expectedMoves = [1, 2];
        
        var result = findNode(input, 5);
        expect(result).toEqual(expectedMoves);

        var input = new Node(6, 1);
        input.left = new Node(5, 2);
        input.left.left = new Node(5, 3);
        input.right = new Node(10, 5);
        input.right.left = new Node(8, 6);
        input.right.right = new Node(11, 7);

        var expectedMoves = [1, 5, 7];
        
        var result = findNode(input, 11);
        expect(result).toEqual(expectedMoves);
    })

})