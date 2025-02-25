
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Header from './components/Header/Header'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import BoardScreen from './screens/BoardScreen/BoardScreen'
function App() {


  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/createboard" element={<BoardScreen />} />
      </Routes>
    </HashRouter>
  )
}

export default App
