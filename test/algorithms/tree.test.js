import {nodeToString, parseTree, replaceNodeValue, updateId, inOrderTraversal, preOrderTraversal, postOrderTraversal, levelOrderTraversal, deleteSubtree, addNode} from "../functions/tree.js";
import {Node} from "../functions/tree.js"

describe("Test parseTree function", () => {
    it ("Should throw an error for non binary tree", () => {
        var input = JSON.parse("[1, [2, 3, 4], null]");
        expect(() => parseTree(input)).toThrow("A binary tree must have 2 children per node.");

        var input = JSON.parse("[1, [2], null]");
        expect(() => parseTree(input)).toThrow("A binary tree must have 2 children per node.");

        var input = JSON.parse("[]");
        expect(() => parseTree(input)).toThrow("A binary tree must have 2 children per node.");
    })

    it ("Should give tree when correct input", () => {
        var input = JSON.parse("[1, [5, null, null], [4, [7, [4, null, null], [8, null, null]], [12, null, null]]]");

        var expected = new Node(1);
        expected.left = new Node(5);
        expected.right = new Node(4);
        var right = expected.right;
        right.left = new Node(7);
        right.left.left = new Node(4);
        right.left.right = new Node(8);
        right.right = new Node(12);

        var result = parseTree(input);
        updateId(result, 0);
        updateId(expected, 0);
        expect(result).toMatchObject(expected);

        var input = JSON.parse("[0, null, [5, [1, null, null], null]]");

        var expected = new Node(0);
        expected.right = new Node(5);
        expected.right.left = new Node(1);

        var result = parseTree(input);
        updateId(result, 0);
        updateId(expected, 0);
        expect(result).toMatchObject(expected);


        var input = JSON.parse("[-1, [-2, [2, null, null], null], [0, null, [1, null, [-3, null, null]]]]");

        var expected = new Node(-1);
        expected.left = new Node(-2);
        expected.left.left = new Node(2);
        expected.right = new Node(0);
        expected.right.right = new Node(1);
        expected.right.right.right = new Node(-3);

        var result = parseTree(input);
        updateId(result, 0);
        updateId(expected, 0);
        expect(result).toMatchObject(expected);
    })
})


describe ("Test nodeToString function", () => {
    it ("Should give string when correct input", () => {
        var input = new Node(1);
        input.left = new Node(5);
        input.right = new Node(4);
        var right = input.right;
        right.left = new Node(7);
        right.left.left = new Node(4);
        right.left.right = new Node(8);
        right.right = new Node(12);
        
        var expected = "[1, [5, null, null], [4, [7, [4, null, null], [8, null, null]], [12, null, null]]]";

        var result = nodeToString(input);
        expect(result).toBe(expected);

        var input = new Node(0);
        input.right = new Node(5);
        input.right.left = new Node(1);

        var expected = "[0, null, [5, [1, null, null], null]]";
        var result = nodeToString(input);
        expect(result).toBe(expected);

        var input = new Node(-1);
        input.left = new Node(-2);
        input.left.left = new Node(2);
        input.right = new Node(0);
        input.right.right = new Node(1);
        input.right.right.right = new Node(-3);

        var expected = "[-1, [-2, [2, null, null], null], [0, null, [1, null, [-3, null, null]]]]";
        var result = nodeToString(input);
        expect(result).toBe(expected);
    })
})

