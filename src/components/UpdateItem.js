import React, { useState } from 'react';
import axios from 'axios';

function UpdateItem({ item }) {
    const [name, setName] = useState(item.name);
    const [quantity, setQuantity] = useState(item.quantity);
    const [price, setPrice] = useState(item.price);

    const handleSubmit = event => {
        event.preventDefault();

        const updatedItem = {
            name: name,
            quantity: parseInt(quantity),
            price: parseFloat(price)
        };

        axios.put(`http://localhost:8000/api/items/${item.id}/`, updatedItem)
            .then(response => {
                console.log('Item updated successfully:', response.data);
                // Optionally update state or display a success message
            })
            .catch(error => {
                console.error('Error updating item:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Quantity:
                <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
            </label>
            <label>
                Price:
                <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
            </label>
            <button type="submit">Update Item</button>
        </form>
    );
}

export default UpdateItem;
