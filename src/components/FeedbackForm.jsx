import { useState } from 'react'
import Card from './shared/Card'

function FeedbackForm() {
  const [text, setText] = useState('')

  const handleTextChanged = (e) => {
    setText(e.target.value)
  }

  return (
    <Card>
      <form>
        <h2>How would you rate the service with us</h2>
        <div className="input-group">
          <input onChange={handleTextChanged} value={text} type="text" placeholder='Write a review' />
          <button type="submit">Send</button>
        </div>
      </form>
    </Card>
  )
}

export default FeedbackForm