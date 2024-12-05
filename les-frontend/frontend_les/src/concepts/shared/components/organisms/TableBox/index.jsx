import { React, useState } from 'react';
import styles from './index.module.css';

import Table from 'react-bootstrap/Table';
import TableToolbar from '../../molecules/TableToolbar';
import TableHeader from '../../molecules/TableHeader';
import TableRow from '../../molecules/TableRow';

const TableBox = ({ content, onAlert, deleteFunction, filterProperty, tableType = null }) => {
  const [filteredRows, setFilteredRows] = useState(content.rows);
  const handleFilter = (rows) => setFilteredRows(rows);

  return (
    <div className={styles.tableDiv}>
      <TableToolbar content={content} onFilter={handleFilter} filterProperty={filterProperty} tableType={tableType}/>
      <Table striped bordered hover>
        <TableHeader collumns={content.collumns}/>
        <tbody>
          {filteredRows.map( (row, i) => <TableRow key={i} rowContent={row} onAlert={onAlert} deleteFunction={deleteFunction} tableType={tableType}/>)}
        </tbody>
      </Table>
    </div>
  )
}

export default TableBox;