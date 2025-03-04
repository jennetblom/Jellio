import React from 'react'
import './Card.css'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


type CardProps = {
    card: {id: number, content: string};
}
const Card: React.FC<CardProps> = ({card}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

  return (
    <div className='cardContainer' style={style} ref={setNodeRef} {...attributes} {...listeners}>
        <p>{card.content}</p>
    </div>
  )
}

export default Card