// получить значение любого типа и вернуть его же.
function identity(value) {
  return value;
} 

// [1, 2, 3, 4] => 4
function last(list) {
  if (Array.isArray(list) !== true) return undefined;
  return list.length ? list[list.length - 1] : undefined;
}

// [1, 2, 3, 4] => 1
function first(list) {
  if (!Array.isArray(list)) return undefined;
  return list.length ? list[0] : undefined;
}



/*
	* range(4); // => [0, 1, 2, 3] 
	* range(-4); // => [0, -1, -2, -3]
	* range(1, 5); // => [1, 2, 3, 4]
	* range(0, 20, 5); // => [0, 5, 10, 15]
	* range(0, -4, -1); // => [0, -1, -2, -3]
	* range(1, 4, 0); // => [1, 1, 1]
	* range(0); // => []
*/
function range(start, end, step = 1) {
  if (end === undefined && start !== undefined) {
    end = start;
    start = 0;
  }

  // negative step
  if (end < start && step > 0) {
     step = step * (-1)
  }


  // if the step is 0
  const stepSize = (step == 0) ? 1 : step
  const size = Math.abs(Math.ceil((end - start) / stepSize))


  // if there is nothing to return
  if (size == Infinity) {
    return []
  }

  const incrementStep = (x, y) =>
        (step == 0) ? start : x + y * step

  return Array(size).
    fill(start).
    map(incrementStep)
}
