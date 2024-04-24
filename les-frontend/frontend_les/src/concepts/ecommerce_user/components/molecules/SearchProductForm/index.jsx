import { React, useState } from 'react';
import styles from './index.module.css';

import Form from 'react-bootstrap/Form';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { bookApi } from '../../../../../apis/bookApi';

const SearchProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSearch = (value) => {
    setIsLoading(true);

    bookApi.getBooksByTitle(value).then(data => {
      setOptions(data);
      setIsLoading(false);
    })
  };

  return (
    <Form inline="true" data-bs-theme="light" className={styles.Form}>
      <InputGroup className={styles.InputGroup}>
        <AsyncTypeahead
          filterBy={() => true}
          minLength={1}
          id="ProductSearchInput"
          isLoading={isLoading}
          labelKey="title"
          onSearch={handleSearch}
          onChange={(selected) => setSelectedOption(selected[0])}
          options={options}
          placeholder="O que você está buscando?"
          promptText="O que você está buscando?"
          emptyLabel="Nenhum livro encontrado"
          searchText="Buscando..."
        />
        <Button variant="light" id="productSearchBtn" className={styles.Button} href={selectedOption? `./book?id=${selectedOption.id}` : "#"}>
          <FaMagnifyingGlass/>
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchProductForm;
