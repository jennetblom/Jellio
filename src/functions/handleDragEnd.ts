import { arrayMove } from "@dnd-kit/sortable";
import { List } from "../types";

export const handleDragEnd = (event: any, lists: List[], setLists: (lists: List[]) => void) => {
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


  let sourceList: List | undefined;
  let destinationList: List | undefined;
  let movedCard;

  lists.forEach((list) => {
    if (list.cards.some((card) => card.id === activeId)) {
      sourceList = list;
      movedCard = list.cards.find((card) => card.id === activeId);
    }
    if (list.cards.some((card) => card.id === overId) || list.id === overId) {
      destinationList = list;
    }
  });


  if (!sourceList || !movedCard) return;
  if (!destinationList) destinationList = sourceList; 


  if (sourceList.id === destinationList.id) {
    const oldIndex = sourceList.cards.findIndex((card) => card.id === activeId);
    const newIndex = overId ? destinationList.cards.findIndex((card) => card.id === overId) : destinationList.cards.length - 1;

    if (oldIndex === -1 || newIndex === -1) return;

    const updatedCards = arrayMove(sourceList.cards, oldIndex, newIndex);

    setLists(
      lists.map((list) =>
        list.id === sourceList!.id ? { ...list, cards: updatedCards } : list
      )
    );
    return;
  }

  const newSourceCards = sourceList.cards.filter((card) => card.id !== activeId);
  const newDestinationCards = destinationList ? [...destinationList.cards] : [];

  let overCardIndex;
  if(destinationList.cards.length === 0 || !overId) {
    overCardIndex = 0
  } else {
    overCardIndex = overId ? destinationList.cards.findIndex((card) => card.id === overId) :
    destinationList.cards.length;
  }


  if (overCardIndex === -1) return;

  
  newDestinationCards.splice(overCardIndex, 0, movedCard);

  setLists(
    lists.map((list) => {
      if (list.id === sourceList!.id) return { ...list, cards: newSourceCards };
      if (list.id === destinationList!.id) return { ...list, cards: newDestinationCards };
      return list;
    })
  );
};