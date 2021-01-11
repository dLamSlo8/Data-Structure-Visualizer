import TreeNode, { NullTreeNode } from "../../classes/tree-node.js";


describe ("Test constructor", () => {
    it ("Should copy all elements", () => {
        // copy just root
        let root = new TreeNode(5, "a");

        let expected = new TreeNode(5, "a");

        let result = new TreeNode(null, null, root);

        expect(result).toMatchObject(expected);

        // copy when one left child
        root = new TreeNode(5, "a");
        root.setLeft(new TreeNode(3, "b"));

        expected = new TreeNode(5, "a");
        expected.setLeft(new TreeNode(3, "b"));

        result = new TreeNode(null, null, root);

        expect(result).toMatchObject(expected);

        // copy when one right child
        root = new TreeNode(5, "a");
        root.setRight(new TreeNode(7, "b"));

        expected = new TreeNode(5, "a");
        expected.setRight(new TreeNode(7, "b"));

        result = new TreeNode(null, null, root);

        expect(result).toMatchObject(expected);

        // copy when two child
        root = new TreeNode(5, "a");
        root.setLeft(new TreeNode(3, "b"));
        root.setRight(new TreeNode(7, "c"));

        expected = new TreeNode(5, "a");
        expected.setLeft(new TreeNode(3, "b"));
        expected.setRight(new TreeNode(7, "c"));

        result = new TreeNode(null, null, root);

        expect(result).toMatchObject(expected);

        root = new TreeNode(5, "a");
        root.setLeft(new TreeNode(3, "b"));
        root.children[0].setLeft(new TreeNode(8, "d"));
        root.setRight(new TreeNode(7, "c"));
        root.children[1].setRight(new TreeNode(9, "e"));
        root.children[1].children[1].setRight(new TreeNode(10, "f"));

        expected = new TreeNode(5, "a");
        expected.setLeft(new TreeNode(3, "b"));
        expected.children[0].setLeft(new TreeNode(8, "d"));
        expected.setRight(new TreeNode(7, "c"));
        expected.children[1].setRight(new TreeNode(9, "e"));
        expected.children[1].children[1].setRight(new TreeNode(10, "f"));

        result = new TreeNode(null, null, root);

        expect(result).toMatchObject(expected);
    })
})

describe ("Test generateGridPosition method", () => {
    it ("Should set proper x field on nodes", () => {
        let root = new TreeNode(1, "a");
        root.setLeft(new TreeNode(2, "b"));
        root.setRight(new TreeNode(3, "c"));
        root.children[1].setLeft(new TreeNode(4, "d"));
        root.children[1].children[0].setLeft(new TreeNode(5, "e"));
        root.children[1].children[0].setRight(new TreeNode(6, "f"));
    
        let expected = new TreeNode(1, "a");
        expected.setLeft(new TreeNode(2, "b"));
        expected.setRight(new TreeNode(3, "c"));
        expected.children[1].setLeft(new TreeNode(4, "d"));
        expected.children[1].children[0].setLeft(new TreeNode(5, "e"));
        expected.children[1].children[0].setRight(new TreeNode(6, "f"));
        
        expected.x = 2;
        expected.children[0].x = 1;
        expected.children[1].x = 6;
        expected.children[1].children[0].x = 4;
        expected.children[1].children[0].children[0].x = 3;
        expected.children[1].children[0].children[1].x = 5;
        
        root.generateGridPosition();
        expect(root).toMatchObject(expected);

        // testing with a tree that is slightly skewed
        root = new TreeNode(1, "a");
        root.setLeft(new TreeNode(2, "b"));
        root.setRight(new TreeNode(3, "c"));
        root.children[0].setRight(new TreeNode(3, "d"))
        root.children[1].setLeft(new TreeNode(4, "e"));
        root.children[1].children[0].setLeft(new TreeNode(5, "f"));
        root.children[1].children[0].children[0].setLeft(new TreeNode(5, "g"));
        root.children[1].children[0].children[0].children[0].setRight(new TreeNode(5, "h"));
        root.children[1].children[0].children[0].children[0].setLeft(new TreeNode(5, "i"));

        expected = new TreeNode(1, "a");
        expected.setLeft(new TreeNode(2, "b"));
        expected.setRight(new TreeNode(3, "c"));
        expected.children[0].setRight(new TreeNode(3, "d"))
        expected.children[1].setLeft(new TreeNode(4, "e"));
        expected.children[1].children[0].setLeft(new TreeNode(5, "f"));
        expected.children[1].children[0].children[0].setLeft(new TreeNode(5, "g"));
        expected.children[1].children[0].children[0].children[0].setRight(new TreeNode(5, "h"));
        expected.children[1].children[0].children[0].children[0].setLeft(new TreeNode(5, "i"));

        expected.x = 3;
        expected.children[0].x = 1;
        expected.children[0].children[1].x = 2;
        expected.children[1].x = 9;
        expected.children[1].children[0].x = 8;
        expected.children[1].children[0].children[0].x = 7;
        expected.children[1].children[0].children[0].children[0].x = 5;
        expected.children[1].children[0].children[0].children[0].children[1].x = 6;
        expected.children[1].children[0].children[0].children[0].children[0].x = 4;

        root.generateGridPosition();
        expect(root).toMatchObject(expected);
        
        // one-sided tree with all right nodes
        root = new TreeNode(1, "a");
        root.setRight(new TreeNode(3, "b"));
        root.children[1].setRight(new TreeNode(6, "c"));
        root.children[1].children[1].setRight(new TreeNode(6, "d"));
        root.children[1].children[1].children[1].setRight(new TreeNode(6, "e"));

        expected = new TreeNode(1, "a");
        expected.setRight(new TreeNode(3, "b"));
        expected.children[1].setRight(new TreeNode(6, "c"));
        expected.children[1].children[1].setRight(new TreeNode(6, "d"));
        expected.children[1].children[1].children[1].setRight(new TreeNode(6, "e"));


        expected.x = 1;
        expected.children[1].x = 2;
        expected.children[1].children[1].x = 3;
        expected.children[1].children[1].children[1].x = 4;
        expected.children[1].children[1].children[1].children[1].x = 5;

        root.generateGridPosition();
        expect(root).toMatchObject(expected);

        // test complete tree
        root = new TreeNode(1, "a");
        root.setLeft(new TreeNode(2, "b"));
        root.children[0].setLeft(new TreeNode(3, "c"));
        root.children[0].setRight(new TreeNode(4, "d"));
        root.setRight(new TreeNode(5, "e"));
        root.children[1].setLeft(new TreeNode(6, "f"));
        root.children[1].setRight(new TreeNode(7, "g"));
        
        expected = new TreeNode(1, "a");
        expected.setLeft(new TreeNode(2, "b"));
        expected.children[0].setLeft(new TreeNode(3, "c"));
        expected.children[0].setRight(new TreeNode(4, "d"));
        expected.setRight(new TreeNode(5, "e"));
        expected.children[1].setLeft(new TreeNode(6, "f"));
        expected.children[1].setRight(new TreeNode(7, "g"));

        expected.x = 4;
        expected.children[0].x = 2;
        expected.children[0].children[0].x = 1;
        expected.children[0].children[1].x = 3;
        expected.children[1].x = 6;
        expected.children[1].children[0].x = 5;
        expected.children[1].children[1].x = 7;        

        root.generateGridPosition();
        expect(root).toMatchObject(expected);
    })
})