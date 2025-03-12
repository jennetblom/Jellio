import { useEffect, useState } from 'react'
import { List } from "../../types";
import Board from '../../components/Board/Board';
import { useAuth } from "../../context/AuthContext";
import { getUserBoards } from '../../firebase/fetchBoards';
type Board = {
  id: string;
  title: string;
  color: string;
  lists: List[];
}
const WorkspaceScreen = () => {
  const { user, loading } = useAuth();
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userBoards = await getUserBoards();
      setBoards(userBoards);
    }
    if (!loading) {
      fetchData();
    }

  }, [user, loading]);
  return (
    <div>{boards.map((board) => (
      <Board key={board.id} board={board}></Board>
    ))}</div>
  )
}

export default WorkspaceScreen