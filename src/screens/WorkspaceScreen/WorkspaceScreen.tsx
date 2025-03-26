import { useEffect, useState } from 'react'
import { BoardType } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { getUserBoards } from '../../firebase/getUserBoards';
import { useNavigate } from 'react-router-dom';
import './WorkSpaceScreen.css'

import { getBoardBackground } from '../../styles/colors';

import CreateMenu from '../../components/CreateMenu/CreateMenu'
import { FaTrello } from "react-icons/fa";
import { getMemberBoards } from '../../firebase/getMemberBoards';
import Header from '../../components/Header/Header';

const WorkspaceScreen = () => {
  const { user, loading } = useAuth();
  const [boards, setBoards] = useState<BoardType[]>([]);
  const navigate = useNavigate();
  const [hoveredBoard, setHoveredBoard] = useState<string | null>(null);
  const [memberBoards, setMemberBoards] = useState<BoardType[]>([]);
  const [isCreateMenuVisisble, setIsCreateMenuVisible] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate('/login');
      return;
    }
    const fetchBoards = async () => {
      if (user) {
        const userBoards = await getUserBoards(user);
        setBoards(userBoards);
      }
    };
    fetchBoards();

  }, [user, loading, boards]);


  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMemberBoards = async () => {
      if (user) {
        const userMemberBoards = await getMemberBoards(user);
        setMemberBoards(userMemberBoards);
      }

    };
    fetchMemberBoards();
  }, [user, loading, memberBoards]);


  const toggleOverlay = () => {
    setIsCreateMenuVisible(prevState => !prevState);
  }

  const handleBoardClick = (board: BoardType) => {
    navigate(`/board/${board.id}`), { state: { board } };
  }
  return (
    <>
      <Header />
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
                    <CreateMenu closeCreateOverlay={toggleOverlay} 
                    />
                  </div>
                )}
            </div>
          </div>
          {memberBoards.length > 0 ? (
            <>
              <h3 className='titleGray'>Workspaces you are member in</h3>
              <div>
                {memberBoards.map((board) => (
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
            </>
          ) : (
            <p></p>
          )}
        </div>
      </div >
    </>
  )
}

export default WorkspaceScreen