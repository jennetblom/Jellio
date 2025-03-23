
import './BoardScreen.css'

import Board from '../../components/Board/Board'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BoardType } from '../../types';
import { getBoardById } from '../../firebase/getBoardById';
import { boardColors, getBoardBackground } from '../../styles/colors';
const BoardScreen = () => {
  const { id } = useParams();
  const [board, setBoard] = useState<BoardType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const defaultValue = "linear-gradient(340deg, rgb(0, 242, 255), rgba(1, 88, 89, 0.943));"
  useEffect(() => {
    if (!id) return;

    const fetchBoard = async () => {
      try {
        const boardData = await getBoardById(id);
        setBoard(boardData);
      } catch (error) {
        console.log("Error fetching board", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBoard();
  }, [id])
  

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!board) {
    return <div>No board found</div>;
  }
  return (
    <div className='board-background' style={{background: board?.color && boardColors[board.color] ? boardColors[board.color].default : defaultValue}}>
      <div className='menu'  style={{background: board?.color && boardColors[board.color] ? boardColors[board.color].header : defaultValue}}>
        <button className='menuButton'>Share</button>
      </div>
      <Board board={board} setBoard={setBoard} />
    </div>
  )
}

export default BoardScreen