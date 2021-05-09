var _ = require('lodash');
var assert = require('assert');
var fs = require('fs');

var babyparse = require('babyparse');

function readCSV(filename) {
    return babyparse.parse(fs.readFileSync(filename, 'utf8'), {
        header: true,
        keepEmptyRows: false,
        skipEmptyLines: true
    }).data;
}

function readJSON(filename) {
    return require(filename);
}

function writeCSV(jsonCSV, filename) {
    fs.writeFileSync(filename, babyparse.unparse(jsonCSV) + '\n');
}

function appendCSV(jsonCSV, filename) {
    fs.appendFileSync(filename, babyparse.unparse(jsonCSV) + '\n');
}

var butLast = function (xs) {
    return xs.slice(0, xs.length - 1);
};

var getGoals = function (len, type) {
    let goals = [];
    if (type === 'rows') {
        for (let i=0; i<len; i++) {
            goals.push(String.fromCharCode(i+65)); // 65 is ascii for 'A'
        }
    } else if (type === 'cols') {
        for (let i=0; i<len; i++) {
            goals.push((i+1).toString())
        }
    }
    return goals;
};

var flip = function () {
    return Math.random() < 0.5 ? 'safe' : 'unsafe';
};

var getWorld = function (rowGoals, colGoals) {
    let world = {};
    for (let row of rowGoals) {
        for (let col of colGoals) {
            world[row+col] = flip();
        }
    }
    if (validateWorld(world, rowGoals, colGoals)) {
        return world;
    } else {
        return getWorld(rowGoals, colGoals);
    }
};

var getInitialWorldState = function (world) {
    let safe = [];
    let unsafe = [];

    let random_safe = 2;
    let random_unsafe = 1;

    for (let state in world) {
        if (world[state] === 'safe') {
            safe.push(state)
        } else if (world[state] === 'unsafe') {
            unsafe.push(state)
        }
    }

    let initState = {'safe': [], 'unsafe': []};
    let i = 0;
    while (i<random_safe) {
        let val = safe[Math.floor(Math.random() * safe.length)];
        if (!initState['safe'].includes(val)) {
            initState['safe'].push(val);
            i+=1;
        }
    }
    i = 0;
    while (i<random_unsafe) {
        let val = unsafe[Math.floor(Math.random() * unsafe.length)];
        if (!initState['unsafe'].includes(val)) {
            initState['unsafe'].push(val);
            i += 1;
        }
    }
    return initState;
};

var completeCol = function(qud, world) {
  var colVals = _.filter(_.keys(world), function(cellName) {return cellName[1] === qud;});
  return _.every(colVals, function(val) {return world[val] === 'safe'});
};

var completeRow = function(qud, world) {
  var rowVals = _.filter(_.keys(world), function(cellName) { return cellName[0] === qud;});
  return _.every(rowVals, function(val) {return world[val] === 'safe'});
};

var cellMatch = function(qud, world) {
  return world[qud] === 'safe';
};


var validateWorld = function (world, rows, cols) {
    let any_row = false;
    let any_col = false;

    for (let row in rows){
        any_row = any_row || completeRow(rows[row], world);
    }

    for (let col in cols) {
        any_col = any_col || completeCol(cols[col], world);
    }

    return any_row && any_col
};

var getNumbers = function (val){
  return [...Array(val).keys()]
};

module.exports = {
    butLast: butLast,
    getGoals: getGoals,
    getWorld: getWorld,
    getInitialWorldState: getInitialWorldState,
    completeCol: completeCol,
    completeRow: completeRow,
    cellMatch: cellMatch,
    readCSV: readCSV,
    readJSON: readJSON,
    writeCSV: writeCSV,
    appendCSV: appendCSV,
    validateWorld: validateWorld,
    getNumbers: getNumbers
};
