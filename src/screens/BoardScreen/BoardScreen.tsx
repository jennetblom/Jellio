import React from 'react'
import './BoardScreen.css'
import JellyCard from '../../components/JellyCard/JellyCard'
import Board from '../../components/Board/Board'

const BoardScreen = () => {
  return (
    <div className='board-background'>
      <Board />
    </div>
  )
}

export default BoardScreen