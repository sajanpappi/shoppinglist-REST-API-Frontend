import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteItem from './DeleteItem';
import './liststyle.css';

function ItemList() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editItemId, setEditItemId] = useState(null); // State to track the item being edited
  const [editValues, setEditValues] = useState({}); // State to store new values for the item
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/items/')
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data); // Initialize filtered items
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter items based on the search term
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered); // Update the filtered items list
  }, [items, searchTerm]);

  const handleEditClick = (item) => {
    setEditItemId(item.id); // Set the item to edit mode
    setEditValues({ name: item.name, quantity: item.quantity, price: item.price }); // Pre-fill values
  };

  const handleSaveClick = () => {
    const { name, quantity, price } = editValues;
    axios
      .put(`http://localhost:8000/api/items/${editItemId}/`, {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      })
      .then((response) => {
        // Update the items list with the updated item
        setItems(items.map((item) => (item.id === editItemId ? response.data : item)));
        setEditItemId(null); // Exit edit mode
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };

  const handleEditChange = (field, value) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleDelete = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* Add search input with styling */}
      <input
        className="search-input"
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Expected Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                {editItemId === item.id ? (
                  <td className="edit-container">
                    <input
                      type="text"
                      value={editValues.name}
                      onChange={(e) => handleEditChange('name', e.target.value)}
                    />
                    <input
                      type="number"
                      value={editValues.quantity}
                      onChange={(e) => handleEditChange('quantity', e.target.value)}
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={editValues.price}
                      onChange={(e) => handleEditChange('price', e.target.value)}
                    />
                    <button className="button" onClick={handleSaveClick}>Save</button>
                    <button className="button" onClick={() => setEditItemId(null)}>Cancel</button>
                  </td>
                ) : (
                  <>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>
                      <DeleteItem item={item} onDelete={handleDelete} />
                      <button className="button-edit" onClick={() => handleEditClick(item)}>Edit</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemList;
