import TreeNode, { NullTreeNode } from "../../classes/tree-node.js";
import BinarySearchTree from "../../classes/binary-search-tree.js";

describe ("Test constructor", () => {
    it ("Should set nodeToUuidMap on creation", () => {
        // test no elements in root
        let result = new BinarySearchTree();

        let expectedMap = {};

        expect(result.root).toBeNull();
        expect(result.uuidToNodeMap).toMatchObject(expectedMap);

        let root = new TreeNode(10, "a");
        root.setLeft(new TreeNode(7, "b"));
        root.setRight(new TreeNode(12, "c"));
        root.children[0].setRight(new TreeNode(9, "d"));
        root.children[1].setLeft(new TreeNode(14, "e"));

        let expectedRoot = new TreeNode(10, "a");
        expectedRoot.setLeft(new TreeNode(7, "b"));
        expectedRoot.setRight(new TreeNode(12, "c"));
        expectedRoot.children[0].setRight(new TreeNode(9, "d"));
        expectedRoot.children[1].setLeft(new TreeNode(14, "e"));

        result = new BinarySearchTree(root);

        expectedMap = {
            "a": expectedRoot,
            "b": expectedRoot.children[0],
            "c": expectedRoot.children[1],
            "d": expectedRoot.children[0].children[1],
            "e": expectedRoot.children[1].children[0]
        }

        expect(result.root).toMatchObject(expectedRoot);
        expect(result.uuidToNodeMap).toMatchObject(expectedMap);
    })
})

describe ("Test insertNode method", () => {
    it ("Should give proper moves array and tree", () =>{
        // insert into empty tree
        let input = new BinarySearchTree();

        let expectedMoves = [
            {"type": "visit", "uuid": "4"}
        ];

        let expected = new TreeNode(5, "4");
        let expectedMap = {
            "4": expected
        }

        let result = input.insertNode(5, "4");
        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);

        let root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(5, "2"));
        root.setRight(new TreeNode(7, "3"));

        input = new BinarySearchTree(root);

        expectedMoves = [
            {"type": "visit", "uuid": "1"},
            {"type": "left", "uuid": "2"},
            {"type": "left", "uuid": "4"},
        ];
        

        expected = new TreeNode(5, "1");
        expected.setLeft(new TreeNode(5, "2"));
        expected.children[0].setLeft(new TreeNode(5, "4"));
        expected.setRight(new TreeNode(7, "3"));

        expectedMap = {
            "1" : expected,
            "2" : expected.children[0],
            "4" : expected.children[0].children[0],
            "3" : expected.children[1]
        }

        result = input.insertNode(5, "4");

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(3, "2"));
        root.setRight(new TreeNode(7, "3"));

        input = new BinarySearchTree(root);

        expectedMoves = [
            {"type": "visit", "uuid": "1"},
            {"type": "left", "uuid": "2"},
            {"type": "right", "uuid": "4"},
        ];

        expected = new TreeNode(5, "1");
        expected.setLeft(new TreeNode(3, "2"));
        expected.children[0].setRight(new TreeNode(4, "4"));
        expected.setRight(new TreeNode(7, "3"));
        expectedMap = {
            "1" : expected,
            "2" : expected.children[0],
            "4" : expected.children[0].children[1],
            "3" : expected.children[1]
        }

        result = input.insertNode(4, "4");

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(3, "2"));
        root.setRight(new TreeNode(7, "3"));

        input = new BinarySearchTree(root);

        expectedMoves = [
            {"type": "visit", "uuid": "1"},
            {"type": "right", "uuid": "3"},
            {"type": "left", "uuid": "4"},
        ];

        expected = new TreeNode(5, "1");
        expected.setLeft(new TreeNode(3, "2"));
        expected.setRight(new TreeNode(7, "3"));
        expected.children[1].setLeft(new TreeNode(6, "4"));

        expectedMap = {
            "1": expected,
            "2": expected.children[0],
            "3": expected.children[1],
            "4": expected.children[1].children[0]
        }

        result = input.insertNode(6, "4");

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        // testing multiple inserts
        root = new TreeNode(5, "1");
        
        input = new BinarySearchTree(root);

        expected = new TreeNode(5, "1");
        expected.setLeft(new TreeNode(3, "2"));
        expectedMoves = [
            {"type": "visit", "uuid": "1"},
            {"type": "left", "uuid": "2"},

        ];
        
        expectedMap = {
            "1": expected,
            "2": expected.children[0],
        }

        result = input.insertNode(3, "2");

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);

        expected = new TreeNode(5, "1");
        expected.setLeft(new TreeNode(3, "2"));
        expected.setRight(new TreeNode(7, "3"))
        
        expectedMoves = [
            {"type": "visit", "uuid": "1"},
            {"type": "right", "uuid": "3"},
        ];
        
        expectedMap = {
            "1": expected,
            "2": expected.children[0],
            "3": expected.children[1]
        }

        result = input.insertNode(7, "3");

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);
    })
})

