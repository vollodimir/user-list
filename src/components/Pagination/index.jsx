import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurentPage } from '../../redux/user/slice';

import styles from './Pagination.module.scss';

export const Pagination = () => {
  const dispatch = useDispatch();
  const { page, pages } = useSelector((state) => state.user.pagination);

  const onChangePage = (page) => {
    if (page < 1 || page > pages) return;

    dispatch(setCurentPage(page));
  };

  return (
    <div className={styles.pagination}>
      <nav className={styles.pagination__links}>
        {page > 1 && (
          <Link
            className={styles.pagination__page}
            to={`?page=${page - 1}`}
            onClick={() => onChangePage(page - 1)}>
            {'<'}
          </Link>
        )}

        {[...new Array(pages)].map((_, index) =>
          index + 1 === page ? (
            <span
              key={index + page}
              className={`${styles.pagination__page} ${styles.pagination__page_current}`}>
              {index + 1}
            </span>
          ) : (
            <Link
              key={index + page}
              className={styles.pagination__page}
              to={`?page=${index + 1}`}
              onClick={() => onChangePage(index + 1)}>
              {index + 1}
            </Link>
          ),
        )}

        {page < pages && (
          <Link
            className={styles.pagination__page}
            to={`?page=${page + 1}`}
            onClick={() => onChangePage(page + 1)}>
            {'>'}
          </Link>
        )}
      </nav>
    </div>
  );
};
