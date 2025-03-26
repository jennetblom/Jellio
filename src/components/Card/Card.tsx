import React, { useEffect, useRef, useState } from 'react'
import './Card.css'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateCardInDb } from '../../firebase/updateData/updateCardInDb';

type CardProps = {
  card: { id: number, content: string };
  removeCard: () => void;
  boardId: string;
  listId: string;
}
const Card = ({ card, removeCard, boardId, listId }: CardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });
  const [isCardClicked, setIsCardClicked] = useState(false);
  const [cardContent, setCardContent] = useState(card.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [cardContent, isCardClicked]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleCardClicked = () => {
    setCardContent(card.content);
    setIsCardClicked(true);

  }

  const handleCardContent = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCardClicked(false);
    if (cardContent.length > 0) {
      card.content = cardContent;
      updateCardInDb(boardId, listId, { id: card.id, content: cardContent });

    }
  }
  const handleCardKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCardContent(event)
    }
  }


  return (
    <div className='cardContainer' style={style} ref={setNodeRef} {...attributes} {...listeners}>
      {!isCardClicked ? (
        <div className='cardContentPlacement'>
          <p className='cardContent' onClick={handleCardClicked}>{card.content}</p>
          <div className='cardContentBottom'>
            <RiDeleteBin6Line id='trashIcon' onClick={removeCard} size={12} />
          </div>
        </div>
      ) : (
        <form onSubmit={handleCardContent}>
          <textarea
            ref={textareaRef}
            value={cardContent}
            className='inputCard'
            onChange={(e) => setCardContent(e.target.value)}
            onKeyDown={handleCardKeyPress}
            onBlur={() => setIsCardClicked(false)}
            autoFocus
          />
        </form>
      )
      }
    </div>
  )
}

export default Card