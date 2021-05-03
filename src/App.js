import './App.css';
import React, { useState } from 'react';
import Trainings from './components/Trainings';
import Home from './components/Home';
import Customers from './components/Customers';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


function App() {
  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Typography variant='h4'>
              Personaltrainer Tuomas
        </Typography>
        <Tabs 
          value={value} 
          onChange={handleChange}
          centered
        >
          <Tab value = "one" label="Koti" />
          <Tab value = "two" label="Harjoitukset" />
          <Tab value = "three" label="Asiakkaat" />
          <Tab value = "Four" label="Kalenteri" disabled />
        </Tabs>
       
      </AppBar>
      {value === 'one' && <Home />}
      {value === 'two' && <Trainings />}
      {value === 'three' && <Customers />}
    </div>
  );
}

export default App;
