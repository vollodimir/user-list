import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setPublicList, setHideList, setShowPopup } from '../../redux/filter/slice';
import DragDropArea from './DragDropArea';

import imageClose from '../../assets/img/icon/close.svg';
import styles from './PopupTouch.module.scss';

export const PopupTouch = () => {
  const dispatch = useDispatch();
  const { publicList, hideList, showPopup } = useSelector((state) => state.lists);

  const [search, setSearch] = React.useState('');
  const searchRef = React.useRef(null);

  const [lists, setLists] = React.useState([hideList, publicList]);

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  const clearSearch = () => {
    setSearch('');
    searchRef?.current.focus();
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
                onChange={(event) => searchHandler(event)}
                ref={searchRef}
                value={search}
                type="text"
                placeholder="Search..."
              />
              {search && <img onClick={() => clearSearch()} src={imageClose} alt="Clear" />}
            </div>
          </form>
          <div className={styles.popup__row}>
            <DragDropArea {...{ search, lists, setLists }} />
          </div>
          <button onClick={() => onClickApply()} className={`btn ${styles.popup__btn}`}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
