import React from 'react';
import { useSelector } from 'react-redux';

import styles from './UserTable.module.scss';

export const UserTable = () => {
  const { userData } = useSelector((state) => state.user);
  const { columns } = useSelector((state) => state.lists.publicList);
  const userArr = [...userData];

  const publicColums = [];

  columns.forEach((col) => {
    publicColums.push(col.key);
  });

  return (
    <table className={styles.members}>
      <thead>
        <tr>
          {columns &&
            [...columns]
              .sort((a, b) => a.id - b.id)
              .map((column) => <td key={column.title + column.id}>{column.title}</td>)}
        </tr>
      </thead>
      {userArr &&
        userArr.map((user) => (
          <tbody key={user.id + user.name}>
            <tr>
              {Object.keys(user)
                .filter((key) => publicColums.includes(key))
                .map((key) => (
                  <td key={user[key] + key}>{user[key]}</td>
                ))}
            </tr>
          </tbody>
        ))}
    </table>
  );
};
