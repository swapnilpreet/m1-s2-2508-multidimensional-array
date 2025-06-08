import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import FeedbackForm from './components/FeedbackForm'
import { FeedbackProvider } from './context/FeedbackContext'
import Summary from './components/Summary'

function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </Router>
    </FeedbackProvider>
  )
}

export default App
