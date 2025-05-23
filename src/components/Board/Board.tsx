import React, { useState, useEffect } from 'react'
import './Board.css'
import List from '../List/List'
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
    SortableContext,

} from "@dnd-kit/sortable";
import { handleDragEnd } from "../../functions/handleDragEnd";
import { BoardType } from '../../types';
import { addListToDb } from '../../firebase/addData/addListToDb';
import { addCardToDb } from '../../firebase/addData/addCardToDb';
import { deleteListInDb } from '../../firebase/delete/deleteListInDb';
import { CardType, ListType } from '../../types';
import { getUserLists } from '../../firebase/fetchData/getUserLists';
import { deleteCardInDb } from '../../firebase/delete/deleteCardInDb';


type BoardProps = {
    board: BoardType;

}
const Board = ({ board }: BoardProps) => {

    const [lists, setLists] = useState<ListType[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [listTitle, setListTitle] = useState<string>('');


    useEffect(() => {
        if (!board.id) return;

        const unsubscribe = getUserLists(board.id, setLists);
        return () => unsubscribe();
    }, [board.id]);


    const handleAddList = () => setIsAdding(true);
    //When user clicks the handleAdd button, setisAdding is true and the input for listTitle 
    // and another button for adding a new list shows up

    const addList = async (e: React.FormEvent) => {
        //Adds an new list to the list of lists
        //If listempty is empty the function returns
        e.preventDefault();
        if (listTitle === '') return setIsAdding(false);

        const newList = await addListToDb(board.id, listTitle, lists);
        if (!newList) {
            console.log('Error adding list');
            return;
        }

        setIsAdding(true);
        setListTitle('');
    }

    const addCard = async (listId: string, content: string) => {
        const newCard: CardType = { id: Date.now(), content: content };

        const success = await addCardToDb(board.id, listId, newCard);
        if (!success) {
            console.log('Error adding card');
            return;
        }
    };

    const removeList = async (listId: string) => {
        const success = await deleteListInDb(board.id, listId);
        if (!success) {
            console.log('Error deleting list');
            return;
        }
    }
    const removeCard = (listId: string, cardId: number) => {
        const success = deleteCardInDb(board.id, listId, lists, cardId);
        if (!success) {
            console.log('Error deleting card');
            return;
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.relatedTarget && e.relatedTarget.id === "addButton") {
            return;
        }
        setIsAdding(false);
    }


    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    })
    const keyboardSensor = useSensor(KeyboardSensor)
    
    const sensors = useSensors(mouseSensor, keyboardSensor);

    return (
        <div className='boardContainer'>
            <div className='boardColumn'>
                <div className='boardFlex'>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(event) => handleDragEnd(event, lists, setLists, board.id)}>
                        <SortableContext items={lists.map(list => list.id)} >
                            {lists.map((list) => (
                                <List key={list.id} boardId={board.id} list={list} addCardToList={addCard} onRemove={removeList} removeCard={removeCard} />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
                {!isAdding ? (
                    <>
                        <button onClick={handleAddList} id='handleAddBtn'><IoAdd size={18} /> Add another list</button>
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


