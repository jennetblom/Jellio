import { useEffect, useState } from 'react'
import './BoardInvitation.css'
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoardById } from '../../firebase/getBoardById';
import { addUserToBoard } from '../../firebase/addUserToBoard';

const BoardInvitation = () => {
    const { user, loading } = useAuth();
    const { boardId } = useParams<{ boardId: string }>();
    const navigate = useNavigate();
    const [board, setBoard] = useState<any>(null);
    const [boardLoading, setBoardLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        const fetchBoard = async () => {
            if (boardId) {
                const fetchedBoard = await getBoardById(boardId);
                setBoard(fetchedBoard);
                setBoardLoading(false);
            } else {
                setBoardLoading(false);
            }
        };
        fetchBoard();
    }, [boardId, user]);

    useEffect(() => {
        console.log("addUser before", board, user);

        if (loading || boardLoading) {
            console.log("still loading user data...");
            return;
        }
        if (!user) {
            console.log("navigate login");
            navigate("/login");
        }
        const addUser = async () => {
            console.log("running addUser");
            if (board && user) {
                try {
                    if (user.uid === board.userId) {
                        console.log("You are the owner of the board. No need to add as a member");
                        navigate(`/board/${boardId}`);
                        return;
                    }
                    await addUserToBoard(board.id, user.uid);
                    console.log("User successfully added as a member");
                    navigate(`/board/${boardId}`);
                } catch (error) {
                    console.log("Error adding user to board:", error);
                }
            }
        }
        addUser();
    }, [user, board, navigate, boardId, boardLoading, loading]);


    if (boardLoading) {
        return <div>Loading board...</div>;
    }
    return (
        <div className='board-inviteContainer'>
            <div className='inviteFlexContent'>
                <h3 style={{ margin: '0' }}>Invited to board {board?.title}</h3>
                {user ? (
                    <p>You have been added to the board</p>
                ) : (
                    <>
                        <p>Please log in to accept the invitation</p>
                        <button className='goToLoginBtn' onClick={() => navigate("/login")}>Go to login</button>
                    </>

                )}
            </div>

        </div>
    )
}

export default BoardInvitation