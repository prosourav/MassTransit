import React, {  useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Home.css";
import fakeData from '../../Fakedata/fakeData.json';
import Vehicle from "../Vehicle/Vehicle";

const Home = () => {
  const [vehicle,setVehicle]=useState([]);
  useEffect(()=>{
      setVehicle(fakeData);
  },[]);

  return (
    <div className="home">
      <Header></Header>
      <div className="transport">
       {
         vehicle.map(vehicle=><Vehicle vehicle={vehicle} key={vehicle.name} ></Vehicle>)
       }
      </div>
    </div>
  );
};

export default Home;

