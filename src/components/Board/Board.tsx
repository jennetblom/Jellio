import React, { useState } from 'react'
import './Board.css'
import List from '../List/List'

import { IoAdd } from "react-icons/io5";

/* 
type Card = {
    id: number;
    content: string;
} */




type List = {
    id: number;
    title: string;
    /* cards: Card[]; */
}
const Board: React.FC = () => {


    const [lists, setLists] = useState<List[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    const [listTitle, setListTitle] = useState('');


    const addList = () => {
        //Adds an new list to the list of lists
        //If listempty is empty the function returns

        if (listTitle === '') return setIsAdding(false);

        const newList: List = {
            id: lists.length + 1,
            title: listTitle
        }

        setLists([...lists, newList]);
        setIsAdding(false);
        setListTitle('');
        console.log(lists);
    }
    const handleAdd = () => {
        //When user clicks the handleAdd button, setisAdding is true and the input for listTitle 
        // and another button for adding a new list shows up
        setIsAdding(true);
    }
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.relatedTarget && e.relatedTarget.id === "addButton") {
            return;
        }
        setIsAdding(false);
    }

    return (
        <div className='boardContainer'>
            <div className='boardColumn'>
                <div className='boardFlex'>
                    {lists.map((list) => (
                        <List key={list.id} list={list} />
                    ))}
                </div>
                {!isAdding ? (
                    <>
                        <button onClick={handleAdd} id='handleAddBtn'><IoAdd size={18} /> Add another list</button>
                    </>
                ) : (
                    <div className='listContainer'>
                        <form onSubmit={addList}>
                            <input
                                className='input'
                                value={listTitle}
                                onChange={(e) => setListTitle(e.target.value)}
                                placeholder='Enter your listname...'
                                onBlur={handleBlur}
                                autoFocus
                            />
                        </form>
                        <button id="addButton" className='btnAdd' onClick={addList}
                        >Add list</button>
                    </div>
                )}

            </div>
        </div>
    )
}



export default Board

