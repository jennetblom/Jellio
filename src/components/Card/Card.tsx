import React from 'react'
import './Card.css'
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

type CardProps = {
    card: {id: number, content: string};
}
const Card: React.FC<CardProps> = ({card}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id });
  
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