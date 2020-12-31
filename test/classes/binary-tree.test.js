import TreeNode, { NullTreeNode } from "../../classes/tree-node.js";
import BinaryTree from "../../classes/binary-tree.js";


describe ("Test inOrderTraversal method", () => {
    it ("Should throw an error when missing root", () => {
        let input = new BinaryTree();

        expect(() => input.inOrderTraversal()).toThrow("Please insert a node into the tree.");
    })

    it ("Should give proper inOrderTraversal", () => {
        let root = new TreeNode(1, "a");
        // root.right
        root.setRight(new TreeNode(2, "b"));
        // root.right.left
        root.children[1].setLeft(new TreeNode(3, "c"));
        
        let input = new BinaryTree(root);

        let expectedPath = [
            {"type": "left", "uuid": "a"},
            {"type": "visit", "uuid": "a"},
            {"type": "right", "uuid": "b"},
            {"type": "left", "uuid" :"c"},
            {"type": "left", "uuid" :"c"},
            {"type": "visit", "uuid" :"c"},
            {"type": "right", "uuid" :"c"},
            {"type": "parent", "uuid" :"b"},
            {"type": "visit", "uuid" :"b"}
        ]
        let expected = [[1, 3, 2], expectedPath];

        let result = input.inOrderTraversal();
        expect(result).toEqual(expected);

        
        root = new TreeNode(1, "a");
        // root.left, [1,9,2,3,6,null,3,1] lc representation
        root.setLeft(new TreeNode(9, "b"));
        // root.left.left
        root.children[0].setLeft(new TreeNode(3, "c"));
        // root.left.left.left
        root.children[0].children[0].setLeft(new TreeNode(1, "d"));
        // root.left.right
        root.children[0].setRight(new TreeNode(6, "e"));
        // root.right
        root.setRight(new TreeNode(2, "f"));
        // root.right.right
        root.children[1].setRight(new TreeNode(3, "g"));

        input = new BinaryTree(root);

        expectedPath = [
            {"type": "left", "uuid":"b"},
            {"type": "left", "uuid":"c"},
            {"type": "left", "uuid":"d"},
            {"type": "left", "uuid":"d"},
            {"type": "visit", "uuid":"d"},
            {"type": "right", "uuid":"d"},
            {"type": "parent", "uuid": "c"},
            {"type": "visit", "uuid":"c"}, 
            {"type": "right", "uuid":"c"},
            {"type": "parent", "uuid":"b"},
            {"type": "visit", "uuid":"b"},
            {"type": "right", "uuid":"e"},
            {"type": "left", "uuid":"e"},
            {"type": "visit", "uuid":"e"},
            {"type": "right", "uuid":"e"},
            {"type": "parent", "uuid":"b"},
            {"type": "parent", "uuid":"a"},
            {"type": "visit", "uuid":"a"},
            {"type": "right", "uuid":"f"},
            {"type": "left", "uuid":"f"},
            {"type": "visit", "uuid":"f"},
            {"type": "right", "uuid":"g"},
            {"type": "left", "uuid":"g"},
            {"type": "visit", "uuid":"g"}
        ]
        expected = [[1,3,9,6,1,2,3], expectedPath];

        result = input.inOrderTraversal();
        expect(result).toEqual(expected);
        
    })
})

