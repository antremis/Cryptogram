import { useRef, useState } from 'react'
import './InputButton.css'

const InputButton = ({placeholder, name}) => {
    const ref = useRef()
    const [text, setText] = useState('')

    const handleFocus = (val) => {
        if(text) return
        ref.current.setAttribute('data-label-focused', val)
    }

    return(
        <div className="input-wrapper">
            <input type='text' name ={name} data-input onFocus={() => {handleFocus(true)}} onChange={e=>setText(e.target.value)} onBlur={() => {handleFocus(false)}} ></input>
            <span data-label-focused={false} ref={ref}>{placeholder}</span>
        </div>
    )
}

export default InputButton