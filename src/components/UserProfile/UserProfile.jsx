import { Component } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import UserDetails from "../UserDetails/UserDetails";

import { AiFillLike } from "react-icons/ai";

import "./UserProfile.css"

class UserProfile extends Component {
    state = { stories: [], loading: true, error: "" };

    componentDidMount() {
        this.getUserStories();
    }

    getUserStories = async () => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                this.setState({
                    error: "No token found, please login again",
                    loading: false,
                });
                return;
            }

            const res = await axios.get("http://localhost:4000/userstoryonly", {
                headers: {
                    "x-token": token,
                },
            });

            this.setState({ stories: res.data, loading: false });
        } catch (err) {
            console.error(err);
            this.setState({ error: "Failed to fetch stories", loading: false });
        }
    };

    timeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return `${seconds} sec ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
        const years = Math.floor(months / 12);
        return `${years} year${years > 1 ? "s" : ""} ago`;
    };

    removeStory = async (id) => {
        try {
            const token = Cookies.get("token");
            if (!token) return alert("No token found");

            await axios.delete(`http://localhost:4000/userstory/${id}`, {
                headers: { "x-token": token },
            });

            // Update state (remove from UI immediately)
            this.setState((prev) => ({
                stories: prev.stories.filter((story) => story._id !== id),
            }));
        } catch (err) {
            console.error(err);
            alert("Failed to delete story");
        }
    };

    render() {
        const { loading, error, stories } = this.state;
        const lenofstories = stories.length
        return (
            <>
                <UserDetails />
                <div className="pro-container">
                    {loading && <div className="loader"></div>}
                    {error && <p>{error}</p>}
                    <ul className="pro-ul">
                        {lenofstories > 0 ? (
                            stories.map((story) => (
                                <li key={story._id} className="pro-li">
                                    <h1 className="pro-name" > {story.storiename} </h1>
                                    <p className="pro-storie"> {story.userstory}</p>
                                    <div className="pro-likes-timer-container">
                                        <p className="pro-time">{this.timeAgo(story.createdAt)}</p>
                                        <div className="pro-like-container">
                                            <AiFillLike className="pro-like-icon" />
                                            {story.likes || 0}
                                        </div>
                                    </div>
                                    <button className="pro-remove-btn" onClick={() => this.removeStory(story._id)}>remove</button>
                                </li>
                            ))
                        ) : (
                            <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>Your not wirte a stories</p>
                        )}

                    </ul>
                </div>
            </>
        );
    }
}

export default UserProfile;
