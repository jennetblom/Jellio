import React, { useEffect, useRef, useState } from 'react'
import './List.css'
import { IoAdd } from "react-icons/io5";
/* import { BsThreeDots } from "react-icons/bs"; */
import Card from '../Card/Card';
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSortable, verticalListSortingStrategy,  SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateListInDb } from '../../firebase/updateListInDb';


type Card = {
  id: number;
  content: string;
}
type ListProps = {
  boardId: string;
  list: { id: string, title: string, cards: Card[] };
  addCardToList: (listId: string, content: string) => void;
  onRemove: (listId: string) => void;
  removeCard: (listId: string, cardId: number) => void;
};


const List = ({ boardId, list, addCardToList, onRemove, removeCard }: ListProps) => {

  const [listTitle, setListTitle] = useState('');
  const [isTitleClicked, setIsTitleClicked] = useState(false);

  const [isHandlingCard, setIsHandlingCard] = useState(false);
  const [cardContent, setCardContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: list.id });

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [cardContent]);

  const handleTitleClicked = () => {
    //When the user clicks the title, the title becomes editable and the texinput for title shows up
    setIsTitleClicked(true);
    //the state variable listTitle gets the value of title of the list
    setListTitle(list.title);
  };
  const handleTitleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    //when the user clicks enter when typing, and if the new listTitle is 
    // not empty, the list gets an new title
    e.preventDefault();
    setIsTitleClicked(false);
    if (listTitle.length > 0) {
      list.title = listTitle;
      await updateListInDb(boardId, list.id, { title: listTitle });
    }
  }

  const handleAddCard = () => setIsHandlingCard(true);


  const addCard = (e: React.FormEvent) => {

    e.preventDefault();
    if (cardContent === '') return setIsHandlingCard(false);

    addCardToList(list.id, cardContent);
    setIsHandlingCard(true);
    setCardContent('');


  }
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (e.relatedTarget && e.relatedTarget.id === "addCard") {
      return;
    }
    setIsHandlingCard(false);
    setCardContent('');
  }
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCard(event);
    }
  }


  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };



  return (
    <div className={`listContainer ${isDragging ? "isDragging" : ""}`} style={style} >
      <div className='listTitleContainer' /* ref={setNodeRef} {...attributes}  {...listeners} */ >
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
         /*        onBlur={() => setIsTitleClicked(false)} */
                autoFocus
                maxLength={33}
                onKeyDown={handleTitleKeyPress}
              />
            </form>
          )
        }
        <button className="icon-button">
          <RiDeleteBin6Line onClick={() => onRemove(list.id)} size={18} />
        </button>
      </div >
      <div className='listsFlex'>
        <SortableContext items={list.cards.map(card => card.id)} strategy={verticalListSortingStrategy} >
          {list.cards.map((card) => (
            <Card key={card.id} card={card} removeCard={() => removeCard(list.id, card.id)} boardId={boardId} listId={list.id}/>
          ))}
        </SortableContext>
      </div>
      {
        !isHandlingCard ? (
          <button className='btnhandleCard' onClick={handleAddCard}><IoAdd size={18} /> Add a card</button>
        ) : (
          <div>
            <form onSubmit={addCard}>
              <textarea
                ref={textareaRef}
                className='inputCardContent'
                value={cardContent}
                onChange={(e) => setCardContent(e.target.value)}
                placeholder='Enter a title...'
                onBlur={handleBlur}
                autoFocus
                onKeyDown={handleKeyPress}
              />
            </form>
            <div className='addOrCancelContainer'>
              <button id="addCard" className='btnAddCard' onClick={addCard} >Add card</button>
              <button className='icon-button' onClick={() => setIsHandlingCard(false)}><RxCross2 /></button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default List

