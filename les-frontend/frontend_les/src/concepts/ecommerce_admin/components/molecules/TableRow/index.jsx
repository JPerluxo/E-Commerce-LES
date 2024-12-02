import React from 'react';
import styles from './index.module.css';

import FormCheck from 'react-bootstrap/FormCheck';
import { BsPencilSquare } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { purchaseApi } from '../../../../../apis/purchaseApi';
import Select from '../../../../shared/components/molecules/Select';

const TableRow = ({ rowContent, onAlert, deleteFunction, tableType }) => {
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

  const IGNORED_FIELDS = {
    purchases: ["purchaseStatus"]
  };

  return (<tr>
    {Object.entries(rowContent)
    .filter(([key]) => !IGNORED_FIELDS[tableType]?.includes(key))
    .map(([key, value]) => (
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
      {(() => {
          switch (tableType) {
            default:
              return <>
                <a href={`${window.location.pathname}/edit?id=${rowContent.id}`}><BsPencilSquare className={styles.editIcon}/></a>
                <IoTrashOutline className={styles.deleteIcon} onClick={handleDelete}/>
              </>

            case "purchases":
              return <Select id={`PurchaseStatusSelect_${rowContent.id}`} allowNone={false} value={rowContent.purchaseStatus} options={[
                {value: process.env.REACT_APP_IN_PAYMENT_MADE_STATUS, text: "Pagamento Realizado"},
                {value: process.env.REACT_APP_PAYMENT_REJECTED_STATUS, text: "Pagamento Rejeitado"},
                {value: process.env.REACT_APP_IN_TRANSPORT_STATUS, text: "Em transporte"},
                {value: process.env.REACT_APP_TERMINATED_STATUS, text: "Compra Finalizada"},
              ]}
              onChange={(e) => (async () => {
                const response = await purchaseApi.updatePurchaseStatus({ purchaseId: rowContent.id, purchaseStatus: e.target.value });
                onAlert({ status: response.status, message: response.message });
              })()}
              />
          }
      })()}
    </td>
  </tr>)
}

export default TableRow;