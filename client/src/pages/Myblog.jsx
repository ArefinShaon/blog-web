/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import EditImage from "../images/edit.png";
import DeleteImage from "../images/delete.png";
import Swal from 'sweetalert2'

const MyBlog = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch posts created by the current user when the component mounts.
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(`/posts?userId=${currentUser.id}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser) {
      fetchUserPosts();
    }
  }, [currentUser]);

  // Handler function for deleting a blog post.
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/posts/${postId}`);
      // Update the state to remove the deleted post from the UI.
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      Swal.fire({
        position: "middle",
        icon: "success",
        title: "Successfully Deleted",
        showConfirmButton: false,
        timer: 1500
      })
    } catch (err) {
      console.log(err);
    }
  };

  // Render the posts in a table format.
  return (
    <div className="p-4 mb-10 mt-20">
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <table className="min-w-full bg-white border border-black-400">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">#</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id}>
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={`../upload/${post.img}`}
                    alt="post cover"
                    className="w-16 mx-auto h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4  font-bold border-b">
                  {post.title}
                </td>
                <td className="py-5 justify-center px-4 border-b flex space-x-2">
                  <Link to={`/write?edit=${post.id}`} state={post}>
                    <img
                      src={EditImage}
                      alt="edit"
                      className="w-10 h-10 cursor-pointer"
                    />
                  </Link>
                  <img
                    onClick={() => handleDelete(post.id)}
                    src={DeleteImage}
                    alt="delete"
                    className="w-10 h-10 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBlog;
