export function getHeapSortAnimations(array){
    const animations = [];


    if (array.length <= 1) return array;
    
    doHeap(array, animations);
    return animations;
}

function heapify(array, n, i, animations){
    let max = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    animations.push([i,"yellow",l,"yellow",r,"yellow"]);

    if(l < n && array[l] > array[max]){
        max = l;
        animations.push([i,"pink",l,"pink",r,"#ADD8E6"]);
    }
    if(r < n && array[r] > array[max]){
        max = r;
        animations.push([i,"pink",l,"#ADD8E6",r,"pink"]);
    }
    
    if(max!==i){
        animations.push([i,"pink",array[max],max,"pink",array[i],true]);
        animations.push([i,"#ADD8E6",array[max],max,"#ADD8E6",array[i],true]);
        let temp = array[i];
        array[i]=array[max];
        array[max] = temp;
        

        heapify(array,n,max,animations);
    }
    animations.push([i,"#ADD8E6",l,"#ADD8E6",r,"#ADD8E6"]);

}

function doHeap(array, animations){
    let n = array.length;

    for(let i = Math.floor(n/2-1); i>=0; i--){
        heapify(array,n,i,animations);
    }

    for(let i = n-1; i>=0; i--){
        animations.push([0,"pink",i,"pink"]);
        animations.push([0,"#ADD8E6",array[i],i,"#ADD8E6",array[0],true]);
        let temp = array[0];
        array[0]=array[i];
        array[i]=temp;

        heapify(array,i,0,animations);
    }

    
}
