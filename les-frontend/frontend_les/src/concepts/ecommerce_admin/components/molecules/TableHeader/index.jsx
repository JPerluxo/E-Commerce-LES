import React from 'react';
import styles from './index.module.css';

const TableHeader = ({ collumns }) => {
  return (<thead>
    <tr>
      {collumns.map((collumn, i) => <th key={i} className={styles.th}>{collumn}</th>)}
    </tr>
  </thead>)
}

export default TableHeader;