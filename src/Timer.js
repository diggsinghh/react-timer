import React, { useState, useEffect } from "react"
import './Timer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faSyncAlt, faStop } from '@fortawesome/free-solid-svg-icons'

var id=null;

function Timer(){
    const [count, setCount] = useState(0);
    const [timer, setTimer] = useState(0);
    const [running, setRunning] = useState(false)

    function handleChange(event){
        const input=event.target.value;
        if(input=="")
            setCount(0);
        else if(!isNaN(input)){
            setCount(parseInt(input))
        }
    }

    useEffect(()=>{
        setTimer(count*1000)
    },[count])

    useEffect(()=>{
        if(running)
            startRun()
        else
            stopRun()
    },[running])

    function startRun(){
        id = setInterval(()=>{
            setTimer((timer)=>{
                if(timer==0){
                    setRunning(false)
                    clearInterval(id);
                    return 0;
                }
                return timer-10;
            })
        },10)
        return id;
    }

    function stopRun(){
        clearInterval(id);
        setCount(timer/1000);
    }

    function handleReset(){
        setCount(0)
    }

    return(
        <div className="timer-class">
            <div className="timer-display-class">
                {!running ?
                <div>
                    <div className="countdown-timer-notrunning-class">
                        {check(getHours(timer))}:{check(getMinutes(timer))}:{check(getSeconds(timer))}:{check(getMilliseconds(timer))}
                    </div>
                    <div className="count-class">
                        <input 
                            type="text" 
                            value={Math.floor(count)} 
                            className="input-class" 
                            onChange={handleChange}
                        />
                    </div>
                </div>
                :
                <div 
                    className="countdown-timer-running-class" 
                    style={{color:  timer<=10000 ? "#ff3333" : "#17a2b8" }}
                >
                    {check(getHours(timer))}:{check(getMinutes(timer))}:{check(getSeconds(timer))}:{check(getMilliseconds(timer))}
                </div>
                }
            </div>
            <div className="button-class">
                { !running?
                <button className="play-class" onClick={()=>{if(count!=0)setRunning(true)}}
                    >
                    <FontAwesomeIcon icon={faPlay} />
                </button>
                :
                <button className="stop-class" onClick={()=>setRunning(false)}>
                    <FontAwesomeIcon icon={faStop} />
                </button>
                }
                <button className="reset-class" onClick={handleReset}>
                    <FontAwesomeIcon icon={faSyncAlt} />
                </button>
            </div>
        </div>
    )

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

    function check(i){
        if(i<10)
            return "0"+i;
        return i;
    }
}

export default Timer;