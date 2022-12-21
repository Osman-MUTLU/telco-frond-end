import React from 'react'
import { getQuestionsData } from '../Utils/Common'

function Result() {
  const questions = getQuestionsData()
  return (
    <div>{questions[0]?.questionText}</div>
  )
}

export default Result