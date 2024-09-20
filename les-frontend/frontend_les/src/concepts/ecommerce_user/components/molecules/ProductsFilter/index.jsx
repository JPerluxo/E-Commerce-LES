import { React, useState } from 'react';
import styles from './index.module.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { RiFilterLine } from "react-icons/ri";
import { RiFilterOffLine } from "react-icons/ri";

const ProductsFilter = ({ content, originalContent, onFilter }) => {
  
  const years = [...new Set(originalContent.map(item => item.year))];
  const [selectedYear, setSelectedYear] = useState("");
  
  const manufacturers = [...new Set(originalContent.map(item => item.manufacturer))];
  const [selectedManufacturer, setSelectedManufacturer] = useState("");

  const countries = [...new Set(originalContent.map(item => item.country))];
  const [selectedCountry, setSelectedCountry] = useState("");

  const categories = [...new Set(originalContent.map(item => item.categories).flat())].sort();

  function handleClearFilter() {
    setSelectedYear("");
    setSelectedCountry("");
    setSelectedManufacturer("");
    onFilter(originalContent);
  };

  function setCategory(category) {
    content = originalContent;
    const filteredContent = content.filter(product => {
      if (selectedYear && (product.year === undefined || product.year !== selectedYear)) return false;
      if (selectedCountry && (product.country === undefined || product.country !== selectedCountry)) return false;
      if (selectedManufacturer && (product.manufacturer === undefined || product.manufacturer !== selectedManufacturer)) return false;
      return true;
    }).filter(product => product.categories.includes(category));

    onFilter(filteredContent);
  }
  
  function Filter() {
    content = originalContent;
    const filteredContent = content.filter(product => {
      if (selectedYear && (product.year === undefined || product.year !== selectedYear)) return false;
      if (selectedCountry && (product.country === undefined || product.country !== selectedCountry)) return false;
      if (selectedManufacturer && (product.manufacturer === undefined || product.manufacturer !== selectedManufacturer)) return false;
      return true;
    });

    onFilter(filteredContent);
  }

  return (
    <div className={styles.ProductsFilter}>
      <h3>Filtrar produtos</h3>
      <Form.Select aria-label="Year Filter" className="mb-2" value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
        <option value={""}>Ano</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </Form.Select>
      <Form.Select aria-label="Manufacturer Filter" className="mb-2" value={selectedManufacturer} onChange={(e) => setSelectedManufacturer(e.target.value)}>
        <option value={""}>Fabricante</option>
        {manufacturers.map(manufacturer => (
          <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
        ))}
      </Form.Select>
      <Form.Select aria-label="Country Filter" className="mb-2" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
        <option value={""}>País</option>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </Form.Select>
      <ButtonGroup vertical className={`mb-3 ${styles.Categories}`}>
        {categories.map(category => (
          <Button variant="link" key={category} onClick={() => setCategory(category)} className={styles.CategoryFilter}>{category}</Button>
        ))}
      </ButtonGroup>
      <ButtonGroup aria-label="Filter Actions">
        <Button variant="outline-secondary" onClick={Filter} title="Aplicar filtros"><RiFilterLine/></Button>
        <Button variant="outline-secondary" onClick={handleClearFilter} title="Limpar filtros"><RiFilterOffLine/></Button>
      </ButtonGroup>
    </div>
  )
}

export default ProductsFilter;