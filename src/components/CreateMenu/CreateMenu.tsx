import React, { useEffect, useRef, useState } from 'react'
import './CreateMenu.css'
import { boardColors } from '../../styles/colors';
import { IoIosCheckmark } from "react-icons/io";
import { useAuth } from '../../context/AuthContext';
import { createBoardInDb } from '../../firebase/addData/createBoardInDb';
import { RxCross1 } from "react-icons/rx";

interface CreateMenuProps {
    closeCreateOverlay: () => void;

}


const CreateMenu: React.FC<CreateMenuProps> = ({ closeCreateOverlay }) => {
    const [boardTitle, setBoardTitle] = useState('');
    const [boardColor, setBoardColor] = useState('');
/*     const [boards, setBoards] = useState<BoardType[]>([]); */
    const { user } = useAuth();
    const [error, setError] = useState("");

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeCreateOverlay();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    })

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleClose = () => {
        closeCreateOverlay();
    }

    const handleHover = (e: React.MouseEvent<HTMLDivElement>, color: string, isHovering: boolean) => {
        e.currentTarget.style.background = isHovering ?
            boardColors[color]?.hover || color :
            boardColors[color]?.default || color;
    }
    const addBoard = async () => {
        console.log(boardTitle, boardColor);

        if (boardTitle === '') {
            setError("Choose an title for the board")
            return;
        }
        if (boardColor === '') {
            setError("You need to choose an background")
            return;
        }

        if (!user) return;
        if (!user.username) return;

        await createBoardInDb(user.uid, user.username, boardTitle, boardColor);
/*         const userBoards = await getUserBoards(user);
        setBoards(userBoards); */
        setBoardTitle('');
        setBoardColor('');
        handleClose();

    }

    return (
        <div className='createBoard' ref={menuRef} >
            <div className='createMenuHeader'>
                <p id='createTitle'>Create a new board</p>
                <button onClick={handleClose} id='closeCreate'><RxCross1 /></button>
            </div>
            <input
                className='createInput'
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
                placeholder='Enter the title of your board...'
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>Choose a background</p>
            <div className='colorSelect'>
                {Object.keys(boardColors).map((colorKey) => (
                    <div
                        className='selectColor'
                        key={colorKey}
                        style={{ background: boardColors[colorKey].default }}
                        onMouseEnter={(e) => handleHover(e, colorKey, true)}
                        onMouseLeave={(e) => handleHover(e, colorKey, false)}
                        onClick={() => setBoardColor(colorKey)}
                    >
                        {boardColor === colorKey ?
                            <p className='selectedBoardColor'><IoIosCheckmark size={30} /></p>
                            :
                            <p />
                        }
                    </div>
                ))}
            </div>
            <button className='createBtn' onClick={addBoard}>Create</button>
        </div>
    )
}

export default CreateMenu;