describe ("Test preOrderTraversal method", () => {
    it ("Should throw an error when missing root", () => {
        let input = new BinaryTree();

        expect(() => input.preOrderTraversal()).toThrow("Please insert a node into the tree.");
    })

    it ("Should give proper preOrderTraversal", () => {
        let root = new TreeNode(1, "a");
        // root.right
        root.setRight(new TreeNode(2, "b"));
        // root.right.left
        root.children[1].setLeft(new TreeNode(3, "c"));
        
        let input = new BinaryTree(root);

        let expectedPath = [
            {"type": "visit", "uuid": "a"},
            {"type": "left", "uuid": "a"},
            {"type": "right", "uuid": "b"},
            {"type": "visit", "uuid": "b"},
            {"type": "left", "uuid": "c"},
            {"type": "visit", "uuid": "c"}
        ]
        let expected = [[1, 2, 3], expectedPath]

        let result = input.preOrderTraversal();
        expect(result).toEqual(expected);

        root = new TreeNode(1, "a");
        // root.left, [1,9,2,3,6,null,3,1] lc representation
        root.setLeft(new TreeNode(9, "b"));
        // root.left.left
        root.children[0].setLeft(new TreeNode(3, "c"));
        // root.left.left.left
        root.children[0].children[0].setLeft(new TreeNode(1, "d"));
        // root.left.right
        root.children[0].setRight(new TreeNode(6, "e"));
        // root.right
        root.setRight(new TreeNode(2, "f"));
        // root.right.right
        root.children[1].setRight(new TreeNode(3, "g"));


        input = new BinaryTree(root);

        expectedPath = [
            {"type": "visit", "uuid" :"a"},
            {"type": "left", "uuid" :"b"},
            {"type": "visit", "uuid" :"b"},
            {"type": "left", "uuid" :"c"},
            {"type": "visit", "uuid" :"c"}, 
            {"type": "left", "uuid" :"d"},
            {"type": "visit", "uuid" :"d"},
            {"type": "left", "uuid" :"d"},
            {"type": "right", "uuid" :"d"},
            {"type": "parent", "uuid" : "c"},
            {"type": "right", "uuid" :"c"},
            {"type": "parent", "uuid" :"b"},
            {"type": "right", "uuid" :"e"},
            {"type": "visit", "uuid" :"e"},
            {"type": "left", "uuid" :"e"},
            {"type": "right", "uuid" :"e"},
            {"type": "parent", "uuid" :"b"},
            {"type": "parent", "uuid" :"a"},
            {"type": "right", "uuid" :"f"},
            {"type": "visit", "uuid" :"f"},
            {"type": "left", "uuid" :"f"},
            {"type": "right", "uuid" :"g"},
            {"type": "visit", "uuid" :"g"}
        ]
        expected = [[1,9,3,1,6,2,3], expectedPath];

        result = input.preOrderTraversal();
        expect(result).toEqual(expected);
    })
})

describe ("Test postOrderTraversal method", () => {
    it ("Should throw an error when missing root", () => {
        let input = new BinaryTree();

        expect(() => input.postOrderTraversal()).toThrow("Please insert a node into the tree.");
    })

    it ("Should give proper postOrderTraversal", () => {
        let root = new TreeNode(1, "a");
        // root.right
        root.setRight(new TreeNode(2, "b"));
        // root.right.left
        root.children[1].setLeft(new TreeNode(3, "c"));
        
        let input = new BinaryTree(root);

        let expectedPath = [
            {"type": "left", "uuid": "a"},
            {"type": "right", "uuid": "b"},
            {"type": "left", "uuid": "c"},
            {"type": "left", "uuid": "c"},
            {"type": "right", "uuid": "c"},
            {"type": "visit", "uuid": "c"},
            {"type": "parent", "uuid": "b"},
            {"type": "right", "uuid": "b"},
            {"type": "visit", "uuid": "b"},
            {"type": "parent", "uuid": "a"},
            {"type": "visit", "uuid": "a"}
        ]
        let expected = [[3,2,1], expectedPath]

        let result = input.postOrderTraversal();
        expect(result).toEqual(expected);

        root = new TreeNode(1, "a");
        // root.left, [1,9,2,3,6,null,3,1] lc representation
        root.setLeft(new TreeNode(9, "b"));
        // root.left.left
        root.children[0].setLeft(new TreeNode(3, "c"));
        // root.left.left.left
        root.children[0].children[0].setLeft(new TreeNode(1, "d"));
        // root.left.right
        root.children[0].setRight(new TreeNode(6, "e"));
        // root.right
        root.setRight(new TreeNode(2, "f"));
        // root.right.right
        root.children[1].setRight(new TreeNode(3, "g"));

        input = new BinaryTree(root);

        expectedPath = [
            {"type": "left", "uuid": "b"},
            {"type": "left", "uuid": "c"},
            {"type": "left", "uuid": "d"},
            {"type": "left", "uuid": "d"},
            {"type": "right", "uuid": "d"},
            {"type": "visit", "uuid": "d"},
            {"type": "parent", "uuid": "c"},
            {"type": "right", "uuid": "c"},
            {"type": "visit", "uuid": "c"},
            {"type": "right", "uuid": "e"},
            {"type": "left", "uuid": "e"},
            {"type": "right", "uuid": "e"},
            {"type": "visit", "uuid": "e"},
            {"type": "parent", "uuid": "b"},
            {"type": "visit", "uuid": "b"},
            {"type": "right", "uuid": "f"},
            {"type": "left", "uuid": "f"},
            {"type": "right", "uuid": "g"},
            {"type": "left", "uuid": "g"},
            {"type": "right", "uuid": "g"},
            {"type": "visit", "uuid": "g"},
            {"type": "parent", "uuid": "f"},
            {"type": "visit", "uuid": "f"},
            {"type": "parent", "uuid": "a"},
            {"type": "visit", "uuid": "a"}
        ]
        expected = [[1,3,6,9,3,2,1], expectedPath];

        result = input.postOrderTraversal();
        expect(result).toEqual(expected);
    })
})

