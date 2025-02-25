
import './JellyCard.css';


type CardProps = {
    card: {id: number, content: string};
}

const JellyCard: React.FC<CardProps> = ({card}) => {
    return (
        <div className="jelly-card">
            <p className="jelly-cardtext">{card.content}</p>
        </div>
    )
}

export default JellyCard;