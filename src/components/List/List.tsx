import React, { useState } from 'react'
import './List.css'

type ListProps = {
  list: { id: number, title: string };
};
const List: React.FC<ListProps> = ({ list }) => {

  const [listTitle, setListTitle] = useState('');
  const [isTitleClicked, setIsTitleClicked] = useState(false);


  const handleTitleClicked = () => {

    setIsTitleClicked(true);
    setListTitle(list.title);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTitleClicked(false);

    list.title = listTitle;
  }
  return (
    <div className='listContainer'>

      {
        isTitleClicked ? (
          <form onSubmit={handleSubmit}>
            <input
              className='input'
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              placeholder='Enter your listname...'
            />
          </form>
        ) : (
          <p onClick={handleTitleClicked}>{list.title}</p>
        )
      }
      <button className='btnAddToList'>+ Add a card</button>
    </div>
  )
}

/* return (
  <div className='listContainer'>
 {/*    <input
      className='input'
      value={listTitle}
      onChange={(e) => setListTitle(e.target.value)}
      placeholder='Enter your listname...'
    /> 


    
    <p onClick={handleTitleClicked}>{list.title}</p>
    <button className='btnAddToList'>+ Add a card</button>
  </div>
)
} */

export default List


/* 
import React, { useState } from 'react'
import './List.css'

type ListProps = {
  list?: { id: number, title: string };
  onAddList: (title: string) => void;
};
const List: React.FC<ListProps> = ({ list, onAddList }) => {

  const [listTitle, setListTitle] = useState('');

  if (list) {
    <div className='listContainer'>
      <p>{listTitle}</p>
      <button className='btnAddToList'>+ Add a card</button>
    </div>
  }

  const addList = () => {
    if(onAddList) {
  onAddList(listTitle);
    setListTitle('');
    }
  
  }
  return (
    <div className='listContainer'>
      <input
        className='input'
        value={listTitle}
        onChange={(e) => setListTitle(e.target.value)}
        placeholder='Enter your listname...'
      />
      <button className='btnAddToList' onClick={() => addList()}>Add list</button>
    </div>
  )
}

export default List */