describe ("Test levelOrderTraversal method", () => {
    it ("Should throw an error when missing root", () => {
        let input = new BinaryTree();

        expect(() => input.levelOrderTraversal()).toThrow("Please insert a node into the tree.");
    })

    it ("Should give proper levelOrderTraversal", () => {
        let root = new TreeNode(1, "a");
        // root.right
        root.setRight(new TreeNode(2, "b"));
        // root.right.left
        root.children[1].setLeft(new TreeNode(3, "c"));
        
        let input = new BinaryTree(root);

        let expected = [[1,2,3], ["a","b","c"]]

        let result = input.levelOrderTraversal();
        expect(result).toEqual(expected);

        root = new TreeNode(1, "a");
        // root.left, [1,9,2,3,6,null,3,1] lc representation
        root.setLeft(new TreeNode(9, "b"));
        // root.left.left
        root.children[0].setLeft(new TreeNode(3, "c"));
        // root.left.left.left
        root.children[0].children[0].setLeft(new TreeNode(1, "d"));
        // root.left.right
        root.children[0].setRight(new TreeNode(6, "e"));
        // root.right
        root.setRight(new TreeNode(2, "f"));
        // root.right.right
        root.children[1].setRight(new TreeNode(3, "g"));

        input = new BinaryTree(root);

        expected = [[1,9,2,3,6,3,1], ["a","b","f","c","e","g","d"]];

        result = input.levelOrderTraversal();
        expect(result).toEqual(expected);
    })
})

