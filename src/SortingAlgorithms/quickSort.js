export function getQuickSortAnimations(array){
    const animations = [];

    if (array.length <= 1) return array;
    
    doQuick(array,0,array.length-1, animations);
    return animations;
}

function partition(array,low,high,animations){
    let pivot = array[high];

    let i = low - 1;

    for(let j = low; j <=high - 1; j++){

        if(array[j]<pivot){
            i++;
            
            let temp = array[i];
            array[i]=array[j];
            array[j]=temp;
        }
    }
    let temp = array[i+1];
    array[i+1]=array[high];
    array[high]=temp;

    return i+1;
}

function doQuick(array, low, high, animations){
    if(low < high){
        let temp = partition(array,low,high,animations);

        doQuick(array,low,temp -1,animations);
        doQuick(array,temp+1,high,animations);
    }
}