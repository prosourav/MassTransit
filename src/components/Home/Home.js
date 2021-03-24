import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Home.css";
import fakeData from '../../Fakedata/fakeData.json';
import Vehicle from "../Vehicle/Vehicle";
import { UserContext } from "../../App";
const Home = () => {
  const [vehicle,setVehicle]=useState([]);
  useEffect(()=>{
      setVehicle(fakeData);
  },[]);
  const [loggedInUser,setLoggedInUser] = useContext(UserContext);  
  // console.log("user from Home: ",vehicle.id);
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