describe("Test replaceNodeValue function", () => {
    it ("Should create new node to replace existing node", () => {
        var input = new Node(1, 123);

        var expected = new Node(5, 123);
        var result = replaceNodeValue(input, 5, 123);
        expect(result).toMatchObject(expected);

        var input = new Node(5, 123);
        input.right = new Node(4, 111);
        input.right.left = new Node(6, 964);
        input.right.right = new Node(7, 432);

        var expected = new Node(5, 123);
        expected.right = new Node(-1, 111);
        expected.right.left = new Node(6, 964);
        expected.right.right = new Node(7, 432);

        var result = replaceNodeValue(input, -1, 111);
        expect(result).toMatchObject(expected);

        var input = new Node(-1, 123);
        input.left = new Node(-2, 111);
        input.left.left = new Node(2, 964);
        input.right = new Node(0, 432);
        input.right.right = new Node(-3, 231);
        input.right.right.right = new Node(-3, 777);

        var expected = new Node(-1, 123);
        expected.left = new Node(-2, 111);
        expected.left.left = new Node(2, 964);
        expected.right = new Node(0, 432);
        expected.right.right = new Node(-3, 231);
        expected.right.right.right = new Node(-2, 777);

        var result = replaceNodeValue(input, -2, 777);
        expect(result).toMatchObject(expected);

        var input = new Node(-1, 123);
        input.left = new Node(-2, 111);
        input.left.left = new Node(2, 964);
        input.right = new Node(0, 432);
        input.right.right = new Node(-3, 231);
        input.right.right.right = new Node(-3, 777);

        var expected = new Node(-1, 123);
        expected.left = new Node(-2, 111);
        expected.left.left = new Node(0, 964);
        expected.right = new Node(0, 432);
        expected.right.right = new Node(-3, 231);
        expected.right.right.right = new Node(-3, 777);

        var result = replaceNodeValue(input, 0, 964);
        expect(result).toMatchObject(expected);

    })
})

describe ("Test inorder traversal", () => {
    it ("Should give proper inorder traversal", () => {
        var input = new Node(1);
        input.right = new Node(2);
        input.right.left = new Node(3);

        var expected = "[1,3,2]"
        var result = inOrderTraversal(input);
        expect(result).toBe(expected);

        var input = new Node(1);
        input.left = new Node(9);
        input.left.left = new Node(3);
        input.left.left.left = new Node(1);
        input.left.right = new Node(6);
        input.right = new Node(2);
        input.right.right = new Node(3);


        var expected = "[1,3,9,6,1,2,3]"
        var result = inOrderTraversal(input);
        expect(result).toBe(expected);

    })
})

describe ("Test preorder traversal", () => {
    it ("Should give proper preorder traversal", () => {
        var input = new Node(1);
        input.right = new Node(2);
        input.right.left = new Node(3);

        var expected = "[1,2,3]"
        var result = preOrderTraversal(input);
        expect(result).toBe(expected);

        var input = new Node(1);
        input.left = new Node(9);
        input.left.left = new Node(3);
        input.left.left.left = new Node(1);
        input.left.right = new Node(6);
        input.right = new Node(2);
        input.right.right = new Node(3);


        var expected = "[1,9,3,1,6,2,3]"
        var result = preOrderTraversal(input);
        expect(result).toBe(expected);
    })
})

describe ("Test postorder traversal", () => {
    it ("Should give proper postorder traversal", () => {
        var input = new Node(1);
        input.right = new Node(2);
        input.right.left = new Node(3);

        var expected = "[3,2,1]"
        var result = postOrderTraversal(input);
        expect(result).toBe(expected);

        var input = new Node(1);
        input.left = new Node(9);
        input.left.left = new Node(3);
        input.left.left.left = new Node(1);
        input.left.right = new Node(6);
        input.right = new Node(2);
        input.right.right = new Node(3);


        var expected = "[1,3,6,9,3,2,1]"
        var result = postOrderTraversal(input);
        expect(result).toBe(expected);
    })
})

describe ("Test level order traversal", () => {
    it ("Should give proper level order traversal", () => {
        var input = new Node(1);
        input.right = new Node(2);
        input.right.left = new Node(3);

        var expected = "[1,2,3]"
        var result = levelOrderTraversal(input);
        expect(result).toBe(expected);

        var input = new Node(1);
        input.left = new Node(9);
        input.left.left = new Node(3);
        input.left.left.left = new Node(1);
        input.left.right = new Node(6);
        input.right = new Node(2);
        input.right.right = new Node(3);


        var expected = "[1,9,2,3,6,3,1]"
        var result = levelOrderTraversal(input);
        expect(result).toBe(expected);
    })
})


