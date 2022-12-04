import { createContext, useState } from 'react';

const FeedbackContex = createContext()

export const FeedbackProvider = ({children}) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      rating: 10,
      text: 'V2Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
    }
  ])

  return <FeedbackContex.Provider value={{
    feedback, // equivalent of feedback: feedback
  }}>
    {children}
  </FeedbackContex.Provider>
}

export default FeedbackContex