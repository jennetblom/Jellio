import { arrayMove } from "@dnd-kit/sortable";
import { ListType } from "../types";
import { updateListOrder } from "../firebase/swapOrder/updateListOrder";
import { swapCardsInSameList } from "../firebase/swapOrder/swapCardsInSameList";
import { swapCardsBetweenLists } from "../firebase/swapOrder/swapCardsBetweenLists";

export const handleDragEnd = async (
  event: any,
  lists: ListType[],
  setLists: (lists: ListType[]) => void,
  boardId: string,
) => {

    //Active = Element that is being moved
  //Over = The element that its being dropped onto
  //If over is null, we will doing nothing because the user has dropped the an element outside of a list
  const { active, over } = event;
  if (!over) return;

  const activeId = active.id;
  const overId = over.id;


//Checks if both elements are lists, if both are
//That means a list has being moved
  const activeListIndex = lists.findIndex((list) => list.id === activeId);
  const overListIndex = lists.findIndex((list) => list.id === overId);
//Updates the listOrder in the local state and db

  if (activeListIndex !== -1 && overListIndex !== -1) {
    const updatedLists = arrayMove(lists, activeListIndex, overListIndex);
  
    console.log("updatedLists", updatedLists);
    await updateListOrder(boardId, updatedLists);
  /*   setLists(updatedLists); */
    console.log("updatedLists", updatedLists);
    return;

  }

//sourceList where the card was before the move
//destinationList where the card is now

  let sourceList = lists.find((list) => list.cards.some((card) => card.id === activeId));
  let destinationList = lists.find((list) => list.cards.some((card) => card.id === overId)) || lists.find((list) => list.id === overId);
 
  //The function will cancel if they are null, both need to have an value
  if (!sourceList) {
    console.log("Source list not found.");
    return;
  }
  if (!destinationList) {
    console.log("Destination list not found.");
    return;
  }

  //find the movedCard in source list
  const movedCard = sourceList.cards.find((card) => card.id === activeId);
  if (!movedCard) return;


  //if the card is being dropped onto the same list
  if (sourceList.id === destinationList.id) {
    const oldIndex = sourceList.cards.findIndex((card) => card.id === activeId);
    const newIndex = destinationList.cards.findIndex((card) => card.id === overId);

    if (oldIndex !== -1 && newIndex !== -1) {
      const updatedCards = arrayMove(sourceList.cards, oldIndex, newIndex);

      await swapCardsInSameList(boardId, sourceList.id, updatedCards, movedCard.id, destinationList.cards[newIndex]?.id);

    }
    return;
  }

  //create an new list of sourceList without the dragged card
  const newSourceCards = sourceList.cards.filter((card) => card.id !== activeId);
  //creates an copy of destinationList.cards
  const newDestinationCards = [...(destinationList.cards || [])];


  const overCardIndex = overId ? newDestinationCards.findIndex((card) => card.id === overId) : newDestinationCards.length;
  //inserts the movedCard at the newList
  newDestinationCards.splice(overCardIndex === -1 ? newDestinationCards.length : overCardIndex, 0, movedCard);

  console.log("newSourceCards", newSourceCards, newDestinationCards);
  await swapCardsBetweenLists(boardId, sourceList.id, destinationList.id, newSourceCards, newDestinationCards);

  setLists(
    lists.map((list) => {
      if (list.id === sourceList!.id) return { ...list, cards: newSourceCards };
      if (list.id === destinationList!.id) return { ...list, cards: newDestinationCards };
      return list;
    })
  );
};






















/* export const handleDragEnd = (event: any, lists: ListType[], setLists: (lists: ListType[]) => void) => {
  const { active, over } = event;
  if (!over) return;

  const activeId = active.id; 
  const overId = over.id; 


  console.log("activeId:", activeId, "overId:",overId);
  console.log("lists:", lists);

  const activeListIndex = lists.findIndex((list) => list.id === activeId);
  const overListIndex = lists.findIndex((list) => list.id === overId);

  if (activeListIndex !== -1 && overListIndex !== -1) {
    setLists(arrayMove(lists, activeListIndex, overListIndex));
    return;
  }


  let sourceList = lists.find((list) => list.cards.some((card) => card.id === activeId));
  let destinationList = lists.find((list) => list.cards.some((card) => card.id === overId)) || lists.find((list) => list.id === overId);
  if (!sourceList) return;


  const movedCard = sourceList.cards.find((card) => card.id === activeId);
  if (!movedCard) return;

  if (sourceList.id === destinationList?.id) {
    const oldIndex = sourceList.cards.findIndex((card) => card.id === activeId);
    const newIndex = destinationList.cards.findIndex((card) => card.id === overId);

    if (oldIndex !== -1 && newIndex !== -1) {
      const updatedCards = arrayMove(sourceList.cards, oldIndex, newIndex);
      setLists(lists.map((list) => (list.id === sourceList.id ? { ...list, cards: updatedCards } : list)));
    }
    return;
  }
  
  const newSourceCards = sourceList.cards.filter((card) => card.id !== activeId);
  const newDestinationCards = [...(destinationList?.cards || [])];


  const overCardIndex = overId ? newDestinationCards.findIndex((card) => card.id === overId) : newDestinationCards.length;
  newDestinationCards.splice(overCardIndex === -1 ? newDestinationCards.length : overCardIndex, 0, movedCard);


  
  setLists(
    lists.map((list) => {
      if (list.id === sourceList!.id) return { ...list, cards: newSourceCards };
      if (list.id === destinationList!.id) return { ...list, cards: newDestinationCards };
      return list;
    })
  );
}; */
