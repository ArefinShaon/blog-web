/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import pic from "../images/user.jpg";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const cat = useLocation().search;
  const [visiblePosts, setVisiblePosts] = useState(6); // Number of initially visible posts

  const handleSeeMore = () => {
    setVisiblePosts(posts.length); // Show all posts
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
        setError(null); // Clear any previous error
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load posts. Please try again later.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="mt-12 py-4">
        <div className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              className="banner-img"
              src={pic}
              height={500}
              width={500}
              alt="image"
            />
            <div>
              <h1 className="text-5xl font-bold">Hello! This is Writely.</h1>
              <p className="py-6">
                Welcome to Writely, a captivating blog webpage featuring
                thought-provoking articles and captivating stories. Explore our
                diverse range of topics, from technology and science to art and
                culture, for an enriching and inspiring experience.
              </p>
              <input
                type="text"
                placeholder="Enter your email"
                className="input input-bordered w-full max-w-xs"
              />
              <button className="btn btn-success bg-amber-300 text-black mx-2 my-2">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-8 px-8">
        {posts.slice(0, visiblePosts).map((post, index) => (
          <div
            key={post.id}
            className={`flex flex-col  md:flex-row items-center ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="relative inline-block mx-16">
              {/* Background shadow element */}
              <div className="absolute inset-0 bg-orange-200 -translate-x-4 -translate-y-4 transform rounded-lg"></div>
              {/* Image Section */}
              <img
                src={`../upload/${post.img}`}
                height={600}
                width={600}
                alt="post cover"
                className="relative z-10 rounded-lg shadow-lg"
              />
            </div>

            {/* Content Section */}
            <div className="md:w-2/3 p-10 mx-10 mt-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                <Link to={`/post/${post.id}`} className="hover:text-amber-400">
                  {post.title}
                </Link>
              </h2>
              {/* Description with word limit */}
              <p className="text-gray-600 mb-4">
                {getText(post.desc).split(" ").slice(0, 30).join(" ")}...
              </p>
              <Link to={`/post/${post.id}`}>
                <button className="btn bg-amber-300 hover:bg-amber-400 text-black">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
        {visiblePosts < posts.length && (
          <div className="text-center mt-6">
            <button
              onClick={handleSeeMore}
              className="btn bg-amber-300 hover:bg-amber-400 text-black"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
