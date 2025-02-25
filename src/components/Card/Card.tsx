import React from 'react'
import './Card.css'
type CardProps = {
    card: {id: number, content: string};
}
const Card: React.FC<CardProps> = ({card}) => {
  return (
    <div className='cardContainer'>
        <p>{card.content}</p>
    </div>
  )
}

export default Card