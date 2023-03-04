import React, {useState, useCallback} from 'react'
import Board from './Board'
//import Loading from './Loading'
import supabase from "./config/supabaseClient"
import Instructions from './Instructions'

export default function Game() {
    const [questions,setquestions] = useState(null);
    const [started, setStarted] = useState(false);
    const [highscore, setHighscore] = useState(
        Number(localStorage.getItem("highscore") ?? "0")
      );


    React.useEffect(()=>{
        const fetchQuestion= async ()=>{
            const {data, error} = await supabase
            .from('new_que')
            .select()
        
            if(error){
                console.log("error")
                this.setState({
                  question: null,
                  error: "could not fetch data"
                })
            }
            if(data){
                //console.log(data);
                setquestions(data);
            }
        }

        fetchQuestion();

    })
    const updateHighscore = useCallback((score) => {
        localStorage.setItem("highscore", String(score));
        setHighscore(score);
      }, []);

    if (!started) {
        return (
          <Instructions highscore={highscore} start={() => setStarted(true)} />
        );
      }
  return (
    <div>Ballpark
        
        <Board
        highscore = {highscore}
        questions = {questions}
        updateHighscore = {updateHighscore}
        />

    </div>
    
  )
}
