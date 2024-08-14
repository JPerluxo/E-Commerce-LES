import React from 'react';
import styles from './index.module.css';

import Table from 'react-bootstrap/Table';
import TableHeader from '../../molecules/TableHeader';
import TableRow from '../../molecules/TableRow';

const TableBox = ({ content }) => {
  return (<div className={styles.tableBox}>
    <div className={styles.tableDiv}>
      <Table striped bordered hover>
        <TableHeader collumns={content.collumns}/>
        <tbody>
          {content.rows.map( (row, i) => <TableRow key={i} rowContent={row}/>)}
        </tbody>
      </Table>
    </div>
  </div>)
}

export default TableBox;