// Reserve the namespace
if(!window.Leonardo) { var Leonardo = {}; }


// Array utilities
// Extend array class
Array.prototype.max = function () {
  return Math.max.apply(Math, this);
}
