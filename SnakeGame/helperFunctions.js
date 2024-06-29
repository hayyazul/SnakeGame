function randInt(min, max) {
    /*
      Returns a random number between min and max inclusive.
    */

    return Math.round(Math.random() * (max - min)) + min;
}

function getSetEntries(set) {
    let entries = set.entries();
    var entriesOfSet = [];

    for (const entry of entries) {
        entriesOfSet.push(entry[0]);
    }
    console.log(entriesOfSet);
    return entriesOfSet;
}

// If the browser is firefox, then the difference method is not implemented for sets. Here something similar is implemented.
// Note this modifies the set which calls this.
function deleteSetItem(value) {

    this.delete(value);
}
Set.prototype.subtractSet = function (subtractingSet) {
    // this refers to the set being called
    subtractingSet.forEach(deleteSetItem, this);
}
