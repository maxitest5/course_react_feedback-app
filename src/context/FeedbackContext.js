import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'

const FeedbackContex = createContext()

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  useEffect(() => {
    fectchFeedback()
  }, [])

  // Fectch feedback
  const fectchFeedback = async () => {
    const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  // add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  // delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure ?'))
    {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Update feedback item
  const updateFeedback = (id, upItem) => {
    setFeedback(feedback.map((item) => (item.id === id ? {...item, ...upItem} : item))
    )
  }

  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  return <FeedbackContex.Provider value={{
    feedback, // equivalent of feedback: feedback
    feedbackEdit,
    isLoading,
    addFeedback,
    deleteFeedback,
    updateFeedback,
    editFeedback,
  }}>
    {children}
  </FeedbackContex.Provider>
}

export default FeedbackContex