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
      await axios.post("https://intekbit-backend.onrender.com/api/addblogs", blog);
      navigate("/");
    } catch (err) {
      console.error("Error creating blog:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white/90 border border-purple-200 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center drop-shadow">Create Blog</h1>
        <BlogForm blog={blog} setBlog={setBlog} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default CreateBlog;
