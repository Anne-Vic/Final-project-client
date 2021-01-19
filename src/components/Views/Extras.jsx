import React, { Component } from 'react';
import apiHandler from "../../api/apiHandler";
import NavTop from '../NavTop';
import NavBottom from '../NavBottom';
import PopUp from '../../components/PopUp.jsx';
import { withUser } from "../Auth/withUser";

import "../../styles/NavBar.css"

// class Extras extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           display : "hidden"
//         };
//         const { context } = props;
//         this.handleLogout = this.handleLogout.bind(this);
//       }

  

//   handleLogout = () => {
//     apiHandler
//       .logout()
//       .then(() => {
//         this.context.removeUser();
//         this.props.history.push("/")
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   render () {
//   return (
//     <nav >
//         <NavTop/>
//         <div className="Extras">
//             <button >Stat</button>
//             <button >Chrono</button>
//             <button >Update profile</button>
//             <button onClick={this.handleLogout}>Logout</button>
//         </div>
//         <NavBottom/>
//     </nav>
//   )
// }
// }

// export default withUser(Extras);

const Extras = (props) => {
    const { context } = props;
    
  
    function handleLogout() {
      apiHandler
        .logout()
        .then(() => {
          context.removeUser();
          props.history.push("/")
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // function handlePopUp() {
    //   if (this.state.display )
    // }
  
    return (
      <nav >
          <NavTop/>
          <div className="Extras">
              <button /*onClick={handlePopUp} style={{display: this.state.display}}*/>Stat</button>
              <button /*onClick={handlePopUp} style={{display: this.state.display}}*/>Chrono</button>
              <button /*onClick={handlePopUp} style={{display: this.state.display}}*/>Update profile</button>
              <button onClick={handleLogout} /*style={{display: this.state.display}}*/>Logout</button>
              <PopUp display="none"/>
          </div>
          <NavBottom path={props.history.location.pathname}/>
      </nav>
    );
  };
  
  export default withUser(Extras);