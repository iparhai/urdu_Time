import React, { useEffect } from 'react'
import clockBase from '../assets/base.svg'
import minuteHandle from '../assets/minute.svg'
import hourHandle from '../assets/hour.svg'
import HB from '../assets/HB.svg'
import MB from '../assets/MB.svg'


import rubix from '../assets/rubix.png'
import { useState } from 'react'
import './Time.css'
export default function Time(props) {

    const [minuteDegree, setMinuteDegree] = useState(0)
    const [hourDegree, setHourDegree] = useState(0)
    const [offset, setOffset] = useState(30) //degree
    const [answer, setAnswer] = useState({
        hour: 0,
        minute: 0
    })
    const clockStyle = {
        minuteRotate: {
            transform: "rotate(" + minuteDegree + "deg)"
        },
        hourRotate: {
            transform: "rotate(" + hourDegree + "deg)"
        },
    }
    useEffect(() => {
        setAnswer({ ...answer, minute: minuteDegree / 6 })
    }, [minuteDegree])

    useEffect(() => {
        if (hourDegree == 0) {
            setAnswer({ ...answer, hour: 12 })
        }
        else
            setAnswer({ ...answer, hour: hourDegree / 30 })
    }, [hourDegree])



    return (
        <div style={{ display: "flex" , marginLeft : "18vh"}}>
            <div style={{ position: "relative", marginTop: "32vh" }} >
                <img src={HB} className="HB" style={clockStyle.hourRotate} onClick={() => {
                    if (hourDegree + offset == 360)
                        setHourDegree(0)
                    else
                        setHourDegree(hourDegree + offset)
                }} />
                <img src={MB} className="MB" style={clockStyle.minuteRotate} onClick={() => {
                    if (minuteDegree + offset == 360)
                        setMinuteDegree(0)
                    else
                        setMinuteDegree(minuteDegree + offset)
                }} />
                <img src={minuteHandle} className="minute" style={clockStyle.minuteRotate} />
                <img src={hourHandle} className="hour" style={clockStyle.hourRotate} />
                <img src={clockBase} className="baseClock" />
            </div>
            <div>
                <button className="glow-on-hover  bttn" type="button" style={{ marginTop: "46vh", marginLeft: "3vw" }} onClick={() => {
                    if (parseInt(answer.hour) == parseInt(props.correctAnswer.hour) && parseInt(answer.minute) == parseInt(props.correctAnswer.minute)) {
                        props.submit(true, answer.hour + ":"+ answer.minute)
                    }
                    else {
                        props.submit(false, answer.hour + ":"+ answer.minute)
                    }
                }} > <i className="fa fa-paper-plane fa-3x" /></button>
            </div>
        </div>
    )
}
