// src/components/App/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import staticData from './staticData';
import Tables from './components/Table/Table';
import Filter from './components/Filter/Filter';


const App = () => {
  const [filter, setFilter] = React.useState({ conditions: [] });

  const handleFilterChange = (conditions) => {
    setFilter({ conditions });
  };
  
  return (
    <div className='d-flex flex-column justify-content-center align-items-center w-100'>
      <Filter  onFilterChange={handleFilterChange} />
      <Tables  data={staticData} filter={filter} />
    </div>
  );
};

export default App;
