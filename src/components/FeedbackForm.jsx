import { useState } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'

function FeedbackForm() {
  const [text, setText] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const handleTextChanged = (e) => {
    if(text == '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if(text !== '' && text.trim().length <= 10) {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(e.target.value)
  }

  return (
    <Card>
      <form>
        <h2>How would you rate the service with us</h2>
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