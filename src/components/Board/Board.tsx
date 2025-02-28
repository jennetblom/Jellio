import React, { useState } from 'react'
import './Board.css'
import List from '../List/List'
import Card from '../Card/Card';
import { IoAdd } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
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
type List = {
    id: number;
    title: string;
    cards: Card[];

}
const Board: React.FC = () => {


    const [lists, setLists] = useState<List[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    const [listTitle, setListTitle] = useState<string>('');


    const addList = (e: React.FormEvent) => {
        //Adds an new list to the list of lists
        //If listempty is empty the function returns
        e.preventDefault();
        if (listTitle === '') return setIsAdding(false);

        const newList: List = {
            id: lists.length + 1,
            title: listTitle,
            cards: []
        }

        setLists([...lists, newList]);
        setIsAdding(true);
        setListTitle('');
        console.log(lists);
    }
    const handleAdd = () => {
        //When user clicks the handleAdd button, setisAdding is true and the input for listTitle 
        // and another button for adding a new list shows up
        setIsAdding(true);
    }
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.relatedTarget && e.relatedTarget.id === "addButton") {
            return;
        }
        setIsAdding(false);
    }
    const removeItem = (id: number) => {
        setLists((prevLists) => prevLists.filter(list => list.id !== id));
    }
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

        setLists((prevLists) => {
            const oldIndex = prevLists.findIndex((list) => list.id === active.id);
            const newIndex = prevLists.findIndex((list) => list.id === over.id);
            return arrayMove(prevLists, oldIndex, newIndex);
        });
    };
    

    return (
        <div className='boardContainer'>
            <div className='boardColumn'>

                <div className='boardFlex'>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
                        <SortableContext items={lists.map(list => list.id)} strategy={horizontalListSortingStrategy}>
                            {lists.map((list) => (
                                <List key={list.id} list={list} onRemove={removeItem} />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>


                {!isAdding ? (
                    <>
                        <button onClick={handleAdd} id='handleAddBtn'><IoAdd size={18} /> Add another list</button>
                    </>
                ) : (
                    <div className='listContainer'>
                        <form onSubmit={addList}>
                            <input
                                className='input'
                                value={listTitle}
                                onChange={(e) => setListTitle(e.target.value)}
                                placeholder='Enter list name...'
                                onBlur={handleBlur}
                                autoFocus
                                maxLength={33}
                            />
                        </form>
                        <div className='addOrCancelContainer'>
                            <button id="addButton" className='btnAdd' onClick={addList}>Add list</button>
                            <button className='icon-button' onClick={() => setIsAdding(false)}><RxCross2 /></button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}



export default Board

