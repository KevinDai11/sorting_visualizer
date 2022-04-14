export function getQuickSortAnimations(array){
    const animations = [];

    if (array.length <= 1) return array;
    
    doQuick(array,0,array.length-1, animations);
    return animations;
}

function partition(array,low,high,animations){
    let pivot = array[high];
    animations.push([high, "yellow"]);

    let i = low - 1;
    for(let j = low; j <=high - 1; j++){
        animations.push([j,"yellow"]);
        if(array[j]<pivot){
            i++;

            if(j!==i){
            animations.push([j,"red",i,"red"]);
            animations.push([j,array[i],"red",i,array[j],"red"]);
            animations.push([j,array[i],"#ADD8E6",i,array[j],"#ADD8E6"]);}
            else{
                animations.push([j,"red"]);
                animations.push([j,"#ADD8E6"]);
            }

            let temp = array[i];
            array[i]=array[j];
            array[j]=temp;
        }
        animations.push([j,"#ADD8E6"]);
    }

    animations.push([high,"red",i+1,"red"]);
    animations.push([high,array[i+1],"red",i+1,array[high],"red"]);
    animations.push([high,"#ADD8E6",i+1,"#ADD8E6"]);

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