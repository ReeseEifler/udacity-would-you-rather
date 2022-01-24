import React, { useState } from 'react'
import { handleAddQuestion } from '../actions/questions'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

function NewQuestion (props) {
  const [optionOneText, setOptionOneText] = useState('')
  const [optionTwoText, setOptionTwoText] = useState('')
  const [toHome, setToHome] = useState(false)
  
  function handleChangeOptionOne (e) {
    const text = e.target.value
    setOptionOneText(text)
  }
  
  function handleChangeOptionTwo (e) {
    const text = e.target.value
    setOptionTwoText(text)
  }
  
  function handleSubmit (e) {
    e.preventDefault()
    console.log('toHome is ', toHome)
    if (!optionOneText || !optionTwoText) {
      alert('You must enter into both option fields in order to create a question.')
      return
    }
    props.dispatch(handleAddQuestion(optionOneText, optionTwoText))
    setToHome(true)
  }
  
  if (toHome) return <Navigate to='/'/>
  
  return (
    <div className='container box'>
      <div className='center new-question'>
        Create New Question
      </div>
    <div className='container box'>
      <div className='name-text'>Complete the question</div>
        <div className='w-y-r'>Would you rather...</div>
        <input type='text' placeholder='Enter Option One Text Here' onChange={handleChangeOptionOne}/>
        <div className='or-line-container'>
          <hr className='new-or-line'/>
          <div className='new-or center'>OR</div>
          <hr className='new-or-line'/>
        </div>
        <input type='text' placeholder='Enter Option One Text Here' onChange={handleChangeOptionTwo}/>
        <div className='button-container'>
          <button className='submit-button' onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default connect()(NewQuestion)