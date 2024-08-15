import { React, useEffect } from 'react';

import { Alert as BootstrapAlert } from 'react-bootstrap';

const Alert = ({ status, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <BootstrapAlert variant={status === 200 ? "success" : "danger"} onClose={onClose} dismissible>
      {message}
    </BootstrapAlert>
  )
}

export default Alert;