import axios from "axios";
import { useEffect, useState } from "react";

//Functional expression
const App =() => {

  const [chosenLevel, setChosenLevel] = useState (null)
  const [words, setWords] = useState(null)
  const [correctAnswers,setCorrectAnswers] = useState([])
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0)


  //We want to get the word as soon as users click on the button 
  const randomWords = () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/results',
      params: {level: chosenLevel, area: 'sat'},
    }

    axios.request(options).then((response) => {
      console.log(response.data)
      setWords(response.data)
    }).catch((error) => {
      console.error(error);
    })
  }



console.log(words && words.quizzlist);

  useEffect(()=>{
    if(chosenLevel) randomWords()
  },[chosenLevel])


  const checkAnswer =(option,optionIndex, correctAnswer) =>{
    console.log(optionIndex,correctAnswer)
    if(optionIndex == correctAnswer){
      //push other array to the correct answer to check if it works
      setCorrectAnswers([...correctAnswers, option])
      setScore((score)=> score + 1)
    } else {
      setScore((score) => score - 1)
    }
    setClicked([...clicked, option])
  }


  console.log('correctAnswer',correctAnswers)
  console.log('clicked',clicked)


  return (
    <div className="app">
      {!chosenLevel && <div className="level-selector">
        <h1>Words Quizz Game</h1>
        <p>Select Your Level To Start</p>
        <select 
        name="levels" 
        id="levels" 
        value={chosenLevel} 
        onChange={(e) => setChosenLevel(e.target.value)}>
          <option value={null}>Select a level</option>
          <option value={'1'}>
            Level 1
          </option>
          <option value={'2'}>
            Level 2
          </option>
          <option value={'3'}>
            Level 3
          </option>
          <option value={'4'}>
            Level 4
          </option>
          <option value={'5'}>
            Level 5
          </option>
          <option value={'6'}>
            Level 6
          </option>
          <option value={'7'}>
            Level 7
          </option>
          <option value={'8'}>
            Level 8
          </option>
          <option value={'9'}>
            Level 9
          </option>
          <option value={'10'}>
            Level 10
          </option>
        </select>
      </div>}

      {chosenLevel && words && <div className="question-area">
        <h1>Welcome to Level: {chosenLevel}</h1>
        <h3> Your score is : {score}</h3>
        <p>Just select which word is most closely related to the given group of words.</p>

        <div className="questions">
          {words.quizlist.map ((question, _questionIndex) =>(
            <div key={_questionIndex}className="question-box">
                {question.quiz.map ((tip, _index) =>(
                  <p key={_index}>{tip}</p>
                ))}
                <div className="question-buttons">
                  {question.option.map((option, optionIndex) =>(
                    <div key={optionIndex} className="question-button">
                      <button
                        disabled={clicked.includes(option)}
                        onClick={() => checkAnswer(

                          //because this is the array so should be + 1 in the check answer
                          option,optionIndex + 1, question.correct
                        )}
                      
                      >{option}</button> 
                      {/*  let users know they chose the right answer */}
                      {correctAnswers.includes(option) && <p>Correct!</p>}
                    </div>
                  ))}
                </div>
            </div>
          ))}
        </div>
        <button className="back-button" onClick={()=> setChosenLevel(null)}>
          Go Back
        </button>
      </div>}
    </div>
  )
}

export default App;