
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Header from './components/Header/Header'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import BoardScreen from './screens/BoardScreen/BoardScreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import WorkspaceScreen from './screens/WorkspaceScreen/WorkspaceScreen'
import SignUpScreen from './screens/SignUpScreen/SignUpScreen'
import { useAuth } from './context/AuthContext'
import { useEffect } from 'react'
import BoardInvitation from './screens/BoardInvitation/BoardInvitation'

function App() {
  const {user} = useAuth();

  useEffect(() => {
    console.log("user", user);
  })
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path='/workspaces' element={<WorkspaceScreen />} />
        <Route path="/board/:id" element={<BoardScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/board/:boardId/invite" element={<BoardInvitation />} />
      </Routes>
    </HashRouter>
  )
}

export default App
