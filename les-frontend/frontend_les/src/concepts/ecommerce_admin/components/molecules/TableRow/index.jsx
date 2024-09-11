import React from 'react';
import styles from './index.module.css';

import FormCheck from 'react-bootstrap/FormCheck';
import { BsPencilSquare } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";

const TableRow = ({ rowContent, onAlert, deleteFunction }) => {
  const handleDelete = async () => {
    try {
      const response = await deleteFunction(rowContent.id);
      onAlert({ status: response.status, message: response.message });
      setTimeout(() => window.location.reload(), 3000);
    }
    
    catch (error) {
      onAlert({ status: 500, message: error?.response?.data?.message ?? `Erro ao deletar: ${error.message}` });
    }
  };

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
      <a href={`${window.location.pathname}/edit?id=${rowContent.id}`}><BsPencilSquare className={styles.editIcon}/></a>
      <IoTrashOutline className={styles.deleteIcon} onClick={handleDelete}/>
    </td>
  </tr>)
}

export default TableRow;