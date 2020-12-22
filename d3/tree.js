import * as d3 from 'd3';

/**
* Styles the currently active node
* @param activeUuid - Uuid of active node
*/
export const styleActiveNode = (activeUuid) => {
    d3.select('g.nodes')
        .selectAll('g.node') // Styles active circle
        .each(function (datum) {
            if (datum.data.uuid === activeUuid) {
                d3.select(this).classed('active-node', true);
            }
            else {
                d3.select(this).classed('active-node', false);
            }
        });
}

/**
* Generates tree given rootNode
* @param node - root node of the tree structure
* @param width - width of canvas
* @returns {Object} D3 tree
*/
export const generateD3Tree = (rootNode, width) => {

    // Generate binary tree using d3.

    const hierarchyNode = d3.hierarchy(rootNode);
    const height = hierarchyNode.height * 100;

    const tree = d3.tree().size([width, height])(hierarchyNode);
    return tree;
}

/**
 * Draws tree for #tree selector.
 * @param d3TreeRef - ref representing current d3 tree
 * @param width - width of canvas
 * @param height - height of canvas
 * @param transformRef - ref to keep track of current transform of canvas
 */
export const drawD3Tree = (d3TreeRef, width, height, transformRef) => {
    d3.select('#tree-svg').remove(); // Remove previous tree if any. 

    const canvas = d3.select('#tree')
        .append('svg')
        .attr('id', 'tree-svg')
        .attr('cursor', 'grab')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(0, 30)');

    // Sets up zoom and pan. 
    d3.select('#tree-svg').call(d3.zoom()
        .extent([[0, 0], [width, height + 50]])
        .scaleExtent([0.5, 8])
        .filter(function filter(event) { // Only allows zoom and pan when holding down shift key (on non-mobile screens!)
            return document.documentElement.clientWidth <= 640 || event.shiftKey;
        })
        .on('zoom', function zoomed({transform}) {
            transformRef.current = transform;
            d3.selectAll('#tree-svg > g')
                .attr('transform', transform);
        }))


    canvas.append('g')
        .attr('class', 'links');

    canvas.append('g')
        .attr('class', 'nodes');

    const nodes = d3TreeRef.descendants().filter((node) => node.data.name !== null);
    const links = d3TreeRef.links().filter((link) => link.source.data.name !== null && link.target.data.name !== null);

    canvas.select('g.links')
        .selectAll('.link')
        .data(links)
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr('stroke', 'black')
        .attr('class', 'link')
        .attr('x1', function(d) {return d.source.x;})
        .attr('y1', function(d) {return d.source.y;})
        .attr('x2', function(d) {return d.target.x;})
        .attr('y2', function(d) {return d.target.y;});
    // Create individual nodes
    const node = canvas.select('g.nodes')
        .selectAll('.node') 
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node');

    node.append('circle')
        .attr('r', 20)
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-width', '2');

    node.append('text')
        .text(function(d) { return d.data.name; })
        .attr('x', function(d) { return d.x; })
        .attr('y', function(d) { return d.y; })
        .attr('text-anchor', 'middle')
        .attr('dy', '6')
        .attr('font-family', '"Lora", serif');


    return { nodes };
}

/**
 * Sets click handlers for each node in the tree
 * @param d3TreeRef - Ref representing current d3 tree
 * @param tree - D3 tree
 * @param handleActiveNodeChange - Callback function for when active node changes
 */
export const setClickHandlers = (d3TreeRef, handleActiveNodeChange) => {
    const nodes = d3TreeRef.descendants().filter((node) => node.data.name !== null);

    d3.select('g.nodes') // Selects all circle nodes
        .selectAll('g.node')
        .data(nodes)
        .on('click', function (_, datum) {
            let activeNode = { 
                uuid: datum.data.uuid,
                current: datum.data.name    
            };

            if (datum.children) {
                activeNode.left = datum.children[0].data.name;
                activeNode.right = datum.children[1].data.name;
            }
            else {
                activeNode.left = null;
                activeNode.right = null;
            }

            handleActiveNodeChange(activeNode);
        });
}

/**
 * Removes click handlers from d3tree
 */
export const removeClickHandlers = () => {
    d3.select('g.nodes')
        .selectAll('g.node')
        .on('click', null);
}
