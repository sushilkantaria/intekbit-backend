import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlogForm from "../components/BlogForm";

function CreateBlog() {
  const [blog, setBlog] = useState({
    title: "",
    image: "",
    description: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/addblogs", blog);
      navigate("/");
    } catch (err) {
      console.error("Error creating blog:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      <BlogForm blog={blog} setBlog={setBlog} handleSubmit={handleSubmit} />
    </div>
  );
}

export default CreateBlog;