describe ("Test deleteSubtree function", () => {
    it ("Should return empty tree when deleting root", () =>{
        var input = new Node(1, 123);

        var result = deleteSubtree(input, 123);
        expect(result).toBeNull();

        var input = new Node(1, 123);
        input.left = new Node(2);
        input.left.left = new Node(4);
        input.left.right = new Node(7);
        input.right = new Node(3);
        input.right.left = new Node(6);
        input.right.right = new Node(10);

        var result = deleteSubtree(input, 123);
        expect(result).toBeNull();
    })

    it ("Should remove proper subtree when given input", () => {
        var input = new Node(1, 111);
        input.left = new Node(2, 112);
        input.left.left = new Node(4, 113);
        input.left.right = new Node(7, 114);
        input.right = new Node(3, 115);
        input.right.left = new Node(6, 116);
        input.right.right = new Node(10, 117);

        var expected = new Node(1, 111);
        expected.right = new Node(3, 115);
        expected.right.left = new Node(6, 116);
        expected.right.right = new Node(10, 117);

        var result = deleteSubtree(input, 112);
        expect(result).toMatchObject(expected);

        var input = new Node(1, 111);
        input.left = new Node(2, 112);
        input.left.left = new Node(4, 113);
        input.left.right = new Node(7, 114);
        input.right = new Node(3, 115);
        input.right.left = new Node(6, 116);
        input.right.right = new Node(10, 117);

        var expected = new Node(1, 111);
        expected.left = new Node(2, 112);
        expected.left.left = new Node(4, 113);
        expected.left.right = new Node(7, 114);
        expected.right = new Node(3, 115);
        expected.right.left = new Node(6, 116);

        var result = deleteSubtree(input, 117);
        expect(result).toMatchObject(expected);

        var input = new Node(1, 111);
        input.right = new Node(3, 115);
        input.right.left = new Node(6, 116);
        input.right.right = new Node(10, 117);
        input.right.right.right = new Node(10, 118);

        var expected = new Node(1, 111);
        expected.right = new Node(3, 115);
        expected.right.left = new Node(6, 116);

        var result = deleteSubtree(input, 117);
        expect(result).toMatchObject(expected);
    })
})

describe ("Test addNode function", () => {
    it ("Should throw error when child already exists", () => {
        var input = new Node(1, 111);
        input.left = new Node(4, 100);

        expect(() => addNode(input, 7, true, 111)).toThrow("A left child for this node already exists.");

        var input = new Node(1, 111);
        input.right = new Node(4, 100);

        expect(() => addNode(input, 7, false, 111)).toThrow("A right child for this node already exists.");
    })

    it ("Should add new node to tree structure", () => {
        var input = new Node(1, 111);

        var expected = new Node(1, 111);
        expected.left = new Node(-1, 26);

        var result = addNode(input, -1, true, 111, 26);
        expect(result).toMatchObject(expected);

        var input = new Node(1, 111);
        input.left = new Node(2, 112);
        input.left.left = new Node(4, 113);
        input.left.right = new Node(7, 114);
        input.right = new Node(3, 115);
        input.right.left = new Node(6, 116);
        input.right.right = new Node(10, 117);

        var expected = new Node(1, 111);
        expected.left = new Node(2, 112);
        expected.left.left = new Node(4, 113);
        expected.left.left.right = new Node(0, 100);
        expected.left.right = new Node(7, 114);
        expected.right = new Node(3, 115);
        expected.right.left = new Node(6, 116);
        expected.right.right = new Node(10, 117);

        var result = addNode(input, 0, false, 113, 100);
        expect(result).toMatchObject(expected);
    })
})