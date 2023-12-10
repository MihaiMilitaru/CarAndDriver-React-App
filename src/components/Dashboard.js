import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase";

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehiclesCollection = firebase.firestore().collection("vehicles");
        const snapshot = await vehiclesCollection.get();

        const vehiclesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          imageUrl: doc.data().imageUrl,
        }));

        setVehicles(vehiclesData);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    try {
      const vehiclesCollection = firebase.firestore().collection("vehicles");
      await vehiclesCollection.doc(id).delete();
      // Refresh the vehicle list after deletion
      const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== id);
      setVehicles(updatedVehicles);
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when the search query changes
  };

  // Filter and sort the vehicles
  const filteredAndSortedVehicles = vehicles
      .filter((vehicle) =>
          vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;

        if (sortOption === "asc") {
          return priceA - priceB;
        } else {
          return priceB - priceA;
        }
      });

  // Pagination logic
  const indexOfLastVehicle = currentPage * itemsPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - itemsPerPage;
  const currentVehicles = filteredAndSortedVehicles.slice(
      indexOfFirstVehicle,
      indexOfLastVehicle
  );

  const totalPages = Math.ceil(filteredAndSortedVehicles.length / itemsPerPage);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
      <div className="box-container">
        <h2>Vehicles</h2>
        <div className="inputs-box">
          <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearch}
          />
          <select value={sortOption} onChange={handleSortChange}>
            <option value="asc">Sort by Price (Low to High)</option>
            <option value="desc">Sort by Price (High to Low)</option>
          </select>
        </div>
        <div className="vehicle-container">
          {currentVehicles.map((vehicle) => (
              <div key={vehicle.id} className="vehicle-card">
                <h3>{vehicle.name}</h3>
                <br />
                <img
                    src={vehicle.imageUrl}
                    alt={vehicle.name}
                />
                <p>{vehicle.description}</p>
                <p>Price: ${vehicle.price}</p>
                <div className="buttons-container">
                  <Link to={`/edit-vehicle/${vehicle.id}`}>
                    <button className="blue-button">Edit</button>
                  </Link>
                  <button
                      className="red-button"
                      onClick={() => handleDelete(vehicle.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
          ))}
        </div>
        <br></br>
        <br></br>
        <div className="pagination">
          <button
              className="first"
              onClick={() => paginate(1)}
          >
            &lt;&lt;
          </button>
          <button
              className="prev"
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
          >
            &lt;
          </button>
          <button
              className="active"
              onClick={() => paginate(currentPage)}
          >
            {currentPage}
          </button>
          <button
              className="next"
              onClick={() =>
                  currentPage < Math.ceil(filteredAndSortedVehicles.length / itemsPerPage) &&
                  paginate(currentPage + 1)
              }
              disabled={currentPage === Math.ceil(filteredAndSortedVehicles.length / itemsPerPage)}
          >
            &gt;
          </button>
          <button
              className="last"
              onClick={() => paginate(totalPages)}
          >
            &gt;&gt;
          </button>
        </div>
        <br></br>
      </div>
  );
}