describe ("Test deleteNode method", () => {
    it ("Should add error object to moves array when missing root", () => {
        let input = new BinarySearchTree();
        let result = input.deleteNode(5);
        
        let expectedMoves = {"moves": [[{"error": "A node with this value does not exist in the tree"}],[]]};
        expect(result).toMatchObject(expectedMoves)
    })

    it ("Should add error object to moves array when node doesn't exist", () => {
        let root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(3, "2"));
        root.setRight(new TreeNode(7, "3"));
        
        let input = new BinarySearchTree(root);

        let expectedMoves = {
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                    {"type": "left", "uuid": "2"},
                    {"error": "A node with this value does not exist in the tree"}
                ],
                []
            ]
        };

        let expected = new TreeNode(5, "1");
        expected.setLeft(new TreeNode(3, "2"));
        expected.setRight(new TreeNode(7, "3"));
        
        let expectedMap = {
            "1" : expected,
            "2" : expected.children[0],
            "3" : expected.children[1]
        }


        let result = input.deleteNode(2);
        expect(result).toMatchObject(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);
        
        
        result = input.deleteNode(10);
        expectedMoves = {
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                    {"type": "right", "uuid": "3"},
                    {"error": "A node with this value does not exist in the tree"}
                ],
                []
            ]
        };
        expect(result).toMatchObject(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        result = input.deleteNode();
        expectedMoves = {
            "moves": [
                [
                    {"error": "A node with this value does not exist in the tree"}
                ],
                []
            ]
        };
        expect(result).toMatchObject(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        // testing deleting node that doesn't exist and last node to look at has children
        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(3, "2"));
        root.children[0].setRight(new TreeNode(4, "4"));
        root.setRight(new TreeNode(7, "3"));
        root.children[1].setLeft(new TreeNode(6, "6"));
        
        input = new BinarySearchTree(root);

        result = input.deleteNode(2);

        expected = new TreeNode(5, "1");
        expected.setLeft(new TreeNode(3, "2"));
        expected.children[0].setRight(new TreeNode(4, "4"));
        expected.setRight(new TreeNode(7, "3"));
        expected.children[1].setLeft(new TreeNode(6, "6"));
        
        expectedMap = {
            "1": expected,
            "2": expected.children[0],
            "3": expected.children[1],
            "4": expected.children[0].children[1],
            "5": expected.children[1].children[0]
        }

        expectedMoves = {
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                    {"type": "left", "uuid": "2"},
                    {"error": "A node with this value does not exist in the tree"}
                ],
                []
            ]
        };

        expect(result).toMatchObject(expectedMoves);


        result = input.deleteNode(8);
        expectedMoves = {
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                    {"type": "right", "uuid": "3"},
                    {"error": "A node with this value does not exist in the tree"}
                ],
                []
            ]
        };
        expect(result).toMatchObject(expectedMoves);
        
        // testing deleting a value that is less than root when root is the only node 
        root = new TreeNode(5, "1");
        input = new BinarySearchTree(root);

        result = input.deleteNode(1);
        expected = new TreeNode(5, "1");
        expectedMap = {
            "1": expected,
        }
        expectedMoves = {
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                    {"error": "A node with this value does not exist in the tree"}
                ],
                []
            ]
        };
        expect(result).toMatchObject(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);
        


        // testing deleting a value that is greater than root when root is the only node 
        root = new TreeNode(5, "1");
        input = new BinarySearchTree(root);
        
        result = input.deleteNode(10);

        expectedMoves = {
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                    {"error": "A node with this value does not exist in the tree"}
                ],
                []
            ]
        };

        expect(result).toMatchObject(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);
    })

    it ("Should give proper moves array and tree", () => {
        // test delete to return empty root for single element
        let root = new TreeNode(5, "1");

        let input = new BinarySearchTree(root);

        let expectedMoves = {
            "type": 0, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"}
                ],
                []
            ]
        };

        let expectedMap = {};

        let result = input.deleteNode(5);

        
        expect(result).toEqual(expectedMoves);
        expect(input.root).toBeNull();
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);

        // testing delete on left side with deleted element having no children
        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(4, "2"));
        root.setRight(new TreeNode(7, "3"));

        input = new BinarySearchTree(root);

        expectedMoves = {
            "type": 0, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                    {"type": "left", "uuid": "2"},
                ], 
                []
            ]
        };

        let expected = new TreeNode(5, "1");
        expected.setRight(new TreeNode(7, "3"));

        expectedMap = {
            "1": expected,
            "3": expected.children[1]
        };

        result = input.deleteNode(4);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);

        // testing delete on right side with deleted element having no children
        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(4, "2"));
        root.setRight(new TreeNode(7, "3"));
        root.children[1].setLeft(new TreeNode(6,"4"));
        root.children[1].setRight(new TreeNode(10,"5"));

        input = new BinarySearchTree(root);

        expectedMoves = {
            "type": 0, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                    {"type": "right", "uuid": "3"},
                    {"type": "left", "uuid": "4"},
                ], 
                []
            ]
        };

        expected = new TreeNode(5, "1");
        expected.setLeft(new TreeNode(4, "2"));
        expected.setRight(new TreeNode(7, "3"));
        expected.children[1].setRight(new TreeNode(10,"5"));

        expectedMap = {
            "1": expected,
            "2": expected.children[0],
            "3": expected.children[1],
            "5": expected.children[1].children[1]
        }

        result = input.deleteNode(6);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        root = new TreeNode(5, "1");
        root.setRight(new TreeNode(7, "3"));

        input = new BinarySearchTree(root);

        expectedMoves = {
            "type": 1, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                ], 
                [
                    {"uuid":"3"}
                ]
            ]
        };

        expected = new TreeNode(7, "3");

        expectedMap = {
            "3": expected
        }

        result = input.deleteNode(5);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        // testing delete on left side with deleted element having one child
        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(4, "2"));
        root.children[0].setLeft(new TreeNode(1, "4"));
        root.setRight(new TreeNode(7, "3"));

        input = new BinarySearchTree(root);

        expectedMoves = {
            "type": 1, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                    {"type": "left", "uuid": "2"},
                ],
                [
                    {"uuid":"4"}
                ]
            ]
        };

        expected = new TreeNode(5, "1");
        expected.setLeft(new TreeNode(1, "4"))
        expected.setRight(new TreeNode(7, "3"));

        expectedMap = {
            "1": expected,
            "4": expected.children[0],
            "3": expected.children[1]
        }

        result = input.deleteNode(4);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        // testing delete on right side with deleted element having one child
        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(4, "2"));
        root.setRight(new TreeNode(7, "3"));
        root.children[1].setLeft(new TreeNode(6,"4"));
        root.children[1].setRight(new TreeNode(10,"5"));

        input = new BinarySearchTree(root);

        expectedMoves = {
            "type": 0, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                    {"type": "right", "uuid": "3"},
                    {"type": "right", "uuid": "5"},
                ],
                []
            ]
        };

        expected = new TreeNode(5, "1");
        expected.setLeft(new TreeNode(4, "2"))
        expected.setRight(new TreeNode(7, "3"));
        expected.children[1].setLeft(new TreeNode(6,"4"));

        expectedMap = {
            "1": expected,
            "2": expected.children[0],
            "3": expected.children[1],
            "4": expected.children[1].children[0]
        }

        result = input.deleteNode(10);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);

        // testing delete on left side with deleted element having two children
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(2, "2"));
        root.setRight(new TreeNode(20, "3"));
        root.children[0].setLeft(new TreeNode(1,"7"));
        root.children[0].setRight(new TreeNode(4,"4"));
        root.children[0].children[1].setLeft(new TreeNode(3,"5"));
        root.children[0].children[1].setRight(new TreeNode(5,"6"));

        input = new BinarySearchTree(root);

        expectedMoves = {
            "type": 2, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                    {"type": "left", "uuid": "2"},
                ],
                [
                    {"uuid": "4"},
                    {"uuid": "5"}
                ]
            ]
        };

        expected = new TreeNode(6, "1");
        expected.setLeft(new TreeNode(3, "5"))
        expected.setRight(new TreeNode(20, "3"));
        expected.children[0].setLeft(new TreeNode(1,"7"));
        expected.children[0].setRight(new TreeNode(4,"4"));
        expected.children[0].children[1].setRight(new TreeNode(5,"6"));

        expectedMap = {
            "1": expected,
            "5": expected.children[0],
            "3": expected.children[1],
            "7": expected.children[0].children[0],
            "4": expected.children[0].children[1],
            "6": expected.children[0].children[1].children[1],
        }

        result = input.deleteNode(2);


        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);
        


        // testing delete on right side with deleted element having two children
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(2, "2"));
        root.setRight(new TreeNode(20, "3"));
        root.children[1].setLeft(new TreeNode(15,"7"));
        root.children[1].setRight(new TreeNode(21,"4"));
        root.children[1].children[0].setLeft(new TreeNode(14,"5"));
        root.children[1].children[0].setRight(new TreeNode(17,"6"));

        input = new BinarySearchTree(root);

        expectedMoves = {
            "type": 2, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                    {"type": "right", "uuid": "3"},
                    {"type": "left", "uuid": "7"},
                ],
                [
                    {"uuid": "6"}
                ]
            ]
        };

        expected = new TreeNode(6, "1");
        expected.setLeft(new TreeNode(2, "2"));
        expected.setRight(new TreeNode(20, "3"));
        expected.children[1].setLeft(new TreeNode(17,"6"));
        expected.children[1].setRight(new TreeNode(21,"4"));
        expected.children[1].children[0].setLeft(new TreeNode(14,"5"));

        expectedMap = {
            "1": expected,
            "2": expected.children[0],
            "3": expected.children[1],
            "6": expected.children[1].children[0],
            "4": expected.children[1].children[1],
            "5": expected.children[1].children[0].children[0]
        }

        result = input.deleteNode(15);


        expect(result).toEqual(expectedMoves);
        expect(input.root).toMatchObject(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        // testing delete root with no children (make sure tree's root is updated)
        root = new TreeNode(6, "1");

        input = new BinarySearchTree(root);

        expectedMoves = {
            "type": 0, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                ],
                []
            ]
        };

        expected = null;

        expectedMap = {};

        result = input.deleteNode(6);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toEqual(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        // testing delete root with one child (make sure tree's root is updated)
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(5,"2"))

        input = new BinarySearchTree(root);

        expectedMoves = {
            "type": 1, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                ], 
                [
                    {"uuid": "2"}
                ]
            ]
        };

        expected = new TreeNode(5, "2");

        expectedMap = {
            "2": expected
        }

        result = input.deleteNode(6);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toEqual(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        // testing delete root with two children (make sure tree's root is updated)
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(5,"2"))
        root.setRight(new TreeNode(10,"3"))

        input = new BinarySearchTree(root);

        expectedMoves = {
            "type": 2, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                ],
                [
                    {"uuid": "3"}
                ]
            ]
        };

        expected = new TreeNode(10, "3");
        expected.setLeft(new TreeNode(5,"2"));

        expectedMap = {
            "3": expected,
            "2": expected.children[0]
        }


        result = input.deleteNode(6);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toEqual(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        // if a parent has no right child and you delete left, parent's children should be null
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(5,"2"))

        input = new BinarySearchTree(root);

        expectedMoves = {
            "type": 0, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                    {"type": "left", "uuid": "2"},
                ],
                []
            ]
        };
        expected = new TreeNode(6, "1");
        expectedMap = {
            "1" : expected
        }

        result = input.deleteNode(5);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toEqual(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        // if a parent has no left child and you delete right, parent's children should be null
        root = new TreeNode(6, "1");
        root.setRight(new TreeNode(10,"2"))

        input = new BinarySearchTree(root);

        expectedMoves = {
            "type": 0, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                    {"type": "right", "uuid": "2"},
                ],
                []
            ]
        };
        expected = new TreeNode(6, "1");
        expectedMap = {
            "1" : expected
        }

        result = input.deleteNode(10);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toEqual(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        // testing if removing a successor correctly sets parent's children to null or NullTreeNode
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(2,"2"))
        root.setRight(new TreeNode(20,"3"))
        root.children[1].setLeft(new TreeNode(15, "4"))

        input = new BinarySearchTree(root);

        expectedMoves = {
            "type": 2, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                ],
                [
                    {"uuid": "3"},
                    {"uuid": "4"}
                ]
            ]
        };

        expected = new TreeNode(15, "4");
        expected.setLeft(new TreeNode(2,"2"))
        expected.setRight(new TreeNode(20,"3"))

        expectedMap = {
            "4" : expected,
            "2" : expected.children[0],
            "3" : expected.children[1]
        }

        result = input.deleteNode(6);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toEqual(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        // testing if removing a successor that is directly right of node to delete
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(2,"2"))
        root.setRight(new TreeNode(20,"3"))
        root.children[1].setRight(new TreeNode(21, "4"))

        input = new BinarySearchTree(root);

        expectedMoves = {
            "type": 2, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                ],
                [
                    {"uuid": "3"}
                ]
            ]
        };

        expected = new TreeNode(20, "3");
        expected.setLeft(new TreeNode(2,"2"))
        expected.setRight(new TreeNode(21,"4"))

        expectedMap = {
            "3" : expected,
            "2" : expected.children[0],
            "4" : expected.children[1],
        }

        result = input.deleteNode(6);
        expect(result).toEqual(expectedMoves);
        expect(input.root).toEqual(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        // testing removing successor that is a left child and only has right child
        root = new TreeNode(6, "1");
        root.setLeft(new TreeNode(2,"2"))
        root.setRight(new TreeNode(20,"3"))
        root.children[1].setLeft(new TreeNode(15, "4"))
        root.children[1].children[0].setRight(new TreeNode(17, "5"))

        input = new BinarySearchTree(root);

        expectedMoves = {
            "type": 2, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                ],
                [
                    {"uuid": "3"},
                    {"uuid": "4"}
                ]
            ]
        };
                    
        expected = new TreeNode(15, "4");
        expected.setLeft(new TreeNode(2,"2"))
        expected.setRight(new TreeNode(20,"3"))
        expected.children[1].setLeft(new TreeNode(17, "5"))
        
        expectedMap = {
            "4" : expected,
            "2" : expected.children[0],
            "3" : expected.children[1],
            "5" : expected.children[1].children[0]
        }

        result = input.deleteNode(6);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toEqual(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);


        // testing removing successor that only has one direct right child
        root = new TreeNode(6, "1");
        root.setRight(new TreeNode(20,"2"))

        input = new BinarySearchTree(root);

        expectedMoves = {
            "type": 1, 
            "moves": [
                [
                    {"type": "visit", "uuid": "1"},
                ],
                [
                    {"uuid": "2"}
                ]
            ]
        };
        
        
        expected = new TreeNode(20, "2");
        expectedMap = {
            "2" : expected
        }

        result = input.deleteNode(6);

        expect(result).toEqual(expectedMoves);
        expect(input.root).toEqual(expected);
        expect(input.uuidToNodeMap).toMatchObject(expectedMap);
    })
    
})

