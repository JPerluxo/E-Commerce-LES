import React from 'react';
import styles from './index.module.css';

import FormCheck from 'react-bootstrap/FormCheck';
import { BsPencilSquare } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";

const TableRow = ({ rowContent }) => {
  return (<tr>
    {Object.entries(rowContent).map(([key, value]) => (
      <td key={key}>
        {(() => {
          switch (typeof value) {
            default:
              return value;

            case 'boolean':
              return <FormCheck type="switch" checked={value} disabled/>;
          }
        })()}
      </td>
    ))}
    <td className={styles.actionsCell}>
      <BsPencilSquare className={styles.editIcon}/>
      <IoTrashOutline className={styles.deleteIcon}/>
    </td>
  </tr>)
}

export default TableRow;