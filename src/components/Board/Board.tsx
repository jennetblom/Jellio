import React, { useState } from 'react'
import './Board.css'
import List from '../List/List'

type List = {
    id: number;
}
const Board = () => {
    const [lists, setLists] = useState(["Hej"]);
    
    const addList = () => {
        setLists([...lists, 'Ny lista']);
        console.log(lists);
    }

    
    return (
        <div className='boardContainer'>
            <p></p>
           
            <div className='boardFlex'>
                {lists.map((list, index) => (
                    <List key={index} listName={list} />
                ))}
            </div>
            <button onClick={addList} id='btnAdd'  >+ Lägg till en lista</button>
        </div>
    )
}

export default Board