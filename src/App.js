import React from 'react';
import './App.css';
import AddItem from './components/AddItem';
import DeleteItem from './components/DeleteItem';
import ItemList from './components/ItemList';


function App() {
  return (
    <div className="App">
      <h1>Shopping List App</h1>
      <AddItem />
      <DeleteItem />
      <ItemList />
    </div>
  );
}

export default App;
