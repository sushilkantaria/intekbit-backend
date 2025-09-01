// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import BlogForm from "../components/BlogForm";

// export const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";


// function EditBlog() {
//   const [blog, setBlog] = useState({ title: "", content: "" });
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`https://intekbit-backend.onrender.com/api/blog/${id}`).then((res) => setBlog(res.data.blog));
//   }, [id]);

//   const handleSubmit = async (e) => { 
//     e.preventDefault();
//     await axios.put(`https://intekbit-backend.onrender.com/api/blog/${id}`, blog);
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center py-10 px-4">
//       <div className="w-full max-w-2xl bg-white/90 border border-purple-200 rounded-2xl shadow-2xl p-8">
//         <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center drop-shadow">Edit Blog</h1>
//         <BlogForm blog={blog} setBlog={setBlog} handleSubmit={handleSubmit} />
//       </div>
//     </div>
//   );
// }

// export default EditBlog;
























// // admin/src/pages/EditBlog.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import BlogForm from "../components/BlogForm";

// const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// function EditBlog() {
//   const [blog, setBlog] = useState({ title: "", description: "", image: "" });
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Load existing blog
//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await axios.get(`${API_BASE}/api/blog/${id}`);
//         if (data?.success) {
//           // If backend returns a relative path, make it absolute for preview
//           const img = data.blog?.image;
//           const fixedImg =
//             img && img.startsWith("/uploads") ? `${API_BASE}${img}` : img;

//           setBlog({ ...data.blog, image: fixedImg });
//         } else {
//           alert("Failed to load blog");
//         }
//       } catch (e) {
//         console.error("Load blog failed:", e?.response?.data || e.message);
//         alert(e?.response?.data?.message || "Failed to load blog");
//       }
//     })();
//   }, [id]);

//   // BlogForm will call handleSubmit(e, imageFile)
//   const handleSubmit = async (e, imageFile) => {
//     e.preventDefault();
//     try {
//       const form = new FormData();
//       form.append("title", blog.title);
//       form.append("description", blog.description);
//       if (imageFile) form.append("image", imageFile); // only if user picked a new one

//       const { data } = await axios.put(`${API_BASE}/api/blog/${id}`, form);
//       if (!data?.success) {
//         alert(data?.message || "Failed to update blog");
//         return;
//       }
//       navigate("/");
//     } catch (err) {
//       console.error("Error updating blog:", err?.response?.data || err.message);
//       alert(err?.response?.data?.message || "Error updating blog");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center py-10 px-4">
//       <div className="w-full max-w-2xl bg-white/90 border border-purple-200 rounded-2xl shadow-2xl p-8">
//         <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center drop-shadow">
//           Edit Blog
//         </h1>
//         <BlogForm blog={blog} setBlog={setBlog} handleSubmit={handleSubmit} isEdit />
//       </div>
//     </div>
//   );
// }

// export default EditBlog;
















import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "../components/BlogForm";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function EditBlog() {
  const [blog, setBlog] = useState({ title: "", description: "", image: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  // Load existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/blog/${id}`);
        if (data?.success) {
          // If backend returns a relative path, make it absolute for preview
          const img = data.blog?.image;
          const fixedImg =
            img && img.startsWith("/uploads") ? `${API_BASE}${img}` : img;

          setBlog({ ...data.blog, image: fixedImg });
        } else {
          alert("Failed to load blog");
        }
      } catch (e) {
        console.error("Load blog failed:", e?.response?.data || e.message);
        alert(e?.response?.data?.message || "Failed to load blog");
      }
    };

    fetchBlog();
  }, [id]);

  // BlogForm will call handleSubmit(e, imageFile)
  const handleSubmit = async (e, imageFile) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("title", blog.title);
      form.append("description", blog.description || ""); // Ensure description is passed as a string
      if (imageFile) form.append("image", imageFile); // only if user picked a new one

      const { data } = await axios.put(`${API_BASE}/api/blog/${id}`, form);
      if (!data?.success) {
        alert(data?.message || "Failed to update blog");
        return;
      }
      navigate("/"); // redirect to the home or blog list page
    } catch (err) {
      console.error("Error updating blog:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Error updating blog");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white/90 border border-purple-200 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center drop-shadow">
          Edit Blog
        </h1>
        {/* Pass the blog state and handler to BlogForm */}
        <BlogForm blog={blog} setBlog={setBlog} handleSubmit={handleSubmit} isEdit />
      </div>
    </div>
  );
}

export default EditBlog;
