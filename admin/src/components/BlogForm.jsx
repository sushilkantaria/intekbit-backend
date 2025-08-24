  // function BlogForm({ blog, setBlog, handleSubmit }) {
  //   // Removed JoditEditor, using textarea instead

  //   const handleImageChange = (e) => {
  //     const file = e.target.files[0];
  //     if (!file) return;

  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setBlog({ ...blog, image: reader.result });
  //     };
  //     reader.readAsDataURL(file);
  //   };

  //   return (
  //     <form onSubmit={handleSubmit} className="space-y-6 w-full mx-auto">
  //       {/* Title */}
  //       <input
  //         type="text"
  //         placeholder="Enter blog title"
  //         value={blog.title}
  //         onChange={(e) => setBlog({ ...blog, title: e.target.value })}
  //         className="w-full p-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400 text-lg"
  //         required
  //       />

  //       {/* Image */}
  //       <input
  //         type="file"
  //         accept="image/*"
  //         onChange={handleImageChange}
  //         className="w-full p-2 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400"
  //         required
  //       />
  //       {/* Image Preview Container */}
  //       {blog.image && (
  //         <div className="inline-block border-2 border-purple-200 rounded-xl p-2 w-fit bg-purple-50">
  //           <img
  //             src={blog.image}
  //             alt="Preview"
  //             className="max-w-[120px] max-h-[120px] object-cover rounded-xl shadow"
  //           />
  //         </div>
  //       )}

  //       {/* Description (Simple textarea) */}
  //       <textarea
  //         placeholder="Enter blog description"
  //         value={blog.description}
  //         onChange={(e) => setBlog({ ...blog, description: e.target.value })}
  //         className="w-full p-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400 text-lg min-h-[120px] bg-purple-50"
  //         required
  //       />

  //       {/* Submit */}
  //       <button
  //         type="submit"
  //         className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl shadow font-bold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 border border-blue-300"
  //       >
  //         Save Blog
  //       </button>
  //     </form>
  //   );
  // }

  // export default BlogForm;








//   import { useEffect, useMemo, useState } from "react";

// function BlogForm({ blog, setBlog, handleSubmit, isEdit = false }) {
//   // Keep file object separate from blog state
//   const [imageFile, setImageFile] = useState(null);

//   // Build a preview URL: new file > existing url/path
//   const previewUrl = useMemo(() => {
//     if (imageFile) return URL.createObjectURL(imageFile);
//     if (blog?.image) return blog.image; // e.g. "/uploads/123_name.png"
//     return null;
//   }, [imageFile, blog?.image]);

//   useEffect(() => {
//     // Revoke object URL on unmount / file change
//     return () => {
//       if (previewUrl && imageFile) URL.revokeObjectURL(previewUrl);
//     };
//   }, [previewUrl, imageFile]);

//   const onImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setImageFile(file);
//   };

//   const onSubmit = (e) => {
//     // Pass the picked file to parent submit
//     handleSubmit(e, imageFile);
//   };

//   return (
//     <form onSubmit={onSubmit} className="space-y-6 w-full mx-auto">
//       {/* Title */}
//       <input
//         type="text"
//         placeholder="Enter blog title"
//         value={blog.title || ""}
//         onChange={(e) => setBlog({ ...blog, title: e.target.value })}
//         className="w-full p-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400 text-lg"
//         required
//       />

//       {/* Image (file). Required only when creating */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={onImageChange}
//         className="w-full p-2 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400"
//         required={!isEdit} // create: required, edit: optional
//       />

//       {/* Preview */}
//       {previewUrl && (
//         <div className="inline-block border-2 border-purple-200 rounded-xl p-2 w-fit bg-purple-50">
//           <img
//             src={previewUrl}
//             alt="Preview"
//             className="max-w-[120px] max-h-[120px] object-cover rounded-xl shadow"
//           />
//         </div>
//       )}

//       {/* Description */}
//       <textarea
//         placeholder="Enter blog description"
//         value={blog.description || ""}
//         onChange={(e) => setBlog({ ...blog, description: e.target.value })}
//         className="w-full p-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400 text-lg min-h-[120px] bg-purple-50"
//         required
//       />

