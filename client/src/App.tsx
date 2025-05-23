import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Requests from './components/Requests'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/tubs/:encoded_id" element={<Requests />}/>
      </Routes>
    </Router>
  )
}

export default App
