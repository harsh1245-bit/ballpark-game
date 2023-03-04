import React, {useState} from 'react'
//import PropTypes from 'prop-types'
import Hearts from "./Hearts";
import { Slider } from '@material-ui/core'
import Box from '@mui/material/Box';
import styles from "../styles/board.module.scss";
import GameOver from './Game-over';

import Button from './Button';
function Board(props) {
    const {questions, highscore, updateHighscore} = props;
    const [lives, setLives] = useState(3);
    const [count,setCount] = useState(0);
    const [randint, setrandint] = useState(Math.floor(Math.random()*1000));
    const [score, setScore] = useState(0);
    const [que, setQue] = useState(questions[randint].question);
    const [answer, setAnswer] = useState(questions[randint].answer);
    const [minValue, setminValue] = useState(questions[randint].minValue);
    const [maxValue, setmaxValue] = useState(questions[randint].maxValue);
    const [suffix, setSuffix] = useState(questions[randint].suffix);
    const [input,setInput] = useState(0);
    const [value,setValue] = useState("Slide to answer");
    const [subButton, setSubButton] = useState(true);
    const next =()=>{
        if(count!==0){
            setSubButton(true);
            setValue("Slide to answer");
            
        }
        setCount(count+1);
        console.log("working");
        
        setrandint(Math.floor(Math.random()*questions.length));
        setQue(questions[randint].question);
        setAnswer(questions[randint].answer)
        setminValue(questions[randint].minValue);
        setmaxValue(questions[randint].maxValue);
        setSuffix(questions[randint].suffix);
        
    }
    
  const setWrongness = function() {
    let guess_log = input
    console.log(guess_log)
    let truth_log = answer
    console.log(truth_log)
    let wrongness =0
    if (guess_log >= truth_log) { wrongness = (maxValue-guess_log)/(maxValue-truth_log) }
    else { wrongness = (guess_log-minValue)/(truth_log-minValue) }
    wrongness = 1-wrongness

    if(wrongness>0.1){
        setLives(lives-1);
        setValue("Correct answer is "+ rounding(answer)+ " "+ suffix+", you lost one life.")
       }
    if(wrongness<=0.1){
        setScore(score+1);
        setValue("Correct answer is "+rounding(answer)+ " "+ suffix+", your answer was close.")
        if(score>highscore){
            updateHighscore();
        }
    }
    console.log('wrongness:',wrongness)
  }
    const submit = ()=>{
        setWrongness();
        setSubButton(false);
    }
    const  rounding = (number)=>{
        if(number<10000){
          return number;
        }
        else if(number<100000){
          let x = number/1000;
          return x.toFixed(1) + " thousand";
        }
        else if(number<100000000){
          let x = number/100000;
          return x.toFixed(1) + " million";
        }
        else if(number==='slide to answer')
        {
          return 'slide to answer';
        }
      }
    const handleSliderChange = (event,newValue) => {
        //this.setWrongness();
        setValue(rounding(newValue) +" "+  suffix)
        setInput(newValue);
        
      };
  return (
    <div>
        <div className={styles.wrapper}>
            <div className={styles.top}>
            <Hearts lives={lives} />

            {lives > 0 ? (
            <>
              <div style={{color:"white"}}>
                <h1>{que}</h1>
                
                <div style={{display:"inline"}}>
                    <div id="slider" style={{margin:"100px"}}>
                        <Slider
                        size="small"
                        defaultValue={0}
                        value={input}
                        onChange={handleSliderChange }
                        aria-label="Custom marks"
                        valueLabelDisplay="off"
                        
                        min = {minValue}
                        max = {maxValue}
                        
                        />
          
                        <Box
                        component="span"
                        m={1}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        
                    >
                        <h6>{rounding(minValue)} {suffix}</h6>
                        <h6>{rounding(maxValue)} {suffix}</h6>
                        
                    </Box>
                </div>
            </div>
                <h1>{value}</h1>
                {subButton?(<Button onClick = {submit} text="Submit"/>):(<Button onClick = {next} text = "Next" />)}
                
                

              </div>
            </>
          ) : (
            <GameOver
              highscore={highscore}
              
              score={score}
            />
          )}



            Harsh Pandey
            </div>
        </div>
    </div>
  )
}



export default Board
