// Reserve the namespace
if(!window.Leonardo) { var Leonardo = {}; }


// Array utilities
// Extend array class
Array.prototype.max = function () {
  return Math.max.apply(Math, this);
}

Array.prototype.first = function () {
	return this[0];
}

Array.prototype.last = function () {
	return this[this.length-1];
}