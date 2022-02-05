export function getSelectionSortAnimations(array){
    const animations = [];

    if (array.length <= 1) return array;
    
    doSelection(array, animations);
    return animations;

}

function doSelection(array, animations){
    const n = array.length;

    for(let i = 0; i < n - 1; i++){
        const animateHighlight = [];
        const animateChange = [];
        const animteBack = [];
        let min_index = i;
        animateHighlight.push([i,"red"]);

        for(let j = i + 1; j < n; j++){
            const animateHighlightTemp = [];
            animateHighlightTemp.push(j,"yellow");
            if(j>1 && j-1!=min_index) animateHighlightTemp.push(j-1,"#ADD8E6");
            animateHighlight.push(animateHighlightTemp);
            if(array[j] < array[min_index]){
                const listAnimate = []
                if(min_index !== i) listAnimate.push(min_index,"#ADD8E6");
                listAnimate.push(j, "pink");
                animateHighlight.push(listAnimate);
                min_index = j;
            }
            
        }
        if(n-1!=min_index)animateHighlight.push([n-1,"#ADD8E6"]);
        animations.push(animateHighlight);

        const animateChangeList = []
        animateChangeList.push(i,array[min_index]);
        animateChangeList.push(min_index,array[i]);
        animateChange.push(animateChangeList);
        
        const temp = array[min_index];
        array[min_index] = array[i];
        array[i] = temp;

        animations.push(animateChange);
    }
    animations.push([[n-1,"lightgreen"]]);
}

