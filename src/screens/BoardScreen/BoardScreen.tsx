
import './BoardScreen.css'

import Board from '../../components/Board/Board'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BoardType } from '../../types';
import { getBoardById } from '../../firebase/getBoardById';

const BoardScreen = () => {
  const { id } = useParams();
  const [board, setBoard] = useState<BoardType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    <div className='board-background'>
      <Board board={board} setBoard={setBoard} />
    </div>
  )
}

export default BoardScreen