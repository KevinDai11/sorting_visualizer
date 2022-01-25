import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort.js';
import './sortingVisualizer.css';


const PRIMARY_COLOR = "#ADD8E6"; //light blue
const SECONDARY_COLOR = "red";
const TERTIARY_COLOR = "green";

var animation_speed = 1;

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
        const array = [];
        for(var i = 0; i < num_bars; i++){
            array.push(randomInt(10,105));
        }
        this.setState({array});
    }

    //sorts
    mergeSort(){
        const animations = getMergeSortAnimations(this.state.array);

        for(var i = 0; i < animations.length; i++){
            const arrayBars = document.getElementByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            
            if(isColorChange){
                const [barOneIdx, barTwoIdx] = animations[i];
                const color = i % 3 == 0 ? SECONDARY_COLOR : PRIMARY_COLOR; 
                setTimeout(() => {
                    arrayBars[barOneIdx].style.backgroundColor = color;
                    arrayBars[barTwoIdx].style.backgroundColor = color;
                }, i * animation_speed);
            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newBar] = animations[i];
                    arrayBars[barOneIdx].style.height = `${newBar}px`;
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
                  height: `${value*3}px`,
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