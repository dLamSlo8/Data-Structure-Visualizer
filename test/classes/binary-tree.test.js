import { TreeNode } from "../../classes/tree-node.js";
import { BinaryTree } from "../../classes/binary-tree.js";


describe ("Test inOrderTraversal method", () => {
    it ("Should throw an error when missing root", () => {
        var input = new BinaryTree();

        expect(() => input.inOrderTraversal()).toThrow("Please insert a node into the tree.");
    })

    it ("Should give proper inOrderTraversal", () => {
        var root = new TreeNode(1, "a");
        // root.right
        root.children[1] = new TreeNode(2, "b");
        // root.right.left
        root.children[1].children[0] = new TreeNode(3, "c");
        
        var input = new BinaryTree(root);

        var expected = [[1, 3, 2], ["a", "c", "b"]]

        var result = input.inOrderTraversal();
        expect(result).toEqual(expected);

        var root = new TreeNode(1, "a");
        // root.left, [1,9,2,3,6,null,3,1] lc representation
        root.children[0] = new TreeNode(9, "b");
        // root.left.left
        root.children[0].children[0] = new TreeNode(3, "c");
        // root.left.left.left
        root.children[0].children[0].children[0] = new TreeNode(1, "d");
        // root.left.right
        root.children[0].children[1] = new TreeNode(6, "e");
        // root.right
        root.children[1] = new TreeNode(2, "f");
        // root.right.right
        root.children[1].children[1] = new TreeNode(3, "g");

        var input = new BinaryTree(root);

        var expected = [[1,3,9,6,1,2,3], ["d","c","b","e","a","f","g"]];

        var result = input.inOrderTraversal();
        expect(result).toEqual(expected);
    })
})

describe ("Test preOrderTraversal method", () => {
    it ("Should throw an error when missing root", () => {
        var input = new BinaryTree();

        expect(() => input.preOrderTraversal()).toThrow("Please insert a node into the tree.");
    })

    it ("Should give proper preOrderTraversal", () => {
        var root = new TreeNode(1, "a");
        // root.right
        root.children[1] = new TreeNode(2, "b");
        // root.right.left
        root.children[1].children[0] = new TreeNode(3, "c");
        
        var input = new BinaryTree(root);

        var expected = [[1, 2, 3], ["a", "b", "c"]]

        var result = input.preOrderTraversal();
        expect(result).toEqual(expected);

        var root = new TreeNode(1, "a");
        // root.left
        root.children[0] = new TreeNode(9, "b");
        // root.left.left
        root.children[0].children[0] = new TreeNode(3, "c");
        // root.left.left.left
        root.children[0].children[0].children[0] = new TreeNode(1, "d");
        // root.left.right
        root.children[0].children[1] = new TreeNode(6, "e");
        // root.right
        root.children[1] = new TreeNode(2, "f");
        // root.right.right
        root.children[1].children[1] = new TreeNode(3, "g");

        var input = new BinaryTree(root);

        var expected = [[1,9,3,1,6,2,3], ["a","b","c","d","e","f","g"]];

        var result = input.preOrderTraversal();
        expect(result).toEqual(expected);
    })
})

describe ("Test postOrderTraversal method", () => {
    it ("Should throw an error when missing root", () => {
        var input = new BinaryTree();

        expect(() => input.postOrderTraversal()).toThrow("Please insert a node into the tree.");
    })

    it ("Should give proper postOrderTraversal", () => {
        var root = new TreeNode(1, "a");
        // root.right
        root.children[1] = new TreeNode(2, "b");
        // root.right.left
        root.children[1].children[0] = new TreeNode(3, "c");
        
        var input = new BinaryTree(root);

        var expected = [[3,2,1], ["c","b","a"]]

        var result = input.postOrderTraversal();
        expect(result).toEqual(expected);

        var root = new TreeNode(1, "a");
        // root.left
        root.children[0] = new TreeNode(9, "b");
        // root.left.left
        root.children[0].children[0] = new TreeNode(3, "c");
        // root.left.left.left
        root.children[0].children[0].children[0] = new TreeNode(1, "d");
        // root.left.right
        root.children[0].children[1] = new TreeNode(6, "e");
        // root.right
        root.children[1] = new TreeNode(2, "f");
        // root.right.right
        root.children[1].children[1] = new TreeNode(3, "g");

        var input = new BinaryTree(root);

        var expected = [[1,3,6,9,3,2,1], ["d","c","e","b","g","f","a"]];

        var result = input.postOrderTraversal();
        expect(result).toEqual(expected);
    })
})

