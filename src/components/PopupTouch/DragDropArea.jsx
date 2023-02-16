import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';

import styles from './PopupTouch.module.scss';
import imageClose from '../../assets/img/icon/close.svg';

function DragDropArea() {
  const [search, setSearch] = React.useState('');
  /////////////////////

  const { publicList, hideList } = useSelector((state) => state.lists);
  const dispatch = useDispatch();

  const [lists, setLists] = React.useState([hideList, publicList]);

  const onClickRemove = (list, column) => {};

  const onDragEnd = ({ destination, source }) => {
    //console.log('destination=>', destination, source);

    if (!destination || source.droppableId === destination.droppableId) {
      return;
    }
    //source.droppableId, '--->', destination.droppableId
    setLists(
      lists.map((list) => {
        if (list.title === destination.droppableId) {
          return { ...list, columns: [...list.columns, list.columns[source.index]] }; //z drugugu masiva
        } else {
          const arrWithout = list.columns.filter((_, index) => {
            console.log(index, '---', source.index);
            return index !== source.index;
          });
          return { ...list, columns: arrWithout };
        }
      }),
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {lists.map((list) => (
        <Droppable key={list.id + list.title} droppableId={list.title}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...provided.dragHandleProps}
              className={styles.popup__columns}>
              <h3 className={styles.popup__title}>{list.title}</h3>
              <div className={styles.popup__list}>
                {list.columns
                  .filter((col) => {
                    if (list.id === 2) {
                      return col.title.toLowerCase().includes(search.toLowerCase());
                    } else {
                      return true;
                    }
                  })
                  .map((column, index) => (
                    <Draggable
                      key={column.id + column.title + index}
                      draggableId={column.id.toString()} ///to string????
                      index={index}>
                      {(provided) => (
                        <div
                          className={styles.column}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          {column.title}
                          {list.id === 1 && (
                            <img onClick={() => onClickRemove()} src={imageClose} alt="Remove" />
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
}

export default DragDropArea;
