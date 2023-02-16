import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setPublicList, setHideList, setShowPopup } from '../../redux/filter/slice';

import imageClose from '../../assets/img/icon/close.svg';

import styles from './PopupTouch.module.scss';
import DragDropArea from './DragDropArea';

function Popup() {
  const [search, setSearch] = React.useState('');

  //---------------------------------------------------
  const { publicList, hideList, showPopup } = useSelector((state) => state.lists);
  const dispatch = useDispatch();

  const [lists, setLists] = React.useState([hideList, publicList]);
  ///-------------------------------------------
  // const [curentList, setCurentList] = React.useState();
  // const [curentColumn, setCurentColumn] = React.useState();

  // const onDragOverHandler = (event) => {
  //   event.preventDefault();
  // };
  // const onDragStartHandler = (event, list, column) => {
  //   setCurentList(list);
  //   setCurentColumn(column);
  // };

  // const onDropHandler = (event, list) => {
  //   event.preventDefault();
  //   if (curentList.id !== list.id) {
  //     const arrWithout = curentList.columns.filter((el) => curentColumn.id !== el.id);
  //     setLists(
  //       lists.map((l) => {
  //         if (l.id === list.id) {
  //           return { ...l, columns: [...l.columns, curentColumn] };
  //         } else {
  //           return { ...l, columns: arrWithout };
  //         }
  //       }),
  //     );
  //   }
  // };

  // const onClickRemove = (list, column) => {
  //   if (window.confirm('Remove?')) {
  //     const arrWithout = list.columns.filter((el) => column.id !== el.id);
  //     setLists(
  //       lists.map((l) => {
  //         if (l.id !== list.id) {
  //           return { ...l, columns: [...l.columns, column] };
  //         } else {
  //           return { ...l, columns: arrWithout };
  //         }
  //       }),
  //     );
  //   }
  // };

  const searchHendler = (event) => {
    setSearch(event.target.value);
  };

  const clearSearch = (event) => {
    setSearch('');
  };

  const onClickApply = () => {
    dispatch(setHideList(lists[0]));
    dispatch(setPublicList(lists[1]));
    dispatch(setShowPopup(false));
  };

  const onClickClose = () => {
    dispatch(setShowPopup(false));
  };

  return (
    <div className={`${styles.popup} ${showPopup ? styles.popup_show : ''}`}>
      <div className={styles.popup__body}>
        <div className={styles.popup__bg}>
          <div onClick={() => onClickClose()} className={styles.popup__close}></div>
          <form>
            <div className={styles.popup__search}>
              <input
                onChange={(event) => searchHendler(event)}
                value={search}
                type="text"
                placeholder="Search..."
              />
              {search && (
                <img onClick={(event) => clearSearch(event)} src={imageClose} alt="Clear" />
              )}
            </div>
          </form>
          <div className={styles.popup__row}>
            <DragDropArea />

            {/* {lists.map((list) => (
              <div
                key={list.id + list.title}
                onDragOver={(event) => onDragOverHandler(event)}
                onDrop={(event) => onDropHandler(event, list)}
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
                      <div
                        key={column.id + column.title + index}
                        draggable={true}
                        onDragStart={(event) => onDragStartHandler(event, list, column)}
                        //onTouchMove={(event) => console.log(event, list, column)}
                        className={styles.column}>
                        {column.title}
                        {list.id === 1 && (
                          <img
                            onClick={() => onClickRemove(list, column)}
                            src={imageClose}
                            alt="Remove"
                          />
                        )}
                      </div>
                    ))}
                </div>{' '}
              </div>
            ))} */}
          </div>
          <button onClick={() => onClickApply()} className={`btn ${styles.popup__btn}`}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
