import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { FaTrello, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getUserBoards } from '../../firebase/fetchData/getUserBoards';
import { useAuth } from '../../context/AuthContext';
import { BoardType } from '../../types';
import { boardColors, getBoardBackground } from '../../styles/colors';
import JellyFish from '../../../src/assets/images/jellyfishImage.png'
import { useNavigate } from 'react-router-dom';
import { listenToBoards } from '../../firebase/fetchData/listenToBoards';
import { useBoards } from '../../context/BoardContext';

const Sidebar = () => {

    const { boards, boardsLoading } = useBoards();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const defaultValue = "linear-gradient(340deg, rgb(0, 242, 255), rgba(1, 88, 89, 0.943));"
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

 /* useEffect(() => {
    if (!user?.userId) { return; }
    const unsubscribe = listenToBoards(user.userId, setBoards);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }

    };
  }, [user]);
  
 */if (boardsLoading) return <p>Loading boards...</p>;
    const handleBoardClick = (board: BoardType) => {
        console.log("Navigating to:", `/board/${board.id}`);
        navigate(`/board/${board.id}`, { state: { board } }); 
      }

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                {
                    isCollapsed ? (
                        <>
                            <button className="sidebar-toggle" onClick={toggleSidebar}>
                                <FaChevronRight />
                            </button>
                            <p></p>
                        </>
                    ) : (
                        <>
                            <div className='groupSidebar'>
                                <img src={user?.profilePic ?? JellyFish} className='sidebar-profilePic' />
                                <p>{user?.username}'s Workspace</p>
                            </div>
                            <button className="sidebar-toggle" onClick={toggleSidebar}>
                                <FaChevronLeft />
                            </button>
                        </>
                    )
                }
            </div>
            {isCollapsed ? (
                <></>
            ) :
                (
                    <div className="sidebar-content">
                        <div className='side-barTitle'>Your boards</div>
                        {boards.map((board) => (
                            <div className="sidebar-item" 
                            onClick={() => handleBoardClick(board)}
                            >
                                <div className='sidebar-boardItem' style={{ background: board?.color && boardColors[board.color] ? boardColors[board.color].default : defaultValue }}>  </div>
                                {board.title}
                            </div>
                        ))
                        }
                    </div>
                )}
        </div>

    );
}

export default Sidebar