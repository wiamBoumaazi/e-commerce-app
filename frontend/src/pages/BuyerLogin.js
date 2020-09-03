
import React from "react"
import { connect } from "react-redux";
import {Form, Button} from "react-bootstrap"
import {Redirect} from "react-router-dom"
import {
  setUserid,
  setUseremail,
  setPassword,
  login,
  signup,
  itemListA,
} from "../redux/actions/buyerActions";
import "./BuyerLogin.css";

const BuyerLogin = ({
  userid,
  useremail,
  password,
  userType,
  isLoggedIn,
  loadingState,
  dispatch,
  errorMessage,
  isBuyer,
}) => { 
    
  if (isLoggedIn)  {
    dispatch(itemListA());
    return <Redirect to="/buyer" />;
  }
  
  if (loadingState === "loading") {
    return <h2 className="header-center">Loading...</h2>;
  }
    
    return(
    <div className="Buyer-Input">
        <h2>Welcome to Hot Ware</h2>
        🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊
        <h3>👛💳Buyer Page💳👛</h3>
        🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊
        <p><br></br><br></br><br></br><br></br><br></br></p>
        <h5>Already have an account?  Please log in!</h5>
        
      <Form>
        <Form.Group >
        <Form.Label>User Id</Form.Label>
        <Form.Control  placeholder="Enter a user name or ID" 
        value={userid}
        onChange={(e) => dispatch(setUserid(e.target.value))}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        value={password}
        onChange={(e) => dispatch(setPassword(e.target.value))}/>
        </Form.Group>
      
        <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" 
        value={useremail}
        onChange={(e) => dispatch(setUseremail(e.target.value))}
        />
        </Form.Group>
      
  <Button variant="primary" type="submit" onClick={() => dispatch(signup()) }>
    Sign Up!
  </Button> 
  <Button variant="primary" type="submit" onClick={() => dispatch(login())}>
    Login
  </Button>
  
  <div>{loadingState === "error" && <b>{errorMessage}</b>}</div>
  
</Form>
  

        </div>
        
       );
};

const connection = (state) => {
  
  return {
    userid: state.buyerReducer.userid,
    useremail:state.buyerReducer.useremail,
    password: state.buyerReducer.password,
    userType:state.buyerReducer.userType,
    isLoggedIn: state.buyerReducer.isLoggedIn,
    loadingState: state.buyerReducer.loadingState,
    errorMessage: state.buyerReducer.errorMessage,
    isBuyer: state.buyerReducer.isBuyer,
    
  
  };
};

export default connect(connection)(BuyerLogin);
