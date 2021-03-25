import React, { useContext } from 'react';
import { Button,  Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Home = () => {
  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  console.log(setLoggedInUser);
  const history = useHistory();
  const handleOnClick = () =>{
    const url = "/login";
    history.push(url);
  }
    return (
        <div className="heading">
        <Navbar  expand="lg" className="container">
  <Navbar.Brand to="#home" className="heading" style={{fontSize:"28px"}}>MassTransit</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto" >
      <Link to="/home" className="mr-5 size">Home</Link>
      <Link to="/" className="mr-5 size">Destination</Link>
      <Link to="/" className="mr-5 size">Blog</Link>
      <Link to="/" className="mr-5 size">Contact</Link>
    </Nav>
  </Navbar.Collapse>
  {!loggedInUser.isSignedIn ?  <Button onClick={handleOnClick} className="login">Login</Button> : <p style={{background:"green",color:"white",marginTop:"12px",borderRadius:"7px",padding:"14px 15px"}}>{loggedInUser.name}</p>}
</Navbar>
        </div>
    );
};

export default Home;