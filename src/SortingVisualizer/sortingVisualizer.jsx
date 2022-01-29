import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort.js';
import './sortingVisualizer.css';


const PRIMARY_COLOR = "#ADD8E6"; //light blue

var animation_speed = 1000;
var isAnimating = false;
var num_bars = 10;





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
        this.setState({array});
    }

    greenArray(){
        const a = this.state.array;
        const arrayBars = document.getElementsByClassName('array-bar');
        for(var i = 0; i < a.length-1; i++){
            if(a[i]<a[i+1]){
                setTimeout(() =>{
                    const barStyle = arrayBars[i].style;
                    barStyle.backgroundColor = "green";
                },i*animation_speed);
                
            }
        }
    }

    //sorts
    mergeSort(){
        isAnimating = true;
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {

            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;

            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];

                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                const color = i % 3 === 0 ? "yellow" : "red";
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * animation_speed);

            } else {
                setTimeout(() => {
                    if(animations[i].length==2){
                        const [barOneIdx, newHeight] = animations[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newHeight*5}px`;
                        barOneStyle.backgroundColor = "yellow";
                    }
                    else{
                        const [barOneIdx, newOneHeight, barTwoIdx, newTwoHeight] = animations[i];

                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newOneHeight*5}px`;
                        barOneStyle.backgroundColor = "yellow";
                        
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        barTwoStyle.height = `${newTwoHeight*5}px`;
                        barTwoStyle.backgroundColor = "yellow";

                    }
                
                }, i * animation_speed);
            }
        }
    }
    
   

    //TODO: change static numbers to variables based on size of the array
    render() {
        const {array} = this.state;
        return (
        <div className = "screen-container">
            <div className = "title-container">
                Sorting Visualizer
            </div>

            <div className="array-container"
                style={{
                 left: `calc(50% - ${num_bars*10}px)`,
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
            
          <div className = "sorting-buttons"> 
                <button className = "gen-button" onClick={() => this.resetArray()}>Generate New Array</button>
                <button className = "button" onClick={() => this.mergeSort()}>Merge Sort</button>
                <button className = "button" onClick={() => this.quickSort()}>Quick Sort</button>
                <button className = "button" onClick={() => this.heapSort()}>Heap Sort</button>
                <button className = "button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button className = "button" onClick={() => this.insertionSort()}>Insertion Sort</button>
            </div>

        </div>
          
        );
    }

}





function randomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}