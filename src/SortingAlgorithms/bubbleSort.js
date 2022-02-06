export function getBubbleSortAnimations(array){
    const animations = [];

    if (array.length <= 1) return array;
    
    doBubble(array, animations);
    return animations;
}

function doBubble(array, animations){
    const n = array.length;

    for(let i = 0; i < n - 1; i++){
        for(let j = 0; j < n - 1 - i; j++){
            animations.push([j,"yellow"]);
            animations.push([j+1,"yellow"]);
            if(array[j]>array[j+1]){
                animations.push([j,"red",j+1,"red"]);
                animations.push([j,array[j+1],"red",j+1,array[j],"red"]);
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1]=temp;    
            }
            animations.push([j,"#ADD8E6",j+1,"#ADD8E6"]);
        }
        animations.push([n-i-1,"lightgreen"]);
    }
    animations.push([0,"lightgreen"]);
    
}