describe ("Test levelOrderTraversal method", () => {
    it ("Should throw an error when missing root", () => {
        var input = new BinaryTree();

        expect(() => input.levelOrderTraversal()).toThrow("Please insert a node into the tree.");
    })

    it ("Should give proper levelOrderTraversal", () => {
        var root = new TreeNode(1, "a");
        // root.right
        root.children[1] = new TreeNode(2, "b");
        // root.right.left
        root.children[1].children[0] = new TreeNode(3, "c");
        
        var input = new BinaryTree(root);

        var expected = [[1,2,3], ["a","b","c"]]

        var result = input.levelOrderTraversal();
        expect(result).toEqual(expected);

        var root = new TreeNode(1, "a");
        // root.left
        root.children[0] = new TreeNode(9, "b");
        // root.left.left
        root.children[0].children[0] = new TreeNode(3, "c");
        // root.left.left.left
        root.children[0].children[0].children[0] = new TreeNode(1, "d");
        // root.left.right
        root.children[0].children[1] = new TreeNode(6, "e");
        // root.right
        root.children[1] = new TreeNode(2, "f");
        // root.right.right
        root.children[1].children[1] = new TreeNode(3, "g");

        var input = new BinaryTree(root);

        var expected = [[1,9,2,3,6,3,1], ["a","b","f","c","e","g","d"]];

        var result = input.levelOrderTraversal();
        expect(result).toEqual(expected);
    })
})

describe("Test deleteSubtree method", () => {
    it ("Should throw an error when missing root", () => {
        var input = new BinaryTree();

        expect(() => input.deleteSubtree()).toThrow("Please insert a node into the tree.");
    })

    it ("Should return empty tree when deleting root", () => {
        var root = new TreeNode(15, "a");

        var input = new BinaryTree(root);

        input.deleteSubtree("a");

        expect(input.root).toBeNull();

        var root = new TreeNode(1, "123");
        root.children[0] = new TreeNode(2);
        root.children[0].children[0] = new TreeNode(4);
        root.children[0].children[1] = new TreeNode(7);
        root.children[1] = new TreeNode(3);
        root.children[1].children[0] = new TreeNode(6);
        root.children[1].children[1] = new TreeNode(10);

        var input = new BinaryTree(root);

        input.deleteSubtree("123");
        expect(input.root).toBeNull();
    })

    it ("Should remove proper subtree when given input", () => {
        var root = new TreeNode(1, "111");
        root.children[0] = new TreeNode(2, "112");
        root.children[0].children[0] = new TreeNode(4, "113");
        root.children[0].children[1] = new TreeNode(7, "114");
        root.children[1] = new TreeNode(3, "115");
        root.children[1].children[0] = new TreeNode(6, "116");
        root.children[1].children[1] = new TreeNode(10, "117");

        var input = new BinaryTree(root);

        var expected = new TreeNode(1, "111");
        expected.children[1] = new TreeNode(3, "115");
        expected.children[1].children[0] = new TreeNode(6, "116");
        expected.children[1].children[1] = new TreeNode(10, "117");

        input.deleteSubtree("112");
        expect(input.root).toMatchObject(expected);

        var root = new TreeNode(1, "111");
        root.children[0] = new TreeNode(2, "112");
        root.children[0].children[0] = new TreeNode(4, "113");
        root.children[0].children[1] = new TreeNode(7, "114");
        root.children[1] = new TreeNode(3, "115");
        root.children[1].children[0] = new TreeNode(6, "116");
        root.children[1].children[1] = new TreeNode(10, "117");

        var input = new BinaryTree(root);

        var expected = new TreeNode(1, "111");
        expected.children[0] = new TreeNode(2, "112");
        expected.children[0].children[0] = new TreeNode(4, "113");
        expected.children[0].children[1] = new TreeNode(7, "114");
        expected.children[1] = new TreeNode(3, "115");
        expected.children[1].children[0] = new TreeNode(6, "116");

        input.deleteSubtree("117");
        expect(input.root).toMatchObject(expected);

        var root = new TreeNode(1, "111");
        root.children[1] = new TreeNode(3, "115");
        root.children[1].children[0] = new TreeNode(6, "116");
        root.children[1].children[1] = new TreeNode(10, "117");
        root.children[1].children[1].children[1] = new TreeNode(10, "118");

        var input = new BinaryTree(root);

        var expected = new TreeNode(1, "111");
        expected.children[1] = new TreeNode(3, "115");
        expected.children[1].children[0] = new TreeNode(6, "116");

        input.deleteSubtree("117");
        expect(input.root).toMatchObject(expected);
    })
})

