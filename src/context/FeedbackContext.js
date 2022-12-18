import { createContext, useState, useEffect } from 'react';

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
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  // add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback),
    })
    const data = await response.json()
    setFeedback([data, ...feedback])
  }

  // delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure ?'))
    {
      const response = await fetch(`/feedback/${id}`, { method: 'DELETE' })
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Update feedback item
  const updateFeedback = async (id, upItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(upItem) })
    const data = await response.json()
    setFeedback(feedback.map((item) => (item.id === id ? {...item, ...data} : item))
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