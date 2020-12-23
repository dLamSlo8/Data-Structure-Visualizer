import TreeNode, { NullTreeNode } from "../../classes/tree-node.js";
import { BinarySearchTree } from "../../classes/binary-search-tree.js";

describe ("Test insertNode method", () => {
    it ("Should throw an error when missing root", () => {
        let input = new BinarySearchTree();

        expect(() => input.insertNode()).toThrow("Please create a tree!");
    })
    
    it ("Should give proper moves array and tree", () =>{
        let root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(5, "2"));
        root.setRight(new TreeNode(7, "3"));

        let input = new BinarySearchTree(root);

        let expectedMoves = ["1", "2", "4"];

        let expected = new TreeNode(5, "1");
        expected.setLeft(new TreeNode(5, "2"));
        expected.children[0].setLeft(new TreeNode(5, "4"));
        expected.setRight(new TreeNode(7, "3"));

        let result = input.insertNode(5, "4");

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);


        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(3, "2"));
        root.setRight(new TreeNode(7, "3"));

        input = new BinarySearchTree(root);

        expectedMoves = ["1", "2", "4"];

        expected = new TreeNode(5, "1");
        expected.setLeft(new TreeNode(3, "2"));
        expected.children[0].setRight(new TreeNode(4, "4"));
        expected.setRight(new TreeNode(7, "3"));

        result = input.insertNode(4, "4");

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);


        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(3, "2"));
        root.setRight(new TreeNode(7, "3"));

        input = new BinarySearchTree(root);

        expectedMoves = ["1", "3", "4"];

        expected = new TreeNode(5, "1");
        expected.setLeft(new TreeNode(3, "2"));
        expected.setRight(new TreeNode(7, "3"));
        expected.children[1].setLeft(new TreeNode(6, "4"));

        result = input.insertNode(6, "4");

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);
    })
})

