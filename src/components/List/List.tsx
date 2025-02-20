import React, { useState } from 'react'
import './List.css'
import { IoAdd } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
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
          <div className='listTitleContainer'>
          <form onSubmit={handleSubmit}>
            <input
              className='input'
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              placeholder='Enter your listname...'
            />
          </form>
          <button className="icon-button">
          <BsThreeDots />
          </button>
          </div>
        ) : (
          <div className='listTitleContainer'>
          <p onClick={handleTitleClicked}  className='listTitle'>{list.title}</p>
          <button className="icon-button">
          <BsThreeDots />
          </button>
          </div >
        )
      }
      <button className='btnAddToList'><IoAdd size={18}/>Add a card</button>
    </div>
  )
}

export default List


