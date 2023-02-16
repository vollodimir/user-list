import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setShowPopup } from './redux/filter/slice';
import { fetchUserData } from './redux/user/slice';
import Popup from './components/Popup';

import './scss/style.scss';
import { UserTable } from './components/UserTable';
import { Pagination } from './components/Pagination';
import { Loading } from './components/Loading';
import PopupTouch from './components/PopupTouch';
// import PopupDnD from './components/PopupDnD';

function App() {
  const dispatch = useDispatch();

  const { status, pagination } = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(fetchUserData({ page: pagination.page }));
  }, [pagination.page]);

  const isLoading = status === 'loading' || status === 'error';

  const ShowPopup = () => {
    dispatch(setShowPopup(true));
  };

  return (
    <>
      <div className="wrapper">
        <button onClick={() => ShowPopup()} className="btn">
          Select Columns
        </button>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="container">
              <UserTable />
            </div>
            <Pagination />
          </>
        )}
      </div>

      <PopupTouch />
      {/* <PopupDnD /> */}
    </>
  );
}

export default App;
