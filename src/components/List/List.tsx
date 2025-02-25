import React, { useState } from 'react'
import './List.css'
import { IoAdd } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import Card from '../Card/Card';
import JellyCard from '../JellyCard/JellyCard';
type Card = {
  id: number;
  content: string;
}
type ListProps = {
  list: { id: number, title: string, cards: Card[] };
};


const List: React.FC<ListProps> = ({ list }) => {

  const [listTitle, setListTitle] = useState('');
  const [isTitleClicked, setIsTitleClicked] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [isHandlingCard, setIsHandlingCard] = useState(false);
  const [cardContent, setCardContent] = useState('');

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
    if (listTitle.length > 0) {
      list.title = listTitle;
    }
  }

  const handleAddCard = () => {
    console.log(isHandlingCard);
    setIsHandlingCard(true);
    console.log(isHandlingCard);
  }
  const addCard = () => {
    if (cardContent === '') return setIsHandlingCard(false);

    const newCard: Card = {
      id: cards.length + 1,
      content: cardContent
    }
    setCards([...cards, newCard]);
    setIsHandlingCard(false);
    setCardContent('');

  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget && e.relatedTarget.id === "addCard") {
      return;
    }
    setIsHandlingCard(false);
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
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
      {
        !isHandlingCard ? (
          <button className='btnhandleCard' onClick={handleAddCard}><IoAdd size={18} /> Add a card</button>
        ) : (
          <div>
            <form onSubmit={addCard}>
              <input
                className='inputCardContent'
                value={cardContent}
                onChange={(e) => setCardContent(e.target.value)}
                placeholder='Enter a title...'
                onBlur={handleBlur}
                autoFocus
              />
            </form>

            <button id="addCard" className='btnAddCard' onClick={addCard}>Add card </button>
          </div>
        )
      }
    </div>
  )
}

export default List

