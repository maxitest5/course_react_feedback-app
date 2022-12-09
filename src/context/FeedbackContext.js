import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'

const FeedbackContex = createContext()

export const FeedbackProvider = ({children}) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      rating: 10,
      text: 'V2Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
    }
  ])

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure ?'))
    {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }
  return <FeedbackContex.Provider value={{
    feedback, // equivalent of feedback: feedback
    deleteFeedback,
    addFeedback,
  }}>
    {children}
  </FeedbackContex.Provider>
}

export default FeedbackContex