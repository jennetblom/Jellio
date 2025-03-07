import React, { useEffect, useRef, useState } from 'react'
import './Card.css'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDeleteBin6Line } from "react-icons/ri";

type CardProps = {
  card: { id: number, content: string };
  removeCard: () => void;
}
const Card = ({ card, removeCard }: CardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });
  const [isCardClicked, setIsCardClicked] = useState(false);
  const [cardContent, setCardContent] = useState(card.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
    }
  }
  const handleCardKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCardContent(event)
    }
  }
  useEffect(() => {
    console.log("useEffect", textareaRef.current?.scrollHeight);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [cardContent, isCardClicked]);


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