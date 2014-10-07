var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.layout.naivetree");

suite.addBatch({
    "naivetree": {
        topic: load("layout/naivetree").expression("d3.layout.naivetree"),
        "computes a simple tree layout": function(naivetree) {
            var t = naivetree();
            assert.deepEqual(t.nodes({
                name: "1",
                children: [
                    {
                        name: "1-1",
                        children: [
                            {name: "1-1-1"},
                            {name: "1-1-2"}
                        ]
                    },
                    {
                        name: "1-2",
                        children: [
                            {name: "1-2-1"}
                        ]
                    }
                ]
            }).map(layout), [
                {name: "1", depth: 0, x: 3, y: 0},
                {name: "1-1", depth: 1, x: 1, y: 1},
                {name: "1-1-1", depth: 2, x: 0, y: 2},
                {name: "1-1-2", depth: 2, x: 2, y: 2},
                {name: "1-2", depth: 1, x: 5, y: 1},
                {name: "1-2-1", depth: 2, x: 4, y: 2}
            ]);
        }
    }
});

function layout(node) {
    delete node.children;
    delete node.parent;
    return node;
}

suite.export(module);
