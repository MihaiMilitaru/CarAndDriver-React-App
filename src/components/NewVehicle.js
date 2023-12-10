import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../firebase';
import './NewVehicle.css'

const AddVehicle = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const handleAddVehicle = async (e) => {
        e.preventDefault();

        // Upload image to Firebase Storage
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`vehicle_images/${image.name}`);
        await imageRef.put(image);
        const imageUrl = await imageRef.getDownloadURL();

        try {
            const vehiclesCollection = firebase.firestore().collection('vehicles');
            await vehiclesCollection.add({
                name,
                description,
                price,
                imageUrl,
            });

            // Redirect back to the vehicle list after adding
            history.push('/');
        } catch (error) {
            console.error('Error adding new vehicle:', error);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div className="card-edit">
            <h2>Add Vehicle</h2>
            <form onSubmit={handleAddVehicle}>
                <label>
                    Name:
                    <br></br>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Description:
                    <br></br>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label>
                    Price:
                    <br></br>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <label>
                    Image:
                    <br />
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddVehicle;