import React from 'react';
import styles from './index.module.css';

import Table from 'react-bootstrap/Table';
import TableHeader from '../../molecules/TableHeader';
import TableRow from '../../molecules/TableRow';

const TableBox = ({ content, onAlert, deleteFunction }) => {
  return (
    <div className={styles.tableDiv}>
      <Table striped bordered hover>
        <TableHeader collumns={content.collumns}/>
        <tbody>
          {content.rows.map( (row, i) => <TableRow key={i} rowContent={row} onAlert={onAlert} deleteFunction={deleteFunction}/>)}
        </tbody>
      </Table>
    </div>
  )
}

export default TableBox;