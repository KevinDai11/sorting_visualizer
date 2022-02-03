
export function getMergeSortAnimations(array) {
  const animations = [];

  if (array.length <= 1) return array;

  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}



function mergeSortHelper(mainArray, start, end, auxiliaryArray, animations) {
  if(start<end){
    const middle = Math.floor((start + end) / 2);
    mergeSortHelper(auxiliaryArray, start, middle, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middle + 1, end, mainArray, animations);
    doMerge(mainArray, start, middle, end, auxiliaryArray, animations);
    }
}

function doMerge(mainArray, start, middle, end, auxiliaryArray, animations,) {
  let k = start;
  let i = start;
  let j = middle + 1;

  const animeGroup = []
  const animeHighlight = [];

  while (i <= middle && j <= end) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animeHighlight.push([i,j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
   // animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animeGroup.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];

    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animeGroup.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middle) {
    animeHighlight.push([i,i]);
    //animations.push([i, i]);
    animeGroup.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= end) {
    animeHighlight.push([j,j]);
    //animations.push([j, j]); 
    animeGroup.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }

  animations.push(animeHighlight);
  animations.push(animeGroup);
}


