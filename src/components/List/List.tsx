import React, { useState } from 'react'
import './List.css'

type ListProps = {
    listName: string;
  };
const List : React.FC<ListProps>  = ({listName}) => {

    const [listTitle, setListTitle] = useState('');
  return (
    <div className='listContainer'>
        <input 
        className='input'
        value={listTitle}
        onChange={(e) => setListTitle(e.target.value)}
        placeholder='Enter your listname...'
        />

        <button className='btnAddToList'>Add list</button>
{/*         <p className='listTitle'></p> */}
    </div>
  )
}

export default List