describe ("Test addNode method", () => {
    it ("Should throw an error when missing root", () => {
        var input = new BinaryTree();

        expect(() => input.addNode()).toThrow("Please insert a node into the tree.");
    })

    it ("Should throw error when child already exists", () => {
        var root = new TreeNode(1, "111");
        root.children[0] = new TreeNode(4, "100");

        var input = new BinaryTree(root);

        expect(() => input.addNode(7, true, "111")).toThrow("A left child for this node already exists.");

        var root = new TreeNode(1, "111");
        root.children[1] = new TreeNode(4, "100");
        
        var input = new BinaryTree(root);
        
        expect(() => input.addNode(7, false, "111")).toThrow("A right child for this node already exists.");
    })

    it ("Should add new node to tree structure", () => {
        var root = new TreeNode(1, "111");

        var input = new BinaryTree(root);

        var expected = new TreeNode(1, "111");
        expected.children[0] = new TreeNode(-1, "26");
        
        input.addNode(-1, true, "111", "26");
        expect(input.root).toMatchObject(expected);

        var root = new TreeNode(1, "111");
        root.children[0] = new TreeNode(2, "112");
        root.children[0].children[0] = new TreeNode(4, "113");
        root.children[0].children[1] = new TreeNode(7, "114");
        root.children[1] = new TreeNode(3, "115");
        root.children[1].children[0] = new TreeNode(6, "116");
        root.children[1].children[1] = new TreeNode(10, "117");

        var input = new BinaryTree(root);

        var expected = new TreeNode(1, "111");
        expected.children[0] = new TreeNode(2, "112");
        expected.children[0].children[0] = new TreeNode(4, "113");
        expected.children[0].children[0].children[1] = new TreeNode(0, "100");
        expected.children[0].children[1] = new TreeNode(7, "114");
        expected.children[1] = new TreeNode(3, "115");
        expected.children[1].children[0] = new TreeNode(6, "116");
        expected.children[1].children[1] = new TreeNode(10, "117");

        input.addNode(0, false, "113", "100");
        expect(input.root).toMatchObject(expected);
    })
})

describe ("Test replaceNodeValue method", () => {
    it ("Should throw an error when missing root", () => {
        var input = new BinaryTree();

        expect(() => input.replaceNodeValue(5, "123")).toThrow("Please insert a node into the tree.");
    })

    it ("Should update node value of corresponding node", () => {
        var root = new TreeNode(1, "123");

        var input = new BinaryTree(root);

        var expected = new TreeNode(5, "123");

        input.replaceNodeValue(5, "123");
        expect(input.root).toMatchObject(expected);

        var root = new TreeNode(5, "123");
        root.children[1] = new TreeNode(4, "111");
        root.children[1].children[0] = new TreeNode(6, "964");
        root.children[1].children[1] = new TreeNode(7, "432");

        var input = new BinaryTree(root);

        var expected = new TreeNode(5, "123");
        expected.children[1] = new TreeNode(-1, "111");
        expected.children[1].children[0] = new TreeNode(6, "964");
        expected.children[1].children[1] = new TreeNode(7, "432");

        input.replaceNodeValue(-1, "111");
        expect(input.root).toMatchObject(expected);

        var root = new TreeNode(-1, "123");
        root.children[0] = new TreeNode(-2, "111");
        root.children[0].children[0] = new TreeNode(2, "964");
        root.children[1] = new TreeNode(0, "432");
        root.children[1].children[1] = new TreeNode(-3, "231");
        root.children[1].children[1].children[1] = new TreeNode(-3, "777");

        var input = new BinaryTree(root);

        var expected = new TreeNode(-1, "123");
        expected.children[0] = new TreeNode(-2, "111");
        expected.children[0].children[0] = new TreeNode(2, "964");
        expected.children[1] = new TreeNode(0, "432");
        expected.children[1].children[1] = new TreeNode(-3, "231");
        expected.children[1].children[1].children[1] = new TreeNode(-2, "777");

        input.replaceNodeValue(-2, "777");
        expect(input.root).toMatchObject(expected);

        var root = new TreeNode(-1, "123");
        root.children[0] = new TreeNode(-2, "111");
        root.children[0].children[0] = new TreeNode(2, "964");
        root.children[1] = new TreeNode(0, "432");
        root.children[1].children[1] = new TreeNode(-3, "231");
        root.children[1].children[1].children[1] = new TreeNode(-3, "777");

        var input = new BinaryTree(root);

        var expected = new TreeNode(-1, "123");
        expected.children[0] = new TreeNode(-2, "111");
        expected.children[0].children[0] = new TreeNode(0, "964");
        expected.children[1] = new TreeNode(0, "432");
        expected.children[1].children[1] = new TreeNode(-3, "231");
        expected.children[1].children[1].children[1] = new TreeNode(-3, "777");

        input.replaceNodeValue(0, "964");
        expect(input.root).toMatchObject(expected);
    })
})