describe ("Test deleteNode method", () => {
    it ("Should throw an error when value not found", () => {
        let input = new BinarySearchTree();

        expect(() => input.deleteNode(5)).toThrow("A node with this value does not exist in the tree");

        let root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(5, "2"));
        root.setRight(new TreeNode(7, "3"));

        input = new BinarySearchTree(root);

        expect(() => input.deleteNode(2)).toThrow("A node with this value does not exist in the tree");
        expect(() => input.deleteNode(10)).toThrow("A node with this value does not exist in the tree");
        expect(() => input.deleteNode()).toThrow("A node with this value does not exist in the tree");
    })

    it ("Should give proper moves array and tree", () => {
        // test delete to return empty root for single element
        let root = new TreeNode(5, "1");

        let input = new BinarySearchTree(root);

        let expectedMoves = ["1"];

        let result = input.deleteNode(5);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toBeNull();

        // testing delete on left side with deleted element having no children
        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(4, "2"));
        root.setRight(new TreeNode(7, "3"));

        input = new BinarySearchTree(root);

        expectedMoves = ["1", "2"];

        let expected = new TreeNode(5, "1");
        expected.setRight(new TreeNode(7, "3"));

        result = input.deleteNode(4);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);

        // testing delete on right side with deleted element having no children
        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(4, "2"));
        root.setRight(new TreeNode(7, "3"));
        root.children[1].setLeft(new TreeNode(6,"4"));
        root.children[1].setRight(new TreeNode(10,"5"));

        input = new BinarySearchTree(root);

        expectedMoves = ["1", "3", "4"];

        expected = new TreeNode(5, "1");
        expected.setLeft(new TreeNode(4, "2"));
        expected.setRight(new TreeNode(7, "3"));
        expected.children[1].setRight(new TreeNode(10,"5"));

        result = input.deleteNode(6);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);


        root = new TreeNode(5, "1");
        root.setRight(new TreeNode(7, "3"));

        input = new BinarySearchTree(root);

        expectedMoves = ["1"];

        expected = new TreeNode(7, "3");

        result = input.deleteNode(5);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);


        // testing delete on left side with deleted element having one child
        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(4, "2"));
        root.children[0].setLeft(new TreeNode(1, "4"));
        root.setRight(new TreeNode(7, "3"));

        input = new BinarySearchTree(root);

        expectedMoves = ["1", "2"];

        expected = new TreeNode(5, "1");
        expected.setLeft(new TreeNode(1, "4"))
        expected.setRight(new TreeNode(7, "3"));

        result = input.deleteNode(4);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);


        // testing delete on right side with deleted element having one child
        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(4, "2"));
        root.setRight(new TreeNode(7, "3"));
        root.children[1].setLeft(new TreeNode(6,"4"));
        root.children[1].setRight(new TreeNode(10,"5"));

        input = new BinarySearchTree(root);

        expectedMoves = ["1", "3", "5"];

        expected = new TreeNode(5, "1");
        expected.setLeft(new TreeNode(4, "2"))
        expected.setRight(new TreeNode(7, "3"));
        expected.children[1].setLeft(new TreeNode(6,"4"))

        result = input.deleteNode(10);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);

        // testing delete on left side with deleted element having two children
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(2, "2"));
        root.setRight(new TreeNode(20, "3"));
        root.children[0].setLeft(new TreeNode(1,"7"));
        root.children[0].setRight(new TreeNode(4,"4"));
        root.children[0].children[1].setLeft(new TreeNode(3,"5"));
        root.children[0].children[1].setRight(new TreeNode(5,"6"));

        input = new BinarySearchTree(root);

        expectedMoves = ["1", "2"];
        let expectedNode = {"id": "5"}

        expected = new TreeNode(6, "1");
        expected.setLeft(new TreeNode(3, "5"))
        expected.setRight(new TreeNode(20, "3"));
        expected.children[0].setLeft(new TreeNode(1,"7"))
        expected.children[0].setRight(new TreeNode(4,"4"))
        expected.children[0].children[1].setRight(new TreeNode(5,"6"))

        result = input.deleteNode(2);

        expect(result.slice(0, -1)).toEqual(expectedMoves);
        expect(result[result.length - 1]).toMatchObject(expectedNode);
        expect(input.root).toMatchObject(expected);


        // testing delete on right side with deleted element having two children
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(2, "2"));
        root.setRight(new TreeNode(20, "3"));
        root.children[1].setLeft(new TreeNode(15,"7"));
        root.children[1].setRight(new TreeNode(21,"4"));
        root.children[1].children[0].setLeft(new TreeNode(14,"5"));
        root.children[1].children[0].setRight(new TreeNode(17,"6"));

        input = new BinarySearchTree(root);

        expectedMoves = ["1", "3", "7"];
        expectedNode = {"id": "6"}

        expected = new TreeNode(6, "1");
        expected.setLeft(new TreeNode(2, "2"));
        expected.setRight(new TreeNode(20, "3"));
        expected.children[1].setLeft(new TreeNode(17,"6"));
        expected.children[1].setRight(new TreeNode(21,"4"));
        expected.children[1].children[0].setLeft(new TreeNode(14,"5"));

        result = input.deleteNode(15);

        expect(result.slice(0, -1)).toEqual(expectedMoves);
        expect(result[result.length - 1]).toMatchObject(expectedNode);
        expect(input.root).toMatchObject(expected);


        // testing delete root with no children (make sure tree's root is updated)
        root = new TreeNode(6, "1");

        input = new BinarySearchTree(root);

        expectedMoves = ["1"];
        expected = null;

        result = input.deleteNode(6);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toEqual(expected);


        // testing delete root with one child (make sure tree's root is updated)
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(5,"2"))

        input = new BinarySearchTree(root);

        expectedMoves = ["1"];
        expected = new TreeNode(5, "2");

        result = input.deleteNode(6);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toEqual(expected);


        // testing delete root with two children (make sure tree's root is updated)
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(5,"2"))
        root.setRight(new TreeNode(10,"3"))

        input = new BinarySearchTree(root);

        expectedMoves = ["1"];
        expectedNode = {"id":"3"}
        expected = new TreeNode(10, "3");
        expected.setLeft(new TreeNode(5,"2"));


        result = input.deleteNode(6);

        expect(result.slice(0, -1)).toEqual(expectedMoves);
        expect(result[result.length - 1]).toMatchObject(expectedNode);
        expect(input.root).toEqual(expected);


        // if a parent has no right child and you delete left, parent's children should be null
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(5,"2"))

        input = new BinarySearchTree(root);

        expectedMoves = ["1", "2"];
        expected = new TreeNode(6, "1");

        result = input.deleteNode(5);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toEqual(expected);


        // if a parent has no left child and you delete right, parent's children should be null
        root = new TreeNode(6, "1");
        root.setRight(new TreeNode(10,"2"))

        input = new BinarySearchTree(root);

        expectedMoves = ["1", "2"];
        expected = new TreeNode(6, "1");

        result = input.deleteNode(10);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toEqual(expected);


        // testing if removing a successor correctly sets parent's children to null or NullTreeNode
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(2,"2"))
        root.setRight(new TreeNode(20,"3"))
        root.children[1].setLeft(new TreeNode(15, "4"))

        input = new BinarySearchTree(root);

        expectedMoves = ["1"];
        expectedNode={"id":"4"}
        expected = new TreeNode(15, "4");
        expected.setLeft(new TreeNode(2,"2"))
        expected.setRight(new TreeNode(20,"3"))

        result = input.deleteNode(6);

        expect(result.slice(0, -1)).toEqual(expectedMoves);
        expect(result[result.length - 1]).toMatchObject(expectedNode);
        expect(input.root).toEqual(expected);


        // testing if removing a successor that is directly right of node to delete
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(2,"2"))
        root.setRight(new TreeNode(20,"3"))
        root.children[1].setRight(new TreeNode(21, "4"))

        input = new BinarySearchTree(root);

        expectedMoves = ["1"];
        expectedNode={"id":"3"}
        expected = new TreeNode(20, "3");
        expected.setLeft(new TreeNode(2,"2"))
        expected.setRight(new TreeNode(21,"4"))

        result = input.deleteNode(6);

        expect(result.slice(0, -1)).toEqual(expectedMoves);
        expect(result[result.length - 1]).toMatchObject(expectedNode);
        expect(input.root).toEqual(expected);


        // testing removing successor that is a left child and only has right child
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(2,"2"))
        root.setRight(new TreeNode(20,"3"))
        root.children[1].setLeft(new TreeNode(15, "4"))
        root.children[1].children[0].setRight(new TreeNode(17, "5"))

        input = new BinarySearchTree(root);

        expectedMoves = ["1"];
        expectedNode={"id":"4"}
        expected = new TreeNode(15, "4");
        expected.setLeft(new TreeNode(2,"2"))
        expected.setRight(new TreeNode(20,"3"))
        expected.children[1].setLeft(new TreeNode(17, "5"))

        result = input.deleteNode(6);

        expect(result.slice(0, -1)).toEqual(expectedMoves);
        expect(result[result.length - 1]).toMatchObject(expectedNode);
        expect(input.root).toEqual(expected);

        // testing removing successor that is a left child and only has right child
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(2,"2"))
        root.setRight(new TreeNode(20,"3"))
    })
    
})

