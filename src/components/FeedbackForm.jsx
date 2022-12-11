import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContex from '../context/FeedbackContext'



function FeedbackForm() {
  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContex)
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if(feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChanged = (e) => {
    setText(e.target.value)
    if(e.target.value === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if(e.target.value !== '' && e.target.value.trim().length < 10) {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(text.trim().length > 10) {
      const newFeedback = {
        text,
        rating
      }

      if(feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }
      
      setText('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate the service with us</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input onChange={handleTextChanged} value={text} type="text" placeholder='Write a review' />
          <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>

        {message && <div className='message'>{message}</div> }
      </form>
    </Card>
  )
}

export default FeedbackForm