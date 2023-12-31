import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';

  const columns = [
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'popularity', headerName: 'Popularity', width: 150, type: 'number' },
  ];

  function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      axios.get('https:s3.amazonaws.com/open-to-cors/assignment.json')
        .then(response => {
          const fetchedProducts = response.data.products;
          const processedProducts = Object.values(fetchedProducts)
            .map((product, index) => ({ id: index, ...product }))
            .sort((a, b) => b.popularity - a.popularity);
          setProducts(processedProducts);
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
    }, []);

    return (
      <><h2 style={{marginLeft:'750px',marginTop:'100px'}}>Data from the API</h2>
      <div style={{ height: 600, width: '50%', paddingLeft: '25%', paddingTop: '5%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={10} />
      </div></>
    );
  }

export default App;
