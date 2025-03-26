import React, { createContext, useContext, useEffect, useState } from 'react';
import { listenToBoards } from '../firebase/fetchData/listenToBoards';
import { BoardType } from '../types';

const BoardContext = createContext<{ boards: BoardType[], boardsLoading: boolean }>({
    boards: [],
    boardsLoading: true
});

export const BoardProvider = ({ user, children }: { user: any, children: React.ReactNode }) => {
    const [boards, setBoards] = useState<BoardType[]>([]);
    const [boardsLoading, setBoardsLoading] = useState(true);

    useEffect(() => {
        if (!user?.userId) return;

        const unsubscribe = listenToBoards(user.userId, (boards) => {
            setBoards(boards);
            setBoardsLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    return (
        <BoardContext.Provider value={{ boards, boardsLoading }}>
            {children}
        </BoardContext.Provider>
    );
};

export const useBoards = () => useContext(BoardContext);