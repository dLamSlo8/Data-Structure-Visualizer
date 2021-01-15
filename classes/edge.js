import { v4 as uuidv4 } from 'uuid';


/**
 * TreeNode helper class used for tree data structures.
 * 
 * @property {float} startX - the x position of the start of the line
 * @property {float} endX  - the x position of the end of the line
 * @property {float} startY - the y position of the start of the line
 * @property {float} endY - the y position of the end of the line
 * @property {string} uuid - (optional) uuid of edge
 */
export default class Edge {
    /**
     * 
     * @param {string} [uuid = null] - (optional) uuid of edge
     */
    constructor(uuid = null) {
        this.uuid = uuid || uuidv4();
    }


    /**
     * Sets x and y coordinates of edge class
     * @param {float} startX - the x position of the start of the line
     * @param {float} endX  - the x position of the end of the line
     * @param {float} startY - the y position of the start of the line
     * @param {float} endY - the y position of the end of the line
     */
    setPosition(startX, endX, startY, endY) {
        this.startX = startX;
        this.endX = endX;
        this.startY = startY;
        this.endY = endY;
    }
}