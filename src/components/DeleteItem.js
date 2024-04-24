import React, { useState } from 'react';
import axios from 'axios';

function DeleteItem({ item }) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleClick = () => {
        if (!item) {
            console.error('Item is not defined.');
            return;
        }

        if (confirmDelete) {
            // Send a DELETE request to the API endpoint using Axios
            axios.delete(`http://localhost:8000/api/items/${item.id}/`)
                .then(response => {
                    // Handle success response if needed
                    console.log('Item deleted successfully:', response.data);
                    // Reload the page after deleting the item
                    window.location.reload();
                })
                .catch(error => {
                    // Handle any errors that occur during the request
                    console.error('Error deleting item:', error);
                });
        } else {
            // Show confirmation message
            setConfirmDelete(true);
        }
    };

    return (
        <div>
            {item ? (
                confirmDelete ? (
                    <>
                        <p>Are you sure you want to delete this item?</p>
                        <button onClick={handleClick}>Confirm Delete</button>
                        <button onClick={() => setConfirmDelete(false)}>Cancel</button>
                    </>
                ) : (
                    <button className="button" onClick={handleClick}>Delete</button>
                )
            ) : (
                <p>No item selected.</p>
            )}
        </div>
    );
}

export default DeleteItem;
