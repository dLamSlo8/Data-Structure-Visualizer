import TreeNode, { NullTreeNode } from "../../classes/tree-node.js";


describe ("Test constructor", () => {
    it ("Should copy all elements", () => {
        // copy when one left child
        let root = new TreeNode(5, "a");
        root.setLeft(new TreeNode(3, "b"));

        let expected = new TreeNode(5, "a");
        expected.setLeft(new TreeNode(3, "b"));

        let result = new TreeNode(null, null, root);

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