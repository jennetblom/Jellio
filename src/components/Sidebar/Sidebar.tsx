import  {  useEffect, useState } from 'react'
import './Sidebar.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { BoardType } from '../../types';
import { boardColors} from '../../styles/colors';
import JellyFish from '../../../src/assets/images/jellyfishImage.png'
import { useNavigate } from 'react-router-dom';
import { useBoards } from '../../context/BoardContext';
import { getMemberBoards } from '../../firebase/fetchData/getMemberBoards';

type SidebarProps = {
    boardColor: string;
}
const Sidebar = ({boardColor} : SidebarProps) => {

    const { boards, boardsLoading } = useBoards();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [memberBoards, setMemberBoards] = useState<BoardType[]>([]);
    const defaultValue = "linear-gradient(340deg, rgb(0, 242, 255), rgba(1, 88, 89, 0.943));"

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
      }, [user, loading]);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };


    if (boardsLoading) return <p>Loading boards...</p>;
    const handleBoardClick = (board: BoardType) => {
        console.log("Navigating to:", `/board/${board.id}`);
        navigate(`/board/${board.id}`, { state: { board } });
    }


    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} style={{ background: boardColor && boardColors[boardColor] ? boardColors[boardColor].sidebar : defaultValue }}>
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
                    <div className="sidebar-content" style={{ background: boardColor && boardColors[boardColor] ? boardColors[boardColor].menu : defaultValue }}>
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
                         <div className='side-barTitle'>Other workspaces</div>
                        {memberBoards.map((board) => (
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