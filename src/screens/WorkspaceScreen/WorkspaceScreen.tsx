import { useEffect, useState } from 'react'
import { BoardType } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { getUserBoards } from '../../firebase/getUserBoards';
import { useNavigate } from 'react-router-dom';
import './WorkSpaceScreen.css'

import { getBoardBackground } from '../../styles/colors';

import CreateMenu from '../../components/CreateMenu/CreateMenu'
import { FaTrello } from "react-icons/fa";

const WorkspaceScreen = () => {
  const { user, loading } = useAuth();
  const [boards, setBoards] = useState<BoardType[]>([]);
  const navigate = useNavigate();
  const [hoveredBoard, setHoveredBoard] = useState<string | null>(null);

  const [isCreateMenuVisisble, setIsCreateMenuVisible] = useState(false);
  useEffect(() => {
    const fetchBoards = async () => {
      if (user) {
        const userBoards = await getUserBoards(user);
        setBoards(userBoards);
      }

    };

    if (loading) return;

    if (!user) {
      navigate('/login');
      return;
    }
    fetchBoards();

  }, [user, loading, boards]);

  const toggleOverlay = () => {
    setIsCreateMenuVisible(prevState => !prevState);
  }
  const handleBoardClick = (board: BoardType) => {
    navigate(`/board/${board.id}`), { state: { board } };
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

          <div className='toggleCreateContainer'>
            <div className='toggleCreate' onClick={toggleOverlay}>
              <FaTrello size={20} />
              <p>Create new board</p>
            </div>
            {isCreateMenuVisisble &&
              (
                <div className='createMenuWrapper'>
                  <CreateMenu closeCreateOverlay={toggleOverlay} />
                </div>
              )}
          </div>
        </div>
      </div>
    </div >
  )
}

export default WorkspaceScreen