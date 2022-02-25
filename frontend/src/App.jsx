import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import './App.css'
import Home from "./components/Home"
import Join from "./components/Join"

function App() {

  return (
    <div className="bg-gray-300 h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/join" element={<Join/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
