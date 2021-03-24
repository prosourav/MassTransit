import React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
import './Vehicle.css';

const Vehicle = (props) => {
  const { name, img } = props.vehicle;
  const design = {
    height: "150px",
    width: "280px",
    padding:"20px"
  };
 
  const history = useHistory();
    const handleOnClick = () =>{
    const url =`/destination/${name}`;
    history.push(url);
    console.log(name);
  }
  return (
    <div className="flex" onClick={handleOnClick}>
   
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} style={design} />
        <Card.Body>
          <Card.Title style={{textAlign:"center",fontSize:"30px"}}>{name} </Card.Title>
 
        </Card.Body>
      </Card>
    
    </div>
  );
};

export default Vehicle;
