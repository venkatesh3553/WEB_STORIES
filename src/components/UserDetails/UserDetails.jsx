import { Component } from "react";
import Cookies from 'js-cookie'
import axios from "axios";
import Navbar from "../Navbar/Navbar";

class UserDetails extends Component {
    state = { userDetails: "" }

    componentDidMount() {
        this.getUserDetails()
    }
    getUserDetails = async () => {
        const token = Cookies.get("token")
        try {
            const res = await axios.get('http://localhost:4000/userprofile', {
                headers: {
                    'x-token': token
                }
            })
            this.setState({ userDetails: res.data })
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }
    render() {
        return (
            <>
                <Navbar />
                <h1 style={{marginLeft:"10px"}}>{this.state.userDetails.username || "User!"}</h1>
            </>
        )
    }
}
export default UserDetails