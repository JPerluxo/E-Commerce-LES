import { React, useState } from 'react';
import styles from './index.module.css';

import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { RiFilterLine } from "react-icons/ri";
import { RiFilterOffLine } from "react-icons/ri";
import { RiPlayListAddFill } from "react-icons/ri";

const TableToolbar = ({ content, onFilter, filterProperty }) => {
  const [filterValue, setFilterValue] = useState('');
  const placeholderText = (content.collumns[Object.keys(content.rows[0]).indexOf(filterProperty)] || filterProperty)
  .toLowerCase()
  .replace(/^\w/, c => c.toUpperCase()); //Substitui a primeira letra por maiúscula

  const handleFilter = () => {
    const filteredRows = content.rows.filter(row => 
      row[filterProperty]?.toString().toLowerCase().includes(filterValue.toLowerCase())
    );
    onFilter(filteredRows);
  };

  const handleClear = () => {
    setFilterValue('');
    onFilter(content.rows);
  };

  return (
    <div className={styles.tableToolbar}>
      <InputGroup>
        <FormControl
          type="text" 
          placeholder={`${placeholderText}...`}
          aria-label={`${placeholderText}...`}
          value={filterValue} 
          onChange={(e) => setFilterValue(e.target.value)} 
        />
        <Button variant="outline-secondary" onClick={handleFilter}><RiFilterLine/></Button>
        <Button variant="outline-secondary" onClick={handleClear}><RiFilterOffLine/></Button>
      </InputGroup>
      <Button variant="success" href={`${window.location.pathname}/new`}><RiPlayListAddFill/></Button>
    </div>
  )
}

export default TableToolbar;
