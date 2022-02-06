export function getInsertionSortAnimations(array){
    const animations = [];

    if (array.length <= 1) return array;
    
    doInsertion(array, animations);
    return animations;
}

function doInsertion(array, animations){
    for(let i = 1; i < array.length; i++){
        let key = array[i];
        animations.push([i,"yellow"]);
        let j = i - 1;
        animations.push([j,"red"]);
        while(j>=0 && array[j]>key){
            animations.push([j,"red",j+1,array[j],"red"]);
            array[j+1]=array[j];
            j--;
            animations.push([j,"red"]);
        }
        animations.push([j+1,key,"red"]);
        for(let k = j; k < i+1; k++){
            animations.push([k,"lightgreen"]);
        }
        array[j + 1] = key;
    }
}