describe("Test deleteSubtree method", () => {
    it ("Should throw an error when missing root", () => {
        let input = new BinaryTree();

        expect(() => input.deleteSubtree()).toThrow("Please insert a node into the tree.");
    })

    it ("Should return empty tree when deleting root", () => {
        let root = new TreeNode(15, "a");

        let input = new BinaryTree(root);

        input.deleteSubtree("a");

        expect(input.root).toBeNull();

        root = new TreeNode(1, "123");
        root.setLeft(new TreeNode(2));
        root.children[0].setLeft(new TreeNode(4));
        root.children[0].setRight(new TreeNode(7));
        root.setRight(new TreeNode(3));
        root.children[1].setLeft(new TreeNode(6));
        root.children[1].setRight(new TreeNode(10));

        input = new BinaryTree(root);

        input.deleteSubtree("123");
        expect(input.root).toBeNull();
    })

    it ("Should remove proper subtree when given input", () => {
        let root = new TreeNode(1, "111");
        root.setLeft(new TreeNode(2, "112"));
        root.children[0].setLeft(new TreeNode(4, "113"));
        root.children[0].setRight(new TreeNode(7, "114"));
        root.setRight(new TreeNode(3, "115"));
        root.children[1].setLeft(new TreeNode(6, "116"));
        root.children[1].setRight(new TreeNode(10, "117"));

        let input = new BinaryTree(root);

        let expected = new TreeNode(1, "111");
        expected.setRight(new TreeNode(3, "115"));
        expected.children[1].setLeft(new TreeNode(6, "116"));
        expected.children[1].setRight(new TreeNode(10, "117"));

        input.deleteSubtree("112");
        expect(input.root).toMatchObject(expected);

        root = new TreeNode(1, "111");
        root.setLeft(new TreeNode(2, "112"));
        root.children[0].setLeft(new TreeNode(4, "113"));
        root.children[0].setRight(new TreeNode(7, "114"));
        root.setRight(new TreeNode(3, "115"));
        root.children[1].setLeft(new TreeNode(6, "116"));
        root.children[1].setRight(new TreeNode(10, "117"));

        input = new BinaryTree(root);

        expected = new TreeNode(1, "111");
        expected.setLeft(new TreeNode(2, "112"));
        expected.children[0].setLeft(new TreeNode(4, "113"));
        expected.children[0].setRight(new TreeNode(7, "114"));
        expected.setRight(new TreeNode(3, "115"));
        expected.children[1].setLeft(new TreeNode(6, "116"));

        input.deleteSubtree("117");
        expect(input.root).toMatchObject(expected);

        root = new TreeNode(1, "111");
        root.setRight(new TreeNode(3, "115"));
        root.children[1].setLeft(new TreeNode(6, "116"));
        root.children[1].setRight(new TreeNode(10, "117"));
        root.children[1].children[1].setRight(new TreeNode(10, "118"));

        input = new BinaryTree(root);

        expected = new TreeNode(1, "111");
        expected.setRight(new TreeNode(3, "115"));
        expected.children[1].setLeft(new TreeNode(6, "116"));

        input.deleteSubtree("117");
        expect(input.root).toMatchObject(expected);

        root = new TreeNode(1, "111");
        root.setRight(new TreeNode(3, "115"));

        input = new BinaryTree(root);

        expected = new TreeNode(1, "111");

        input.deleteSubtree("115");
        expect(input.root).toMatchObject(expected);
    })
})

describe ("Test addNode method", () => {
    it ("Should throw an error when missing root", () => {
        let input = new BinaryTree();

        expect(() => input.addNode()).toThrow("Please insert a node into the tree.");
    })

    it ("Should throw error when child already exists", () => {
        let root = new TreeNode(1, "111");
        root.setLeft(new TreeNode(4, "100"));

        let input = new BinaryTree(root);

        expect(() => input.addNode(7, true, "111")).toThrow("A left child for this node already exists.");

        root = new TreeNode(1, "111");
        root.setRight(new TreeNode(4, "100"));
        
        input = new BinaryTree(root);
        
        expect(() => input.addNode(7, false, "111")).toThrow("A right child for this node already exists.");
    })

    it ("Should add new node to tree structure", () => {
        let root = new TreeNode(1, "111");

        let input = new BinaryTree(root);

        let expected = new TreeNode(1, "111");
        expected.setLeft(new TreeNode(-1, "26"));
        
        input.addNode(-1, true, "111", "26");
        expect(input.root).toMatchObject(expected);

        root = new TreeNode(1, "111");
        root.setLeft(new TreeNode(2, "112"));
        root.children[0].setLeft(new TreeNode(4, "113"));
        root.children[0].setRight(new TreeNode(7, "114"));
        root.setRight(new TreeNode(3, "115"));
        root.children[1].setLeft(new TreeNode(6, "116"));
        root.children[1].setRight(new TreeNode(10, "117"));

        input = new BinaryTree(root);

        expected = new TreeNode(1, "111");
        expected.setLeft(new TreeNode(2, "112"));
        expected.children[0].setLeft(new TreeNode(4, "113"));
        expected.children[0].children[0].setRight(new TreeNode(0, "100"));
        expected.children[0].setRight(new TreeNode(7, "114"));
        expected.setRight(new TreeNode(3, "115"));
        expected.children[1].setLeft(new TreeNode(6, "116"));
        expected.children[1].setRight(new TreeNode(10, "117"));

        input.addNode(0, false, "113", "100");
        expect(input.root).toMatchObject(expected);

        root = new TreeNode(1, "111");
        root.setLeft(new TreeNode(-1, "26"));

        input = new BinaryTree(root);

        expected = new TreeNode(1, "111");
        expected.setLeft(new TreeNode(-1, "26"));
        expected.setRight(new TreeNode(5, "abc"));

        input.addNode(5, false, "111", "abc");
        expect(input.root).toMatchObject(expected);

        root = new TreeNode(1, "111");
        root.setRight(new TreeNode(-1, "26"));

        input = new BinaryTree(root);

        expected = new TreeNode(1, "111");
        expected.setLeft(new TreeNode(5, "abc"));
        expected.setRight(new TreeNode(-1, "26"));

        input.addNode(5, true, "111", "abc");
        expect(input.root).toMatchObject(expected);
    })
})

