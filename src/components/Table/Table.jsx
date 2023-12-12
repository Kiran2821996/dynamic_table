// src/components/Table/Table.js
import React from 'react';
import Table from 'react-bootstrap/Table';

const Tables = ({ data, filter }) => {
  // Apply filters to data
  const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  const applyCondition = (item, condition) => {
    const value = item[condition.id];
    const searchTerm = condition.value;

    switch (condition.operator) {
      case 'CONTAINS':
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      case 'GTE':
        return isNumeric(value) && isNumeric(searchTerm) && Number(value) >= Number(searchTerm);
      case 'LTE':
        return isNumeric(value) && isNumeric(searchTerm) && Number(value) <= Number(searchTerm);
      case 'EQ':
        console.log(value,searchTerm);
        return value === searchTerm;
      default:
        return true;
    }
  };

  const filteredData = data.filter(item => {
    return filter.conditions.reduce((result, condition, index) => {
      if (index === 0) {
        // For the first condition, simply evaluate it
        return result && applyCondition(item, condition);
      } else {
        // For subsequent conditions, apply the logical operator
        if (condition.andOr === '&&') {
          return result && applyCondition(item, condition);
        } else if (condition.andOr === '||') {
          return result || applyCondition(item, condition);
        } else {
          // Default to '&&' if the logical operator is not provided
          return result && applyCondition(item, condition);
        }
      }
    }, true);
  });

 
  

  // Render the table with filtered data
  return (
    <Table className='w-50' striped bordered hover variant="light">
      {/* Render table headers */}
      <thead>
        <tr>
          <th>Name</th>
          <th>Screen Name</th>
          <th>Followers Count</th>
          <th>Following Count</th>
          <th>Location</th>
          <th>Verified</th>
        </tr>
      </thead>
      {/* Render table rows using filteredData */}
      <tbody>
        {filteredData.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.screen_name}</td>
            <td>{item.followers_count}</td>
            <td>{item.following_count}</td>
            <td>{item.location}</td>
            <td>{item.verified==="Yes"?"✔":"x"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Tables;