//       {/* Submit */}
//       <button
//         type="submit"
//         className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl shadow font-bold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 border border-blue-300"
//       >
//         Save Blog
//       </button>
//     </form>
//   );
// }

// export default BlogForm;






















// admin/components/AdminBlogUpsert.jsx
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "https://intekbit-backend.onrender.com";

export default function AdminBlogUpsert() {
  const { id: blogId } = useParams();            // /admin/blogs/new  => no id (create)
// /admin/blogs/:id/edit => edit mode
  const isEdit = Boolean(blogId);
  const navigate = useNavigate();

  const [blog, setBlog] = useState({ title: "", description: "", image: "" });
  const [imageFile, setImageFile] = useState(null);

  // Load existing blog in edit mode
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/blog/${blogId}`);
        if (data?.success) setBlog(data.blog);
        else alert("Failed to load blog");
      } catch (e) {
        console.error("Load blog failed:", e?.response?.data || e.message);
        alert(e?.response?.data?.message || "Failed to load blog");
      }
    })();
  }, [isEdit, blogId]);

  // Preview (new file > existing url)
  const previewUrl = useMemo(() => {
    if (imageFile) return URL.createObjectURL(imageFile);
    if (blog?.image) {
      // ensure full URL if backend returns a relative /uploads path
      return blog.image.startsWith("/uploads")
        ? `${BACKEND_URL}${blog.image}`
        : blog.image;
    }
    return null;
  }, [imageFile, blog?.image]);

  useEffect(() => {
    return () => {
      if (imageFile && previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [imageFile, previewUrl]);

  const onImagePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("title", blog.title);
      form.append("description", blog.description);
      // create: image required; edit: only if user picked new file
      if (!isEdit || (isEdit && imageFile)) form.append("image", imageFile);

      if (!isEdit) {
        // CREATE
        const { data } = await axios.post(`${BACKEND_URL}/api/addblogs`, form);
        if (!data?.success) return alert(data?.message || "Create failed");
        alert("Blog created!");
        navigate("/admin/blogs"); // go back to list if you have one
      } else {
        // UPDATE
        const { data } = await axios.put(`${BACKEND_URL}/api/blog/${blogId}`, form);
        if (!data?.success) return alert(data?.message || "Update failed");
        alert("Blog updated!");
        setBlog(data.blog);
        setImageFile(null);
      }
    } catch (err) {
      console.error("Submit error:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Error saving blog");
    }
  };

  const handleDelete = async () => {
    if (!isEdit) return;
    if (!confirm("Delete this blog?")) return;
    try {
      const { data } = await axios.delete(`${BACKEND_URL}/api/blog/${blogId}`);
      if (!data?.success) return alert(data?.message || "Delete failed");
      alert("Blog deleted!");
      navigate("/admin/blogs");
    } catch (err) {
      console.error("Delete error:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Error deleting blog");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">{isEdit ? "Edit Blog" : "Create Blog"}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <input
          type="text"
          placeholder="Enter blog title"
          value={blog.title || ""}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          className="w-full p-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400 text-lg"
          required
        />

        {/* Image picker */}
        <input
          type="file"
          accept="image/*"
          onChange={onImagePick}
          className="w-full p-2 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400"
          required={!isEdit}
        />

        {/* Preview */}
        {previewUrl && (
          <div className="inline-block border-2 border-purple-200 rounded-xl p-2 w-fit bg-purple-50">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-[140px] max-h-[140px] object-cover rounded-xl shadow"
            />
          </div>
        )}

        {/* Description */}
        <textarea
          placeholder="Enter blog description"
          value={blog.description || ""}
          onChange={(e) => setBlog({ ...blog, description: e.target.value })}
          className="w-full p-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400 text-lg min-h-[120px] bg-purple-50"
          required
        />

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow font-bold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 border border-blue-300"
          >
            {isEdit ? "Update" : "Create"}
          </button>

          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-3 rounded-xl border border-red-300 text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
