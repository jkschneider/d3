import "layout";
import "hierarchy";

// Node-link tree diagram using the Wetherell-Shannon algorithm.
// NOTE: this algorithm only applies to binary trees
d3.layout.naivetree = function() {
    var hierarchy = d3.layout.hierarchy().sort(null).value(null),
        size = [1, 1]; // width, height

    function naivetree(d,i) {
        // hierarchy call sets node depth for us
        var nodes = hierarchy.call(this, d, i),
            root = nodes[0];

        d3_layout_hierarchyVisitAfter(root, storeXCoordinate());
        d3_layout_hierarchyVisitBefore(root, sizeNode);

        return nodes;
    }

    function storeXCoordinate() {
        var nextPos = {};
        return function(v) {
            if(!v.children || v.children.length == 0) {
                if(nextPos[v.depth] != null)
                    v.x = nextPos[v.depth] + 2;
                else
                    v.x = 0;
                nextPos[v.depth] = v.x;
            }
            else if(v.children.length == 1)
                v.x = v.children[0].x + 1;
            else if(v.children.length == 2)
                v.x = (v.children[0].x + v.children[1].x) / 2;
        }
    }

    function sizeNode(node) {
        node.x *= size[0];
        node.y = node.depth * size[1];
    }

    naivetree.nodeSize = function(x) {
        size = x;
        return naivetree;
    };

    return d3_layout_hierarchyRebind(naivetree, hierarchy);
};