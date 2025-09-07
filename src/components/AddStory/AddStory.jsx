import { Component } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./AddStory.css"

class AddStory extends Component {
    state = { userStory: "", storiename: "" };

    postStory = async () => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                toast.error("Login First");
                return;
            }

            const res = await axios.post(
                "http://localhost:4000/userstory",
                {
                    userstory: this.state.userStory,
                    storiename: this.state.storiename
                },
                {
                    headers: {
                        "x-token": token,
                    },
                }
            );

            toast.success("Story posted successfully ");
            console.log(res.data);
            this.setState({ userStory: "", storiename: "" });
        } catch (err) {
            console.error(err);
            toast.error("Failed to post story");
        }
    };

    render() {
        return (
            <>
                <Navbar />
                <h1 className="as-head">Add Your Story</h1>
                <input className="as-iinput" onChange={(e) => this.setState({ storiename: e.target.value })}
                    type="text" placeholder="Storie Name" value={this.state.storiename} />
                <textarea
                    className="as-textarea"
                    value={this.state.userStory}
                    onChange={(e) => this.setState({ userStory: e.target.value })}
                    placeholder="Write your story..."
                    rows="5"
                    cols="40"
                />

                <button className="as-post-storie-btn" onClick={this.postStory}>Post Story</button>
                <ToastContainer position="top-right" theme="dark" autoClose={2000} />

            </>

        );
    }
}

export default AddStory;
