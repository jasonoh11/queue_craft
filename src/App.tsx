import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Home from './Home';
import Callback from "./Callback";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </>
  )
}



export default App
