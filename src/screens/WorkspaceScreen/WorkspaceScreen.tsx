import { useEffect, useState } from 'react'
import { BoardType } from "../../types";
import Board from '../../components/Board/Board';
import { useAuth } from "../../context/AuthContext";
import { getUserBoards } from '../../firebase/getUserBoards';
import { useNavigate } from 'react-router-dom';
import './WorkSpaceScreen.css'
import { createBoard } from '../../firebase/createBoard';

const WorkspaceScreen = () => {
  const { user, loading } = useAuth();
  const [boards, setBoards] = useState<BoardType[]>([]);
  const navigate = useNavigate();
  const [boardTitle, setBoardTitle] = useState('');
  useEffect(() => {
    const fetchBoards = async () => {
      if (user) {
        const userBoards = await getUserBoards(user);
        setBoards(userBoards);
      }

    };
    if (!loading) {
      fetchBoards();
    }

  }, [user, loading]);

  const handleBoardClick = (boardId: string) => {
    navigate(`/board/${boardId}`);
  }
  const addBoard = async () => {
    if(boardTitle==='') return;
    if(!user) return;
    await createBoard(user.uid, boardTitle);
    const userBoards = await getUserBoards(user);
    setBoards(userBoards);
  }
  return (
    <div className='workSpaceContainer'>
      <div className='workSpaceCard'>
        <h3 className='titleGray'>Senast visade:</h3>
        {boards.map((board) => (
          <div key={board.id} onClick={() => handleBoardClick(board.id)}>
            <Board board={board} setBoard={setBoards} />
          </div>
        ))}
        <h3 className='titleGray'>Dina arbetsytor:</h3>
        {boards.map((board) => (
          <div key={board.id} onClick={() => handleBoardClick(board.id)}>
            <Board board={board} setBoard={setBoards} />
          </div>
        ))}
        <div className='createBoard'>
          <p>Skapa en ny tavla</p>
          <input
          className='createInput' 
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          placeholder='Skriv in namnet på tavlan...'
          />
          <button className='createBtn' onClick={addBoard}>Skapa</button>
          </div>
      </div>
    </div>

/* <div className='workSpaceContainer'>
<div className='workSpaceCard'>
  <h3 className='titleGray'>Senast visade:</h3>
  {boards.map((board) => (
    <div key={board.id} onClick={() => handleBoardClick(board.id)}>
      <Board board={board} setBoard={setBoards} />
    </div>
  ))}
  <h3 className='titleGray'>Dina arbetsytor:</h3>
  {boards.map((board) => (
    <div key={board.id} onClick={() => handleBoardClick(board.id)}>
      <Board board={board} setBoard={setBoards} />
    </div>
  ))}
  <div className='createBoard'>
    <p>Skapa en ny tavla</p>
    <input
    className='createInput' 
    value={boardTitle}
    onChange={(e) => setBoardTitle(e.target.value)}
    placeholder='Skriv in namnet på tavlan...'
    />
    <button className='createBtn' onClick={addBoard}>Skapa</button>
    </div>
</div>
</div> */
  )
}

export default WorkspaceScreen