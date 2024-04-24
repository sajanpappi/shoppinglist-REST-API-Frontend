import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import the styles.css file

function AddItem() {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        
        // Prepare the data for the new item
        const newItem = {
            name: name,
            quantity: parseInt(quantity),
            price: parseFloat(price)
        };

        // Send a POST request to the API endpoint using Axios
        axios.post('http://localhost:8000/api/items/', newItem)
            .then(response => {
                // Handle the response by updating the state with the new item
                const addedItem = response.data;
                console.log('Item added successfully:', addedItem);
                
                // Update the state to include the newly added item
                setName('');
                setQuantity('');
                setPrice('');

                // Reload the page to reflect the changes
                window.location.reload();
            })
            .catch(error => {
                console.error('Error adding item:', error);
            });
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-input-container"> {/* Container for aligning inputs */}
                <label className="form-label">
                    Item Name:
                    <input
                        className="form-input"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label className="form-label">
                    Quantity:
                    <input
                        className="form-input"
                        type="number"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                    />
                </label>
                <label className="form-label">
                    Expected Price Per Unit:
                    <input
                        className="form-input"
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </label>
            </div>
            <button className="button" type="submit">Add Item</button> {/* Button below the inputs */}
        </form>
    );
}

export default AddItem;