describe ("Test findNode method", () => {
    it ("Should add error object to moves array when missing root", () => {
        let input = new BinarySearchTree();

        let expectedMoves = [
            {"error": "A node with this value does not exist in the tree"}
        ]
        let result = input.findNode(10);
        expect(result).toEqual(expectedMoves);
    })

    it ("Should add error object to moves array when node doesn't exist", () => {
        let root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(5, "2"));
        root.setRight(new TreeNode(7, "3"));

        let input = new BinarySearchTree(root);

        let expectedMoves = [
            {"type": "visit", "uuid": "1"},
            {"type": "left", "uuid": "2"},
            {"error": "A node with this value does not exist in the tree"}
        ]

        let result = input.findNode(2);

        expect(result).toEqual(expectedMoves);

        expectedMoves = [
            {"type": "visit", "uuid": "1"},
            {"type": "right", "uuid": "3"},
            {"error": "A node with this value does not exist in the tree"}
        ]

        result = input.findNode(10);
        expect(result).toEqual(expectedMoves);
    })

    it ("Should give proper moves array", () => {
        let root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(3, "2"));
        root.children[0].setRight(new TreeNode(4,"4"))
        root.setRight(new TreeNode(7, "3"));

        let input = new BinarySearchTree(root);
        
        let expectedMoves = [
            {"type": "visit", "uuid": "1"},
            {"type": "left", "uuid": "2"},
            {"type": "right", "uuid": "4"},
        ];

        let result = input.findNode(4);
        expect(result).toEqual(expectedMoves);


        // testing find leaf
        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(3, "2"));
        root.children[0].setLeft(new TreeNode(1,"4"))
        root.children[0].setRight(new TreeNode(4,"5"))
        root.setRight(new TreeNode(7, "3"));
        root.children[1].setLeft(new TreeNode(6,"6"))
        root.children[1].setRight(new TreeNode(10,"7"))

        input = new BinarySearchTree(root);
        
        expectedMoves = [
            {"type": "visit", "uuid": "1"},
            {"type": "right", "uuid": "3"},
            {"type": "left", "uuid": "6"},
        ];
        
        result = input.findNode(6);

        expect(result).toEqual(expectedMoves);

        // testing find node that has missing left child
        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(3, "2"));
        root.children[0].setRight(new TreeNode(4,"5"))
        root.setRight(new TreeNode(7, "3"));
        root.children[1].setLeft(new TreeNode(6,"6"))
        root.children[1].setRight(new TreeNode(10,"7"))

        input = new BinarySearchTree(root);
        
        expectedMoves = [
            {"type": "visit", "uuid": "1"},
            {"type": "left", "uuid": "2"},
        ];
        result = input.findNode(3);

        expect(result).toEqual(expectedMoves);

        // testing find node that has missing right child
        root = new TreeNode(5, "1");
        root.setLeft(new TreeNode(3, "2"));
        root.children[0].setRight(new TreeNode(4,"5"))
        root.setRight(new TreeNode(7, "3"));
        root.children[1].setRight(new TreeNode(10,"7"))

        input = new BinarySearchTree(root);
        
        expectedMoves = [
            {"type": "visit", "uuid": "1"},
            {"type": "right", "uuid": "3"},
        ];

        result = input.findNode(7);

        expect(result).toEqual(expectedMoves);
    })
})