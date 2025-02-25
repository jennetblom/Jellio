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
    //When the user clicks the title, the title becomes editable and the texinput for title shows up
    setIsTitleClicked(true);
    //the state variable listTitle gets the value of title of the list
    setListTitle(list.title);
  };

  const handleSubmit = (e: React.FormEvent) => {
    //when the user clicks enter when typing, and if the new listTitle is 
    // not empty, the list gets an new title
    e.preventDefault();
    setIsTitleClicked(false);
    if(listTitle.length > 0) {
      list.title = listTitle;
    }
  
  }
  return (
    <div className='listContainer'>
      <div className='listTitleContainer'>
        {
          !isTitleClicked ? (
            //default value
            <div onClick={handleTitleClicked} className='listTitleTextField'>
              <p className='listTitle'>{list.title}</p>
            </div>
          ) : (
            //if title is clicked, then input shows up
            <form onSubmit={handleSubmit}>
              <input
                className='input'
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                placeholder='Enter your listname...'
                onBlur={() => setIsTitleClicked(false)}
                autoFocus
              />
            </form>
          )
        }
        <button className="icon-button">
          <BsThreeDots />
        </button>
      </div >
      <button className='btnAddToList'><IoAdd size={18} />Add a card</button>
    </div>
  )
}

export default List

