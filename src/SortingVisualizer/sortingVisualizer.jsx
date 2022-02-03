import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort.js';
import './sortingVisualizer.css';


const PRIMARY_COLOR = "#ADD8E6"; //light blue

var animation_speed = 100; //lower = faster
var isAnimating = false;
var num_bars = 100;





export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array: [],
        };
    }
    
    componentDidMount(){
        this.resetArray();
    }

    //generates new random array
    resetArray(){
        if(isAnimating){
            return;
        }
        const array = [];
        for(var i = 0; i < num_bars; i++){
            array.push(randomInt(10,105));
        }
        
        const bars = document.getElementsByClassName('array-bar');
        for(var i = 0; i < bars.length; i++){
            const barOneStyle = bars[i].style;
            barOneStyle.backgroundColor = PRIMARY_COLOR;
        }
        
        this.setState({array});
        
        
        
        
    }


    //sorts
    mergeSort(){
        isAnimating = true;
        const animations = getMergeSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 2 !== 0;
                for(let j = 0; j < animations[i].length; j++){
                    if(isColorChange){
                        setTimeout(() => {
                            const [barOneIdx, newHeight] = animations[i][j];
                            const barOneStyle = arrayBars[barOneIdx].style;
                            barOneStyle.height = `${newHeight*5}px`;
                            barOneStyle.backgroundColor = "yellow";
                        }, i * animation_speed);}
                    else{
                        setTimeout(() => {
                            const [barOneIdx, BarTwoIdx] = animations[i][j];
                            const barOneStyle = arrayBars[barOneIdx].style;
                            const barTwoStyle = arrayBars[BarTwoIdx].style;
                            barOneStyle.backgroundColor = "red";
                            barTwoStyle.backgroundColor = "red";
                        }, i * animation_speed);
                    }
                }    
        }
        setTimeout(() => {
            isAnimating = false;
            for(var i = 0; i < arrayBars.length; i++){
                const barOneStyle = arrayBars[i].style;
                barOneStyle.backgroundColor = "lightgreen";
            }
        }, animation_speed * animations.length);
        
    }
    
   

    //TODO: change static numbers to variables based on size of the array
    render() {
        const {array} = this.state;
        return (
        <div className = "screen-container">
            <div className = "title-container">
                Sorting Visualizer
            </div>
            <div className = "sorting-buttons"> 
                <button className = "gen-button" onClick={() => this.resetArray()}>Generate New Array!</button>
                <button className = "button" onClick={() => this.mergeSort()}>Merge Sort</button>
                <button className = "button" onClick={() => this.quickSort()}>Quick Sort</button>
                <button className = "button" onClick={() => this.heapSort()}>Heap Sort</button>
                <button className = "button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button className = "button" onClick={() => this.insertionSort()}>Insertion Sort</button>
                <button className = "button" onClick={() => this.selectionSort()}>Selection Sort</button>
            </div>

            <div className="array-container"
                style={{
            }}>

            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value*5}px`,
                }}></div>
            ))}
            </div>
            
         

        </div>
          
        );
    }

}


function randomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}