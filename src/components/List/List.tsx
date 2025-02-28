import React, { useEffect, useRef, useState } from 'react'
import './List.css'
import { IoAdd } from "react-icons/io5";
/* import { BsThreeDots } from "react-icons/bs"; */
import Card from '../Card/Card';

import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,

} from "@dnd-kit/sortable";

type Card = {
  id: number;
  content: string;
}
type ListProps = {
  list: { id: number, title: string, cards: Card[] };
  onRemove: (id: number) => void;
};


const List: React.FC<ListProps> = ({ list, onRemove }) => {

  const [listTitle, setListTitle] = useState('');
  const [isTitleClicked, setIsTitleClicked] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
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
  const addCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardContent === '') return setIsHandlingCard(false);

    const newCard: Card = {
      id: cards.length + 1,
      content: cardContent
    }
    setCards([...cards, newCard]);
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
  const handleTitleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event)
    }
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })

  const keyboardSensor = useSensor(KeyboardSensor)
  const sensors = useSensors(mouseSensor, keyboardSensor);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setCards((prevCards) => {
      const oldIndex = prevCards.findIndex((card) => card.id === active.id);
      const newIndex = prevCards.findIndex((card) => card.id === over.id);
      return arrayMove(prevCards, oldIndex, newIndex);
    });
  };

  return (
    <div className={`listContainer ${isDragging ? "isDragging" : ""}`} style={style} >
      <div className='listTitleContainer' ref={setNodeRef} {...attributes}  {...listeners} >
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
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={cards.map(card => card.id)} strategy={verticalListSortingStrategy} >
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </SortableContext>
      </DndContext>
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

