import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
function App() {
  return (
    <Router>
      
      <Routes>
        <Route exact path="/" element={<Home />} > </Route>
        <Route exact path="/about" element={<About />} > </Route>
      </Routes>    
    </Router>
  )
}

export default App;
