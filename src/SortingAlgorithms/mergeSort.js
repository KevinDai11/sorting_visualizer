
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
    animeHighlight.push([i,j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animeGroup.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];

    } else {
      animeGroup.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middle) {
    animeHighlight.push([i,i]);
    animeGroup.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= end) {
    animeHighlight.push([j,j]);
    animeGroup.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }

  animations.push(animeHighlight);
  animations.push(animeGroup);
}


