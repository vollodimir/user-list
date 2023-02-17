import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setShowPopup } from './redux/filter/slice';
import { fetchUserData } from './redux/user/slice';

import { Loading, UserTable, Pagination, PopupTouch } from './components';

import './scss/style.scss';

function App() {
  const dispatch = useDispatch();

  const { status, pagination } = useSelector((state) => state.user);
  const { columns } = useSelector((state) => state.lists.publicList);

  React.useEffect(() => {
    dispatch(fetchUserData({ page: pagination.page }));
  }, [dispatch, pagination.page]);

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
        ) : columns[0] ? (
          <>
            <div className="container">
              <UserTable />
            </div>
            <Pagination />
          </>
        ) : (
          <div className="container">
            <h1>Columns is not selected!</h1>
            <p>Click the button and make your choice.</p>{' '}
          </div>
        )}
      </div>

      <PopupTouch />
    </>
  );
}

export default App;
