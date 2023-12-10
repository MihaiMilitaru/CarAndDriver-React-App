import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase, { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import "./EditVehicle.css";

const EditVehicle = () => {
    const { id } = useParams();
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const vehicleDoc = await firebase.firestore().collection('vehicles').doc(id).get();
                const vehicleData = vehicleDoc.data();
                setName(vehicleData.name);
                setDescription(vehicleData.description);
                setPrice(vehicleData.price);
            } catch (error) {
                console.error('Error fetching vehicle details:', error);
            }
        };

        fetchVehicle();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const vehiclesCollection = firebase.firestore().collection('vehicles');
            const updateData = {
                name,
                description,
                price,
            };

            // Update only if a new image is selected
            if (image) {
                const storageRef = firebase.storage().ref();
                const imageRef = storageRef.child(`vehicle_images/${image.name}`);
                await imageRef.put(image);
                const imageUrl = await imageRef.getDownloadURL();
                updateData.imageUrl = imageUrl;
            }

            await vehiclesCollection.doc(id).update(updateData);

            history.push('/');
            // Redirect or navigate back to the vehicle list after updating
            // You can use react-router-dom's history or Redirect component for this purpose
        } catch (error) {
            console.error('Error updating vehicle details:', error);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };


    return (
        <div className="card-edit">
            <h2>Edit Vehicle</h2>
            <form onSubmit={handleUpdate}>
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
                    Upload Image:
                    <br />
                    <input type="file" onChange={handleImageChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EditVehicle;