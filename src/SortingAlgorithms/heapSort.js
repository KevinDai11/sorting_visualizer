export function getHeapSortAnimations(array){
    const animations = [];

    window.alert(array);

    if (array.length <= 1) return array;
    
    doHeap(array, animations);
    return animations;
}

function heapify(array, n, i, animations){
    let max = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if(l < n && array[l] > array[max]){
        max = l;
    }
    if(r < n && array[r] > array[max]){
        max = r;
    }
    
    if(max!==i){
        let temp = array[i];
        array[i]=array[max];
        array[max] = temp;

        heapify(array,n,max,animations);
    }

}

function doHeap(array, animations){
    let n = array.length;

    for(let i = Math.floor(n/2-1); i>=0; i--){
        heapify(array,n,i,animations);
    }

    for(let i = n-1; i>=0; i--){
        let temp = array[0];
        array[0]=array[i];
        array[i]=temp;

        heapify(array,i,0,animations);
    }

    
}