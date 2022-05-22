import React, {Component} from "react";
import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort.js';
import {getSelectionSortAnimations} from "../SortingAlgorithms/selectionSort.js";
import {getBubbleSortAnimations} from "../SortingAlgorithms/bubbleSort.js";
import {getInsertionSortAnimations} from "../SortingAlgorithms/insertionSort.js";
import { getQuickSortAnimations } from "../SortingAlgorithms/quickSort.js";
import { getHeapSortAnimations } from "../SortingAlgorithms/heapSort.js";
import './sortingVisualizer.css';

import Slider from "react-rangeslider";
import 'react-rangeslider/lib/index.css';

const PRIMARY_COLOR = "#ADD8E6"; //light blue
const arrayBars = document.getElementsByClassName('array-bar');

var isAnimating = false;
var speed = 1000;


export default class SortingVisualizer extends Component{
    constructor(props){
        super(props);

        this.state = {
            array: [],
            num_bars: 10,
            animation_speed: 0,
        };
    }

    handleOnChange = (value) => {
        if(isAnimating){
            return;
        }
        if(this.state.num_bars !== value){
            this.resetArray();}
        this.setState({
          num_bars: value
        })
        
      }
    handleOnChange2 = (value) => {
        if(isAnimating){
            return;
        }
        this.setState({
            animation_speed: value
        })
        speed = 1000 - value;
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
        for(var i = 0; i < this.state.num_bars; i++){
            array.push(randomInt(10,105));
        }
        
        const bars = document.getElementsByClassName('array-bar');
        for(var j = 0; j < bars.length; j++){
            const barOneStyle = bars[j].style;
            barOneStyle.backgroundColor = PRIMARY_COLOR;
        }
        this.setState({array});
        
    }

    greenArray(delay){
        
        for(let i = 0; i < arrayBars.length; i++){
            setTimeout(() => {
            const barOneStyle = arrayBars[i].style;
            barOneStyle.backgroundColor = "lightgreen";
            }, speed * delay);
            delay+=.1;
        }
        setTimeout(() => {
            isAnimating = false;
        }, speed * delay);
    }

