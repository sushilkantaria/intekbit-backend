import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "../components/BlogForm";

function EditBlog() {
  const [blog, setBlog] = useState({ title: "", content: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blog/${id}`).then((res) => setBlog(res.data.blog));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/blog/${id}`, blog);
    navigate("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <BlogForm blog={blog} setBlog={setBlog} handleSubmit={handleSubmit} />
    </div>
  );
}

export default EditBlog;
