import { v4 as uuidv4 } from 'uuid';


/**
 * TreeNode helper class used for tree data structures.
 * 
 * @property {int} name - value of node
 * @property {string} uuid - uuid of node
 * @property {Array} children - children nodes (i.e. index 0 is left, index 1 is right)
 */
export default class TreeNode {

    /**
     * @param {int} value - value of node
     * @param {string} [uuid] - uuid of node
     * @param {TreeNode} [node] - node to make copy of 
     */
    constructor(value, uuid, node) {
        if (node) {
            let { name, uuid, children } = node;
            this.name = name;
            this.uuid = uuid;
            this.children = [...children];
        } else {
            this.name = value;
            if (uuid === null && value === null) {
                this.uuid = null;
            }
            else {
                this.uuid = uuid || uuidv4(); 
            }
            this.children = null;
        }
    }

}