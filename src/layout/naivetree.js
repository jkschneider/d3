import "layout";
import "hierarchy";

// Node-link tree diagram using the Wetherell-Shannon algorithm.
// NOTE: this algorithm only applies to binary trees
d3.layout.naivetree = function() {
    var hierarchy = d3.layout.hierarchy().sort(null).value(null);

    function naivetree(d,i) {
        // hierarchy call sets node depth for us
        var nodes = hierarchy.call(this, d, i),
            root = nodes[0];

        d3_layout_hierarchyVisitBefore(root, storeYCoordinate);
        d3_layout_hierarchyVisitAfter(root, storeXCoordinate());

        return nodes;
    }

    // Store in each node its level in the tree; this is essentially
    // its y coordinate.
    function storeYCoordinate(v) {
        v.y = v.depth;
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

    return d3_layout_hierarchyRebind(naivetree, hierarchy);
};