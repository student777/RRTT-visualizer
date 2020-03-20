const fs = require('fs');

var data = require('../test/codit/data.json');
var itemList = [];
traverse(data, 0);
prettify(itemList);
var tree = listToTree(itemList);
fs.writeFileSync('../out/data.out.json', JSON.stringify(tree[0], null, 1))



function traverse(data, level) {
    if (typeof data === 'boolean' || typeof data === 'number' || typeof data === 'string') {
        itemList.push({
            name: data,
            level: level,
        })
        return;
    }
    if (Array.isArray(data)) {
        data.forEach(function(child){
            traverse(child, level + 1);
        })
    } else if (typeof data === 'object') {
        for (var prop in data) {
            traverse(data[prop], level + 1);
        }
    }
}

function prettify(itemList) { // fuck
    itemList.splice(0, 0, {name: 'root', level: 0});
    for (var i = 0; i < itemList.length - 1; i++) {
        var curr = itemList[i];
        var next = itemList[i + 1];
        if (next.level - curr.level > 1) {
            next.level = curr.level + 1;
        }
    }
}

function listToTree(itemList) { // itemList -> items
    var ret = [];
    var stack = [];
    for (var i = 0; i < itemList.length; i++) {
        var curr = itemList[i];
        if (curr.level === 0) {
            stack = [];
            ret.push(curr);
            stack.push(curr);
            continue;
        }
        var stackTop = stack[stack.length - 1];
        if (curr.level === stackTop.level + 1) {
            var parent = stackTop;
            if (!parent.children) parent.children = [];
            parent.children.push(curr);
            stack.push(curr);
        } else if (curr.level === stackTop.level) {
            var parent = stack.find(s => curr.level - 1 === s.level);
            parent.children.push(curr);
        } else if (curr.level < stackTop.level) {
            var parent = stack.find(s => curr.level - 1 === s.level);
            stack.splice(stack.indexOf(parent) + 1);
            if (!parent.children) parent.children = [];
            parent.children.push(curr)
            stack.push(curr);
        }
    }
    return ret;
}