describe ("Test replaceNodeValue method", () => {
    it ("Should throw an error when missing root", () => {
        let input = new BinaryTree();

        expect(() => input.replaceNodeValue(5, "123")).toThrow("Please insert a node into the tree.");
    })

    it ("Should update node value of corresponding node", () => {
        let root = new TreeNode(1, "123");

        let input = new BinaryTree(root);

        let expected = new TreeNode(5, "123");

        input.replaceNodeValue(5, "123");
        expect(input.root).toMatchObject(expected);

        root = new TreeNode(5, "123");
        root.setRight(new TreeNode(4, "111"));
        root.children[1].setLeft(new TreeNode(6, "964"));
        root.children[1].setRight(new TreeNode(7, "432"));

        input = new BinaryTree(root);

        expected = new TreeNode(5, "123");
        expected.setRight(new TreeNode(-1, "111"));
        expected.children[1].setLeft(new TreeNode(6, "964"));
        expected.children[1].setRight(new TreeNode(7, "432"));

        input.replaceNodeValue(-1, "111");
        expect(input.root).toMatchObject(expected);

        root = new TreeNode(-1, "123");
        root.setLeft(new TreeNode(-2, "111"));
        root.children[0].setLeft(new TreeNode(2, "964"));
        root.setRight(new TreeNode(0, "432"));
        root.children[1].setRight(new TreeNode(-3, "231"));
        root.children[1].children[1].setRight(new TreeNode(-3, "777"));

        input = new BinaryTree(root);

        expected = new TreeNode(-1, "123");
        expected.setLeft(new TreeNode(-2, "111"));
        expected.children[0].setLeft(new TreeNode(2, "964"));
        expected.setRight(new TreeNode(0, "432"));
        expected.children[1].setRight(new TreeNode(-3, "231"));
        expected.children[1].children[1].setRight(new TreeNode(-2, "777"));

        input.replaceNodeValue(-2, "777");
        expect(input.root).toMatchObject(expected);

        root = new TreeNode(-1, "123");
        root.setLeft(new TreeNode(-2, "111"));
        root.children[0].setLeft(new TreeNode(2, "964"));
        root.setRight(new TreeNode(0, "432"));
        root.children[1].setRight(new TreeNode(-3, "231"));
        root.children[1].children[1].setRight(new TreeNode(-3, "777"));

        input = new BinaryTree(root);

        expected = new TreeNode(-1, "123");
        expected.setLeft(new TreeNode(-2, "111"));
        expected.children[0].setLeft(new TreeNode(0, "964"));
        expected.setRight(new TreeNode(0, "432"));
        expected.children[1].setRight(new TreeNode(-3, "231"));
        expected.children[1].children[1].setRight(new TreeNode(-3, "777"));

        input.replaceNodeValue(0, "964");
        expect(input.root).toMatchObject(expected);
    })
})
