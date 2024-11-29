import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Swal from 'sweetalert2'

const Write = () => {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
       

      navigate("/");
      Swal.fire({
        position: "middle",
        icon: "success",
        title: "Successfully Published",
        showConfirmButton: false,
        timer: 1500
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex gap-8 p-8 mt-32 bg-gray-50 min-h-screen">
      {/* Left Section */}
      <div className="flex-1">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="input input-bordered w-full mb-4 text-sm md:text-lg"
        />
        <div className="md:h-96 sm:h-36 mb-4">
          <ReactQuill className="h-96" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/4 -mt-6 space-y-6">
        {/* Publish Section */}
        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Publish</h2>
          <p>
            <b>Status:</b> Draft
          </p>
          <p>
            <b>Visibility:</b> Public
          </p>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label
            htmlFor="file"
            className="link text-amber-500 cursor-pointer mt-2 inline-block"
          >
            Upload Image
          </label>
          <div className="sm:flex-col lg:flex gap-2 mt-4">
            <span className="btn btn-outline ">Save as draft</span>
            <span className="btn  bg-amber-400" onClick={handleClick}>
              Publish
            </span>
          </div>
        </div>

        {/* Category Section */}
        <div className="p-4 border sm:rounded-none lg:rounded-lg bg-white shadow-sm">
          <h2 className=" font-semibold mb-2">Category</h2>
          {["art", "science", "technology", "cinema", "design", "food"].map(
            (category) => (
              <div key={category} className="flex items-center mb-2">
                <input
                  type="radio"
                  checked={cat === category}
                  name="cat"
                  value={category}
                  id={category}
                  onChange={(e) => setCat(e.target.value)}
                  className="radio radio-warning mr-2"
                />
                <label htmlFor={category} className="cursor-pointer">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Write;
