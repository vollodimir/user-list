import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import styles from './PopupTouch.module.scss';
import imageClose from '../../assets/img/icon/close.svg';

function DragDropArea({ search, lists, setLists }) {
  const setNewList = (curentColumn, lists, destinationTitle, remove = false) => {
    setLists(
      lists.map((list) => {
        const condition = remove
          ? list.title !== destinationTitle
          : list.title === destinationTitle;

        if (condition) {
          return { ...list, columns: [...list.columns, curentColumn] };
        } else {
          const arrWithout = list.columns.filter(({ id }) => id !== curentColumn.id);

          return { ...list, columns: arrWithout };
        }
      }),
    );
  };

  const onDragEnd = (params) => {
    const { destination, source } = params;
    if (!destination || source.droppableId === destination.droppableId) {
      return;
    }

    let dragableColumn = {};

    lists.forEach((list) => {
      if (list.title === source.droppableId) {
        dragableColumn = list.columns[source.index];
      }
    });

    setNewList(dragableColumn, lists, destination.droppableId);
  };

  const onClickRemove = (list, column) => {
    setNewList(column, lists, list.title, true);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {lists.map((list) => (
        <Droppable key={list.id + list.title} droppableId={list.title}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...provided.dragHandleProps}
              className={`${styles.popup__columns} ${
                snapshot.isDraggingOver ? styles.popup__columns_isDrop : ''
              }`}>
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
                      draggableId={column.key}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                          className={`${styles.column} ${
                            snapshot.isDragging ? styles.column_isDrag : ''
                          }`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          {column.title}
                          {list.id === 1 && (
                            <img
                              onClick={() => onClickRemove(list, column)}
                              src={imageClose}
                              title="Remove?"
                              alt="Remove"
                            />
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
