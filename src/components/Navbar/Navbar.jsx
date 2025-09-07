import { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CiHome } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { MdAutoStories } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

import "./Navbar.css"

class Navbar extends Component {
  state = { userDetails: "" };

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get('http://localhost:4000/userprofile', {
        headers: {
          'x-token': token
        }
      });
      // console.log(response);
      // Set the user details in state
      this.setState({ userDetails: response.data });

    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  logout = () => {
    Cookies.remove("token");
    window.location.href = "/";
    toast.success("Logout Successful");
  };

  render() {
    // const { userDetails } = this.state;

    return (
      <>
        <div className="navbar-container">
          {/* <h1 className='nav-'>Welcome {userDetails.username || "User"}!</h1> */}
          <Link className="navbar-head-link" to="/"> <CiHome className='nav-icons' /></Link>
          <Link className="navbar-head-link" to="/addstore"><MdAutoStories className='nav-icons' /></Link>
          <Link className="navbar-head-link" to='/userprofile'><CgProfile className='nav-icons' /></Link>
          <button  onClick={this.logout} className='logout-btn'> <IoIosLogOut className='logout-icon' /></button>
        </div>
        <ToastContainer position="top-right" theme="dark" autoClose={2000} />

      </>
    );
  }
}

export default Navbar;
