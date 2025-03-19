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
    rectSortingStrategy,
    SortableContext,

} from "@dnd-kit/sortable";
import { handleDragEnd } from "../../functions/handleDragEnd";
import { BoardType } from '../../types';
import { addListToDb } from '../../firebase/addListToDb';
import { addCardToDb } from '../../firebase/addCardToDb';
import { deleteListInDb } from '../../firebase/deleteListInDb';
import { CardType, ListType } from '../../types';
import { getUserLists } from '../../firebase/getUserLists';

/* type Card = {
    id: number;
    content: string;
}
type List = {
    id: number;
    title: string;
    cards: Card[];
} */

type BoardProps = {
    board: BoardType;
    setBoard: React.Dispatch<React.SetStateAction<any>>;
}
const Board = ({ board, setBoard }: BoardProps) => {


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
        
        if (newList) {
            setLists((prevLists) => [
                ...prevLists,
                newList
            ]);
        }
        setIsAdding(true);
        setListTitle('');
    }

    const addCard = async (listId: string, content: string) => {
        const newCard: CardType = { id: Date.now(), content: content };

        const success = await addCardToDb(board.id, listId, newCard);

        if (success) {
            setLists((prevLists) => {
                return prevLists.map((list) => {
                    if (list.id === listId) {
                        return { ...list, cards: [...list.cards, newCard] }
                    }
                    return list;
                }
                )
            });
        }
    };

    const removeList = async (listId: number) => {
        /*         const success = await deleteListInDb(board.id, listId);
        
                if (success) {
                    setBoard((prevBoard: BoardType | null) => {
                        if (!prevBoard) return prevBoard;
        
                        return {
                            ...prevBoard,
                            lists: prevBoard.lists.filter(list => list.id !== listId)
                        }
                    })
                } */
    }
    const removeCard = (listId: number, cardId: number) => {
        /*        setLists(lists.map(list =>
                   list.id === listId
                       ? { ...list, cards: list.cards.filter(card => card.id !== cardId) }
                       : list
               )); */
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
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(event) => handleDragEnd(event, lists, setLists)}>
                        <SortableContext items={lists.map(list => list.id)} >
                            {lists.map((list) => (
                                <List key={list.id} list={list} addCardToList={addCard} onRemove={removeList} removeCard={removeCard} />
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


