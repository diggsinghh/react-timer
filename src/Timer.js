import React, { useState, useEffect } from "react"
import './Timer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

function Timer(){
    // const [hours, setHours] = useState(0);
    // const [minutes, setMinutes] = useState(0);
    // const [seconds, setSeconds] = useState(0);
    // const [milliseconds, setMilliseconds] = useState(0);
    const [count, setCount] = useState(0);
    const [timer, setTimer] = useState(0);
    const [running, setRunning] = useState(false)
    const [id, setId] = useState(null)
    function handleChange(event){
        const input=event.target.value;
        if(input=="")
            setCount(0);
        else if(!isNaN(input)){
            setCount(parseInt(input))
        }
    }

    function check(i){
        if(i<10)
            return "0"+i;
        return i;
    }

    useEffect(()=>{
        setTimer(count*1000)
    },[count])

    useEffect(()=>{
        if(running)
            startRun(id)
        else
            stopRun(id)
    },[running])

    function startRun(id){
        console.log("start timer")
        id = setInterval(()=>{
            setTimer((timer)=>{
                if(timer==0){
                    clearInterval(id);
                    return 0;
                }
                return timer-10;
            })
        },10)
        console.log(id)
    }

    function stopRun(id){
        console.log(id)
        clearInterval(id);
        setCount(timer/1000);
    }

    function handleReset(){
        setCount(0)
    }

    function getHours(timer){
        return Math.floor(timer/3600/1000);
    }

    function getMinutes(timer){
        timer=(timer/1000)%3600;
        return Math.floor(timer/60);
    }

    function getSeconds(timer){
        timer=(timer/1000);
        return Math.floor(timer)%60;
    }

    function getMilliseconds(timer){
        return Math.floor((timer%1000)/10);
    }

    return(
        <div className="timer-class">
            <div className="timer-display-class">
                <div className="countdown-timer-class">
                    {check(getHours(timer))}:{check(getMinutes(timer))}:{check(getSeconds(timer))}:{check(getMilliseconds(timer))}
                </div>
                <div className="count-class">
                    <input 
                        type="text" 
                        value={count} 
                        className="input-class" 
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="button-class">
                <button className="play-class" onClick={()=>setRunning(run=>!run)}
                    >
                    <FontAwesomeIcon icon={faPlay} />
                </button>
                <button className="reset-class" onClick={handleReset}>
                    <FontAwesomeIcon icon={faSyncAlt} />
                </button>
            </div>
        </div>
    )
}

export default Timer;