import { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

import Navbar from '../Navbar/Navbar';
import "./Home.css"

class Home extends Component {
    state = {
        stories: [],
        loading: true,
        error: "",
        userId: ""   // ✅ store logged-in user's ID
    };

    componentDidMount() {
        this.getUserProfile();
        this.getStorys();
    }

    getUserProfile = async () => {
        try {
            const token = Cookies.get("token");
            if (!token) return;

            const res = await axios.get("http://localhost:4000/userprofile", {
                headers: { "x-token": token }
            });

            this.setState({ userId: res.data._id });
        } catch (err) {
            console.error("Failed to fetch user profile", err);
        }
    };

    getStorys = async () => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                this.setState({ error: "No token found, please login again", loading: false });
                return;
            }

            const res = await axios.get("http://localhost:4000/userstory", {
                headers: {
                    "x-token": token
                }
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

    toggleLikeStory = async (id, alreadyLiked) => {
        try {
            const token = Cookies.get("token");
            if (!token) return alert("No token found");

            const url = alreadyLiked
                ? `http://localhost:4000/userstory/${id}/unlike`
                : `http://localhost:4000/userstory/${id}/like`;

            const res = await axios.post(
                url,
                {},
                { headers: { "x-token": token } }
            );

            this.setState((prev) => ({
                stories: prev.stories.map((story) =>
                    story._id === id
                        ? {
                            ...story, likes: res.data.likes,
                            likedBy: alreadyLiked
                                ? story.likedBy.filter(uid => uid !== this.state.userId)
                                : [...story.likedBy, this.state.userId]
                        }
                        : story
                ),
            }));
        } catch (err) {
            alert("Action failed");
        }
    };
    render() {
        const { stories, loading, error, userId } = this.state;
        const lenofstories = stories.length
        // console.log(lenofstories)
        return (
            <>
                <div className='home-bg'>
                    <Navbar />
                    <div className="home-container">
                        <h2 className='home-head'>Your Stories</h2>

                        {loading && <div className="loader"></div>}
                        {error && <p>{error}</p>}

                        <ul className="home-ul">
                            {lenofstories > 0 ? (
                                stories.map((story) => {
                                    const alreadyLiked = story.likedBy?.includes(userId);
                                    return (
                                        <li key={story._id} className="home-li">
                                            <h1 className="home-usernamme">{story.userId?.username || "Unknown User"}</h1>
                                            <h1 className="home-storie-name">{story.storiename}</h1>
                                            <p className="home-storie">{story.userstory}</p>

                                            <div className="time-and-like-container">
                                                <small>{this.timeAgo(story.createdAt)}</small>

                                                <div className="like-container">
                                                    {alreadyLiked ? (
                                                        <AiFillLike
                                                            className={`like-icon ${alreadyLiked ? "liked" : ""}`}
                                                            onClick={() => this.toggleLikeStory(story._id, alreadyLiked)}
                                                        />
                                                    ) : (
                                                        <AiOutlineLike
                                                            className={`like-icon ${alreadyLiked ? "liked" : ""}`}
                                                            onClick={() => this.toggleLikeStory(story._id, alreadyLiked)}
                                                        />
                                                    )}
                                                    {story.likes || 0}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })
                            ) : (
                                <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>Your not wirte a stories</p>
                            )}
                        </ul>

                    </div>
                </div>
            </>
        );
    }
}

export default Home;