    //sorts
    mergeSort(){
        isAnimating = true;
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 2 !== 0;
                for(let j = 0; j < animations[i].length; j++){
                    if(isColorChange){
                        setTimeout(() => {
                            const [barOneIdx, newHeight] = animations[i][j];
                            const barOneStyle = arrayBars[barOneIdx].style;
                            barOneStyle.height = `${newHeight*5}px`;
                            barOneStyle.backgroundColor = "yellow";
                        }, i * speed);}
                    else{
                        setTimeout(() => {
                            const [barOneIdx, BarTwoIdx] = animations[i][j];
                            const barOneStyle = arrayBars[barOneIdx].style;
                            const barTwoStyle = arrayBars[BarTwoIdx].style;
                            barOneStyle.backgroundColor = "red";
                            barTwoStyle.backgroundColor = "red";
                        }, i * speed);
                    }
                }    
        }
        this.greenArray(animations.length);
    }

    selectionSort(){
        isAnimating = true;
        const animations = getSelectionSortAnimations(this.state.array);
        let delay = 0;
        for(let i = 0; i < animations.length; i++){
            const isColorChange = i % 2 === 0;
            for(let j = 0; j < animations[i].length; j++){
                if(isColorChange){
                    if(animations[i][j].length === 4){
                        setTimeout(() => {
                            const [barOneIdx, color, barTwoIdx, color2] = animations[i][j];
                            const barOneStyle = arrayBars[barOneIdx].style;
                            const barTwoStyle = arrayBars[barTwoIdx].style;
                            barOneStyle.backgroundColor = color;
                            barTwoStyle.backgroundColor = color2;
                    }, delay++ * speed);}
                        else{
                        setTimeout(() => {
                                const [barOneIdx, color] = animations[i][j];
                                const barOneStyle = arrayBars[barOneIdx].style;
                                barOneStyle.backgroundColor = color;
                        }, delay++ * speed);}
                }
                else{
                    setTimeout(() => {
                        const [barOneIdx, newHeight, barTwoIdx, newHeight2] = animations[i][j];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        barOneStyle.height = `${newHeight*5}px`;
                        barOneStyle.backgroundColor = "lightgreen";
                        barTwoStyle.height = `${newHeight2*5}px`;
                        if(barOneIdx!==barTwoIdx)
                            barTwoStyle.backgroundColor = PRIMARY_COLOR;
                    }, delay++ * speed);
                }
            }
        }
        
        this.greenArray(delay);
    }

    bubbleSort(){
        isAnimating = true;
        const animations = getBubbleSortAnimations(this.state.array);
        let delay = 0;
        for(let i = 0; i < animations.length; i++){
            
            if(animations[i].length === 2){
                setTimeout(() => {
                    const [barOneIdx, color] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.backgroundColor = color;
                }, delay++ * speed);
            }
            else if(animations[i].length === 4){
                setTimeout(() => {
                    const [barOneIdx, color, barTwoIdx, color2] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color2;
                }, delay++ * speed);
            }
            else if(animations[i].length === 6){
                setTimeout(() => {
                    const [barOneIdx,newHeight, color, barTwoIdx, newHeight2, color2] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color2;
                    barOneStyle.height = `${newHeight*5}px`;
                    barTwoStyle.height = `${newHeight2*5}px`;
                }, delay++ * speed);
            }
        }
        this.greenArray(delay);

    }

    insertionSort(){
        isAnimating = true;
        const animations = getInsertionSortAnimations(this.state.array);
        let delay = 0;
        for(let i = 0; i < animations.length; i++){
            if(animations[i].length === 2){
                setTimeout(() => {
                    const [barOneIdx, color] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.backgroundColor = color;
                }, delay++ * speed);
            }
            if(animations[i].length === 3){
                setTimeout(() => {
                    const [barOneIdx, newHeight, color] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight*5}px`;
                    barOneStyle.backgroundColor = color;
                }, delay++ * speed);
            }
            if(animations[i].length === 5){
                setTimeout(() => {
                    const [barOneIdx, color, barTwoIdx, newHeight2, color2] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.backgroundColor = color;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barTwoStyle.height = `${newHeight2*5}px`;
                    barTwoStyle.color = color2;
                }, delay++ * speed);
            }
        }
        this.greenArray(delay);
    }

    quickSort(){
        isAnimating = true;
        const animations = getQuickSortAnimations(this.state.array);
        let delay = 0;

        for(let i = 0; i < animations.length; i++){
            
            if(animations[i].length === 2){
                setTimeout(() => {
                    const [barOneIdx, color] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.backgroundColor = color;
                }, delay++ * speed);
            }
            else if(animations[i].length === 4){
                setTimeout(() => {
                    const [barOneIdx, color, barTwoIdx, color2] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color2;
                }, delay++ * speed);
            }
            else if(animations[i].length === 6){
                setTimeout(() => {
                    const [barOneIdx,newHeight, color, barTwoIdx, newHeight2, color2] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color2;
                    barOneStyle.height = `${newHeight*5}px`;
                    barTwoStyle.height = `${newHeight2*5}px`;
                }, delay++ * speed);
            }
        }
        this.greenArray(delay);
    }

    heapSort(){
        const animations = getHeapSortAnimations(this.state.array);
        isAnimating = true;
        let delay = 0;

        for(let i = 0; i < animations.length; i++){
            if(animations[i].length === 4){
                setTimeout(() => {
                    const [barOneIdx, color, barTwoIdx, color2] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color2;
                }, delay++ * speed);
            }
            else if(animations[i].length === 6){
                setTimeout(() => {
                    const [barOneIdx, color, barTwoIdx, color2, barThreeIdx, color3] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const barThreeStyle = arrayBars[barThreeIdx].style;
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color2;
                    barThreeStyle.backgroundColor = color3;
                }, delay++ * speed);
            }
            else if(animations[i].length === 7){
                setTimeout(() => {
                    const [barOneIdx, color, newHeight, barTwoIdx, color2, newHeight2, boo] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color2;
                    barOneStyle.height = `${newHeight*5}px`;
                    barTwoStyle.height = `${newHeight2*5}px`;
                }, delay++ * speed);
            }
        }

        this.greenArray(delay);

        
    }
    
   

    //TODO: change static numbers to variables based on size of the array
    render() {
        const {array, num_bars, animation_speed} = this.state;
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
            <div className = "sliders">
                <div className= "array-size">
                    <p className="array-text">Array Size:</p>
                    <Slider className="slider-array"
                        value={num_bars}
                        onChange={this.handleOnChange}
                        min={10}
                        max={100}
                        step = {10}
                        tooltip = {true} />
                </div>
                
                <div className= "animation-speed">
                    <h1 className="array-text">Animation Speed:</h1>
                    <Slider
                        value = {animation_speed}
                        onChange={this.handleOnChange2}
                        min={0}
                        max={950}
                        tooltip = {false}
                         />
                </div>


            </div>
            <div className="array-container"
                style={{}}>

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
