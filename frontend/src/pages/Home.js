import React from "react";
import { form, Button } from "react-bootstrap";
import "./Home.css";




import { store } from "react-notifications-component"
import "animate.css"
import 'react-notifications-component/dist/theme.css'

const Home = () => {
 
  return (
    <div className="content">
       
      
      <p>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </p>
      🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
      <h2>Welcome to Hot Ware</h2>
      🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
      <b>What would you like to do?</b>
      <div className="d-flex justify-content-around pt-2">
        <div>
          <form action="/buyerlogin">
            <Button variant="primary" type="submit">
              Buy
            </Button>
          </form>
        </div>
        <div>
          <form action="/sellerlogin">
            <Button variant="primary" type="submit">
              Sell
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
