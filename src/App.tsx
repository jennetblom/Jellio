
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Header from './components/Header/Header'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import BoardScreen from './screens/BoardScreen/BoardScreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import WorkspaceScreen from './screens/WorkspaceScreen/WorkspaceScreen'

function App() {


  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path='/workspaces' element={<WorkspaceScreen />} />
        <Route path="/createboard" element={<BoardScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </HashRouter>
  )
}

export default App
