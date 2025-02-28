import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";



export default function SortableItem({ id }: { id: string }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "10px",
        margin: "5px 0",
        background: "#3498db",
        color: "white",
        borderRadius: "5px",
        cursor: "grab",
    };

    

    return (
        <button ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={() => console.log('klick')}>
            {id}
        </button>
    );
}   
