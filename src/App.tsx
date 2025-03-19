
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Header from './components/Header/Header'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import BoardScreen from './screens/BoardScreen/BoardScreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import WorkspaceScreen from './screens/WorkspaceScreen/WorkspaceScreen'
import JellioGardenScreen from './screens/JellioGardenScreen/JellioGardenScreen'
function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path='/workspaces' element={<WorkspaceScreen />} />
        <Route path="/board/:id" element={<BoardScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/jelliogarden" element={<JellioGardenScreen />} />
      </Routes>
    </HashRouter>
  )
}

export default App
