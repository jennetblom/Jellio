import { arrayMove } from "@dnd-kit/sortable";
import { ListType } from "../types";
import { updateListOrder } from "../firebase/updateOrder/updateListOrder";
import { swapCardsInSameList } from "../firebase/updateOrder/swapCardsInSameList";
import { swapCardsBetweenLists } from "../firebase/updateOrder/swapCardsBetweenLists";

export const handleDragEnd = async (
  event: any,
  lists: ListType[],
  setLists: (lists: ListType[]) => void,
  boardId: string,
) => {
  const { active, over } = event;
  if (!over) return;

  const activeId = active.id;
  const overId = over.id;


  console.log("activeId:", activeId, "overId:", overId);
  console.log("lists:", lists);

  const activeListIndex = lists.findIndex((list) => list.id === activeId);
  const overListIndex = lists.findIndex((list) => list.id === overId);

  if (activeListIndex !== -1 && overListIndex !== -1) {
    const updatedLists = arrayMove(lists, activeListIndex, overListIndex);
    await updateListOrder(boardId, updatedLists);
    setLists(updatedLists);
    return;
  }


  let sourceList = lists.find((list) => list.cards.some((card) => card.id === activeId));
  let destinationList = lists.find((list) => list.cards.some((card) => card.id === overId)) || lists.find((list) => list.id === overId);
 
  if (!sourceList) {
    console.log("Source list not found.");
    return;
  }
  if (!destinationList) {
    console.log("Destination list not found.");
    return;
  }

  const movedCard = sourceList.cards.find((card) => card.id === activeId);
  if (!movedCard) return;

  if (sourceList.id === destinationList.id) {
    const oldIndex = sourceList.cards.findIndex((card) => card.id === activeId);
    const newIndex = destinationList.cards.findIndex((card) => card.id === overId);

    if (oldIndex !== -1 && newIndex !== -1) {
      const updatedCards = arrayMove(sourceList.cards, oldIndex, newIndex);

      await swapCardsInSameList(boardId, sourceList.id, updatedCards, movedCard.id, destinationList.cards[newIndex]?.id);

      setLists(lists.map((list) =>
        list.id === sourceList.id ? { ...list, cards: updatedCards } : list
      ));
    }
    return;
  }

  const newSourceCards = sourceList.cards.filter((card) => card.id !== activeId);
  const newDestinationCards = [...(destinationList.cards || [])];


  const overCardIndex = overId ? newDestinationCards.findIndex((card) => card.id === overId) : newDestinationCards.length;
  newDestinationCards.splice(overCardIndex === -1 ? newDestinationCards.length : overCardIndex, 0, movedCard);


  await swapCardsBetweenLists(boardId, sourceList.id, destinationList.id, newSourceCards, newDestinationCards, activeId, overId);

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
