import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  if (!post) return <div>Loading...</div>;
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className="md:mt-20 mt-20 px-6 py-6 md:py-10 md:px-16">
     
      <div className="mb-10">
        <h1 className="text-xl md:text-2xl font-bold md:w-1/2 hover:underline">
          {post.title}
        </h1>
        <div>
          <p>
            By <span className="my-2 font-bold">{post.username || "Unknown"}</span>
          </p>
          <p>
            Email: <span className="font-bold">{post.username || "N/A"}</span>
          </p>
        </div>
      </div>
      <div className="mx-auto">
        {post.img && (
          <img
            src={`../upload/${post.img}`}
            alt="Post cover"
            className="w-full md:w-auto h-auto max-w-4xl mx-auto"
          />
        )}
        <div className="mt-2 flex justify-end font-bold px-4 lg:px-56">
          <p className="px-4">
            Uploaded - {moment(post.date).format("MMMM DD, YYYY")}
          </p>
          <p>• 5 min read</p>
        </div>
      </div>
      <div className="">
        <h1 className="font-bold md:w-4/6 py-4 text-center md:text-xl mx-auto">
          Explore our diverse range of topics, from technology and science to art
          and culture, for an enriching and inspiring experience.
        </h1>
        <p className="w-full md:w-4/6 text-center mx-auto md:text-xl">
        <i>"{getText(post.desc)}"</i>
        </p>
      </div>
    </div>
  );
};

export default Single;
