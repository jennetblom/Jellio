
import { useState } from "react";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
} from "@dnd-kit/core";
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,

} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { addData } from "../../firebase/addData"
const initialItems = ["Item 1", "Item 2", "Item 3", "Item 4"];

const DragableScreen = () => {
    const [items, setItems] = useState(initialItems);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if(active.id != over.id) {
           setItems((items) => {
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);
            return arrayMove(items, oldIndex, newIndex);
           });
        }
    };
    const addDataToDb = () => {
        addData()
    }

    return (
        <div>
  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={horizontalListSortingStrategy}>
            {items.map((item)=> (
                <SortableItem key={item} id={item} />
            ))}
          </SortableContext>
       </DndContext>
       <button onClick={addDataToDb}></button>
        </div>
     
    )
}

export default DragableScreen