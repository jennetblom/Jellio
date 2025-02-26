import React, { useState } from 'react'
import './Board.css'
import List from '../List/List'
import Card from '../Card/Card';
import { IoAdd } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

type Card = {
    id: number;
    content: string;
}
type List = {
    id: number;
    title: string;
    cards: Card[];
}
const Board: React.FC = () => {


    const [lists, setLists] = useState<List[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    const [listTitle, setListTitle] = useState('');


    const addList = (e: React.FormEvent) => {
        //Adds an new list to the list of lists
        //If listempty is empty the function returns
    e.preventDefault();
        if (listTitle === '') return setIsAdding(false);

        const newList: List = {
            id: lists.length + 1,
            title: listTitle,
            cards: []
        }

        setLists([...lists, newList]);
        setIsAdding(true);
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
                        <div className='addOrCancelContainer'>
                            <button id="addButton" className='btnAdd' onClick={addList}>Add list</button>
                            <button className='icon-button' onClick={() => setIsAdding(false)}><RxCross2 /></button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}



export default Board

