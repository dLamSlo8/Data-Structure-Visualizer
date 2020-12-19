import * as d3 from 'd3';


export let d3Tree = null;

export const resetD3Tree = () => {
    // d3Tree = null;
};

/**
 * Going to need comments on this, not sure how node has x and children attributes,
 * our defined node does not include, is this something we need to add?
 * @param {*} node 
 */
export const preOrderTraversalD3 = (node) => {
  function helper(node, l) {
      if (!node) { // Node will be undefined
          return;
      }
      
      l.push({ x: node.x, y: node.y });
      if (node.children) {
          helper(node.children[0], l);
          helper(node.children[1], l);
      }
  }
  
  let res = [];
  helper(node, res);
  return res;
}


/**
 * Returns D3 representation of tree node.
 * @param node - root node of the tree structure
 */
export const nodeToD3 = (node) => {
  if (node === null) {
      return { name: null, uuid: null };
  }

  if (node.left === null && node.right === null) { // End case
      return { name: node.value, uuid: node.uuid };
  }

  let data = { name: node.value, uuid: node.uuid, children: [
      nodeToD3(node.left),
      nodeToD3(node.right)
  ] };
  
  return data;
}
/**
* Styles the currently active node
* @param activeUuid - Uuid of active node
*/
export const styleActiveNode = (activeUuid) => {
  console.log('styling active');
  d3.select('g.nodes')
      .selectAll('g.node') // Styles active circle
      .each(function (datum) {
          console.log(datum);
          if (datum.data.uuid === activeUuid) {
              d3.select(this).classed('active-node', true);
          }
          else {
              d3.select(this).classed('active-node', false);
          }
      });


}

/**
* Generates tree given rootNode.
* @param node - root node of the tree structure
* @param optimalWidth - width of frame
*/
export const generateD3Tree = (rootNode, optimalWidth) => {
  const data = nodeToD3(rootNode);

  // Generate binary tree using d3.

  const hierarchyNode = d3.hierarchy((data));
  const width = optimalWidth;
  const height = hierarchyNode.height * 100;

  const tree = d3.tree().size([width, height])(d3.hierarchy(data));
  return tree;
}

/**
* Draws tree for #tree selector.
* @param node - root node of the tree structure
* @param optimalWidth - width of frame
* @param optimalHeight - height of frame
*/
export const drawD3Tree = (tree, optimalWidth, optimalHeight) => {
  d3.select('#tree-svg').remove(); // Remove previous tree if any. 

  const canvas = d3.select('#tree')
      .append('svg')
      .attr('id', 'tree-svg')
      .attr('cursor', 'grab')
      .attr('width', optimalWidth)
      .attr('height', optimalHeight)
      .append('g')
      .attr('transform', 'translate(0, 30)');

  d3.select('#tree-svg').call(d3.zoom()
      .extent([[0, 0], [optimalWidth, optimalHeight + 50]])
      .scaleExtent([0.5, 8])
      .filter(function filter(event) {
          return document.documentElement.clientWidth <= 640 || event.shiftKey;
      })
      .on('zoom', function zoomed({transform}) {
          d3.select('#tree-svg g')
              .attr('transform', transform);
      }))


  canvas.append('g')
      .attr('class', 'links');

  canvas.append('g')
      .attr('class', 'nodes');

  const nodes = tree.descendants().filter((node) => node.data.name !== null);
  const links = tree.links().filter((link) => link.source.data.name !== null && link.target.data.name !== null);

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

export const drawD3TreeWithActiveNode = (tree, optimalWidth, optimalHeight, activeUuid) => {
  drawD3Tree(tree, optimalWidth, optimalHeight);

  styleActiveNode(activeUuid);
}
/**
* 
* @param tree - D3 tree
* @param handleActiveNodeChange - Callback function for when active node changes
*/
export const setClickHandlers = (tree, handleActiveNodeChange) => {
  const nodes = tree.descendants().filter((node) => node.data.name !== null);

  const circleNodes = d3.select('g.nodes') // Adds onClick listener!
      .selectAll('g.node')
      .data(nodes)
      .on('click', function (_, datum) {
          console.log(datum);
          let activeNode = { 
              uuid: datum.data.uuid,
              current: datum.data.name    
          };

          if (datum.children) {
              activeNode.left = datum.children[0].data.name;
              activeNode.right = datum.children[1].data.name;
          }
          else {
              activeNode.left = '';
              activeNode.right = '';
          }

          handleActiveNodeChange(activeNode);
      });
}

export const addAnimationElement = () => {
  const tree = d3.select('#tree-svg > g');

  tree.append('animated.g');
}