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
    title?: string;


    /*     content: string; */
    /* cards: Card[]; */
}
const Board: React.FC = () => {


    const [lists, setLists] = useState<List[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    const [listTitle, setListTitle] = useState('');

  
        const addList = () => {
    
         
    
            const newList: List = {
                id: lists.length+1,
                title: listTitle
            }
    
            setLists([...lists, newList]);
            setIsAdding(false);
            console.log(lists);
        } 
    const handleAdd = () => {
        setIsAdding(true);
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
                        <button onClick={handleAdd} id='btnAdd'><IoAdd size={30}/> Add another list</button>
                    </>
                ) : (
                    <div className='listContainer'>
                    <form onSubmit={addList}>
                   <input
                     className='input'
                     value={listTitle}
                     onChange={(e) => setListTitle(e.target.value)}
                     placeholder='Enter your listname...'
                   />
                 </form>
                 <button className='btnAddToList' onClick={addList}>Add list</button>
                </div>
                )}

            </div>
        </div>
    )
}


export default Board


/* 

type List = {
    id: number;
    title?: string;
 */

/*     content: string; */
/* cards: Card[]; */

/* const Board: React.FC = () => {


    const [lists, setLists] = useState<List[]>([]);

    const addList = (title: string) => {

        if(!title.trim()) return;

        const newList: List = {
            id: lists.length+1,
            title: title
        }

        setLists([...lists, newList]);
        console.log(lists);
    }



    return (
        <div className='boardContainer'>
            <div className='boardColumn'>
                <div className='boardFlex'>
       
                    {lists.map((list) => (
                        <List key={list.id} list={list}  />
                    ))}
                             <List onAddList={addList} />
                </div>
                <button onClick={() => addList} id='btnAdd'  >+ Add another list in board</button> 
            </div>
        </div>
    )
}


export default Board */