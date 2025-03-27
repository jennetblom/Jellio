
import './BoardScreen.css'

import Board from '../../components/Board/Board'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BoardType } from '../../types';
import { getBoardById } from '../../firebase/fetchData/getBoardById';
import { boardColors } from '../../styles/colors';
import ShareModal from '../../components/ShareModal/ShareModal';
import { useLocation } from "react-router-dom";
import { FaTrello } from "react-icons/fa";
import Header from '../../components/Header/Header';
import { capitalize } from '../../functions/capitalizeFirstLetter';
import Sidebar from '../../components/Sidebar/Sidebar';
const BoardScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const [board, setBoard] = useState<BoardType | null>(location.state?.board || null);
  const [loading, setLoading] = useState<boolean>(!board);
  const defaultValue = "linear-gradient(340deg, rgb(0, 242, 255), rgba(1, 88, 89, 0.943));"
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (board || !id) return;


    const fetchBoard = async () => {
    
      try {
        console.log("Hej");
        const boardData = await getBoardById(id);
        setBoard(boardData);
      } catch (error) {
        console.log("Error fetching board", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBoard();
  }, [id, board]);


  
  useEffect(() => {
    setBoard(location.state?.board); 
}, [location.state, id]); 

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!board) {
    return <div>No board found</div>;
  }


  return (
    <div className='boardPage'>
      <Sidebar boardColor={board.color} />
      <Header backgroundColor={board.color}/>
      <div className='board-background' style={{ background: board?.color && boardColors[board.color] ? boardColors[board.color].default : defaultValue }}>
        <div className='menu' style={{ background: board?.color && boardColors[board.color] ? boardColors[board.color].menu : defaultValue }}>
          <p className="workspace-title"> <FaTrello size={25} id='trelloIcon' /> {capitalize(board.title)} </p>
          <div className='usernameAndShareContainer'>
            <p className="workspace-title"></p>
            <div>
              <button className='menuButton' onClick={() => setIsModalOpen(true)}>Share link</button>
              <ShareModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} board={board} />
            </div>
          </div>
        </div>
        <Board board={board} />
      </div>
    </div>
  )
}

export default BoardScreen