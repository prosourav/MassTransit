import React, { useState } from 'react';
import { useParams } from 'react-router';
import Header from '../Header/Header';
import fakeData from '../../Fakedata/fakeData.json';
import './Destination.css'
import Map from '../Map/Map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserFriends} from '@fortawesome/free-solid-svg-icons';


const Search = () => {
    const [search, setSearch] = useState(false);
    const [pickUp, setPickUp] = useState(false);
    const [pickTo, setPickTo] = useState(false);
    const {vehicleType} = useParams();
    const vehicleInfo = fakeData.find(data=> data.name === vehicleType);
    const{name, price, seat} = vehicleInfo;

    const handleOnBlur = (e) =>{
     if(e.target.name==="pickFrom"){
       const  value = e.target.value;
       const pickUp = value.length ? true : false;
       if(pickUp){
        setPickUp(true);}
     }
     if(e.target.name==="pickTo"){
      const  value = e.target.value;
      const pickTo = value.length ? true : false
      if(pickTo){
        setPickTo(true);
      }
    }
    
    }
    const handleClick = () =>{
      if(pickUp && pickTo){
      setSearch(true); }
    }
    // console.log(pickUp,pickTo);
    return (
        <div>
           <Header></Header>
           <div className="container">
              <div className="search-box">
                    <label>Pick From</label><br/>
                    <input onBlur={handleOnBlur} name="pickFrom" type="text"/><br/>
                    <label>Pick To</label><br/>
                    <input onBlur={handleOnBlur}  name="pickTo" type="text"/><br/>
                   <input className="search" type="submit" value="submit" onClick={handleClick}/>
              
                  {search &&
                <div>
                  <div className="vehicle-info"> 
                    <div className="info">
                    <div className="single-info">  {name}</div>
                      <div className="single-info"> <FontAwesomeIcon icon={faUserFriends} />  {seat}</div>
                      <div className="single-info">  ${price}</div>
                    </div>
                      
                  </div>
                  
                  <div className="vehicle-info"> 
                    <div className="info">
                    <div className="single-info">  {name}</div>
                      <div className="single-info"> <FontAwesomeIcon icon={faUserFriends} />  {seat}</div>
                      <div className="single-info">  ${price}</div>
                    </div>
                      
                  </div>
                  
                  
                  </div>
                
                } 
                  </div>
                  <div className="map-space">
                      <Map></Map>
                  </div>
                </div>

                
             
                
           
        </div>
    );
};

export default Search;
            