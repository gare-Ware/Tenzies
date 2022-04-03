import React from "react"
import {nanoid} from "nanoid"

export default function Die(props) {
    
    function dotGenerator(num) {
        let dots = []
        for(let i=0; i<[num]; i++){
            dots.push(<div key={nanoid()} className='dot'></div>)
        }
        return dots
    }
    
    const styles = {
        backgroundColor: props.isHeld ? "var(--die-color-held)" : "var(--die-color)"
    }
    
    let dieHtml

    if(props.value === 1){
        dieHtml =     
            <div className='die-face one'>
                {dotGenerator(1)}
            </div>
    }
    if(props.value === 2){
        dieHtml =     
            <div className='die-face two'>
                {dotGenerator(2)}
            </div>
    }
    if(props.value === 3){
        dieHtml =     
            <div className='die-face three'>
                {dotGenerator(3)}
            </div>
    }
    if(props.value === 4){
        dieHtml =     
            <div className='die-face'>
                <div className='dot-container'>
                    {dotGenerator(2)}
                </div>
                <div className='dot-container'>
                    {dotGenerator(2)}
                </div>
            </div>
    }
    if(props.value === 5){
        dieHtml =     
            <div className='die-face'>
                <div className='dot-container'>
                    {dotGenerator(2)}
                </div>
                {dotGenerator(1)}
                <div className='dot-container'>
                    {dotGenerator(2)}
                </div>
            </div>
    }
    if(props.value === 6){
        dieHtml =     
            <div className='die-face'>
                <div className='dot-container'>
                    {dotGenerator(3)}
                </div>
                <div className='dot-container'>
                    {dotGenerator(3)}
                </div>
            </div>
    }
    
    return (
        <div  
            className='die-container'
            style={styles}
            onClick={props.holdDice}
        >
            {dieHtml}
        </div>
    )
}