describe ("Test findNode method", () => {
    it ("Should throw an error when value not found", () => {
        let input = new BinarySearchTree();

        expect(() => input.findNode()).toThrow("A node with this value does not exist in the tree");


        input = new BinarySearchTree();
        let root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(5, "2"));
        root.setRight(new TreeNode(7, "3"));

        expect(() => input.findNode(10)).toThrow("A node with this value does not exist in the tree");
    })

    it ("Should give proper moves array", () => {
        let root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(3, "2"));
        root.children[0].setRight(new TreeNode(4,"4"))
        root.setRight(new TreeNode(7, "3"));

        let input = new BinarySearchTree(root);
        
        let expectedMoves = ["1", "2", "4"];

        let result = input.findNode(4);

        expect(result).toEqual(expectedMoves);


        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(3, "2"));
        root.children[0].setLeft(new TreeNode(1,"4"))
        root.children[0].setRight(new TreeNode(4,"5"))
        root.setRight(new TreeNode(7, "3"));
        root.children[1].setLeft(new TreeNode(6,"6"))
        root.children[1].setRight(new TreeNode(10,"7"))

        input = new BinarySearchTree(root);
        
        expectedMoves = ["1", "3", "6"];
        
        result = input.findNode(6);

        expect(result).toEqual(expectedMoves);

    })
})