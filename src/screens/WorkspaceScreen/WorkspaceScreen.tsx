import { useEffect, useState } from 'react'
import { BoardType } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { getUserBoards } from '../../firebase/getUserBoards';
import { useNavigate } from 'react-router-dom';
import './WorkSpaceScreen.css'
import { createBoardInDb } from '../../firebase/createBoardInDb';
import { boardColors, getBoardBackground } from '../../styles/colors';
import { IoIosCheckmark } from "react-icons/io";
const WorkspaceScreen = () => {
  const { user, loading } = useAuth();
  const [boards, setBoards] = useState<BoardType[]>([]);
  const navigate = useNavigate();
  const [boardTitle, setBoardTitle] = useState('');
  const [boardColor, setBoardColor] = useState('');
  const [hoveredBoard, setHoveredBoard] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBoards = async () => {
      if (user) {
        const userBoards = await getUserBoards(user);
        setBoards(userBoards);
      }

    };

    if(loading) return;

    if (!user)  {
      navigate('/login');
      return;
    }
    fetchBoards();

  }, [user, loading]);


  const handleBoardClick = (board: BoardType) => {
    navigate(`/board/${board.id}`), {state: {board}};
  }
  const addBoard = async () => {
    console.log(boardTitle, boardColor);
    if (boardTitle === '' || boardColor === '') return;
    if (!user) return;
    if(!user.username) return;
    await createBoardInDb(user.uid, user.username, boardTitle, boardColor);
    const userBoards = await getUserBoards(user);
    setBoards(userBoards);
    setBoardTitle('');
    setBoardColor('');
  }
  const handleHover = (e: React.MouseEvent<HTMLDivElement>, color: string, isHovering: boolean)=> {
    e.currentTarget.style.background = isHovering ? 
    boardColors[color]?.hover || color :
    boardColors[color]?.default || color;
  }
  return (
    <div className='workSpaceContainer'>
      <div className='workSpaceCard'>
        <h3 className='titleGray'>Your Workspaces</h3>
        <div className='boardShowContainer'>
          {boards.map((board) => (
            <div key={board.id} className='boardShow'
              onClick={() => handleBoardClick(board)}
              onMouseEnter={() => setHoveredBoard(board.id)}
              onMouseLeave={() => setHoveredBoard(null)}
              style={{ background: getBoardBackground(board.color, hoveredBoard === board.id) }}>
              <div className='boardTextOpacityContainer'>
                <p className='boardText'>{board.title}</p>
              </div>
            </div>
          ))}

        </div>

        <div className='createBoard'>
          <p>Create a new board</p>
          <input
            className='createInput'
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            placeholder='Enter the name of your board...'
          />
          <p>Choose a background</p>
          <div className='colorSelect'>
          {Object.keys(boardColors).map((colorKey) => (
            <div
            className='selectColor' 
            key={colorKey}
            style={{background: boardColors[colorKey].default}}
            onMouseEnter={(e) => handleHover(e, colorKey, true)}
            onMouseLeave={(e) => handleHover(e, colorKey, false)}
            onClick={() => setBoardColor(colorKey)}
            >
              {
                boardColor === colorKey ?
                <p className='selectedBoardColor'><IoIosCheckmark size={30}/></p> : 
                <p></p>
              }
            
            </div>
          ))}
          </div>
          <button className='createBtn' onClick={addBoard}>Create</button>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceScreen