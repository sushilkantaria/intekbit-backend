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






// import { useState, useEffect, useRef, useMemo } from "react";
// import JoditEditor from "jodit-react";

// function BlogForm({ blog, setBlog, handleSubmit, isEdit = false }) {
//   const [imageFile, setImageFile] = useState(null);
//   const editorRef = useRef(null);  // Reference to the JoditEditor instance
//   const [description, setDescription] = useState(blog.description || "");  // Local state for description

//   const previewUrl = useMemo(() => {
//     if (imageFile) return URL.createObjectURL(imageFile);
//     if (blog?.image) return blog.image; // might already be a full URL or /uploads/...
//     return null;
//   }, [imageFile, blog?.image]);

//   useEffect(() => {
//     return () => {
//       if (imageFile && previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
//     };
//   }, [imageFile, previewUrl]);

//   const onImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setImageFile(file);
//   };

//   const onSubmit = (e) => handleSubmit(e, imageFile);

//   // Handle Description Change
//   const handleDescriptionChange = (newContent) => {
//     setDescription(newContent);  // Update local state for description
//   };

//   // Only update the parent state when editor loses focus
//   const handleBlur = () => {
//     if (description !== blog.description) {
//       setBlog((prevBlog) => ({ ...prevBlog, description }));
//     }
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

//       {/* Image (required on create, optional on edit) */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={onImageChange}
//         className="w-full p-2 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400"
//         required={!isEdit}
//       />

//       {/* Preview */}
//       {previewUrl && (
//         <div className="inline-block border-2 border-purple-200 rounded-xl p-2 w-fit bg-purple-50">
//           <img
//             src={previewUrl}
//             alt="Preview"
//             className="max-w-[140px] max-h-[140px] object-cover rounded-xl shadow"
//           />
//         </div>
//       )}

//       {/* Description with Jodit Editor */}
//       <JoditEditor
//         value={description}  // Controlled by local state
//         onChange={handleDescriptionChange} // Update local state
//         ref={editorRef} // Reference to the JoditEditor instance
//         config={{
//           readonly: false, // Allow editing
//           placeholder: "Enter blog description here...",
//         }}
//         className="w-full p-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400 text-lg min-h-[120px] bg-purple-50"
//         onBlur={handleBlur}  // Update parent state when the editor loses focus
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




















import { useState, useEffect, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

function BlogForm({ blog, setBlog, handleSubmit, isEdit = false }) {
  const [imageFile, setImageFile] = useState(null);
  const editorRef = useRef(null);
  const [description, setDescription] = useState(blog.description || "");
  const debounceTimeout = useRef(null); // store timeout reference

  const previewUrl = useMemo(() => {
    if (imageFile) return URL.createObjectURL(imageFile);
    if (blog?.image) return blog.image;
    return null;
  }, [imageFile, blog?.image]);

  useEffect(() => {
    return () => {
      if (imageFile && previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [imageFile, previewUrl]);

  const onImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
  };

  const onSubmit = (e) => handleSubmit(e, imageFile);

  // Debounced description update
  const handleDescriptionChange = (newContent) => {
    setDescription(newContent); // always update local state immediately for editor

    // Clear existing timeout
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    // Set a new timeout to update parent state after 800ms of no typing
    debounceTimeout.current = setTimeout(() => {
      setBlog((prevBlog) => ({ ...prevBlog, description: newContent }));
    }, 800); // you can change 800 to any desired delay (ms)
  };

  // Ensure parent state is updated on blur too (in case user clicks away before timeout)
  const handleBlur = () => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    if (description !== blog.description) {
      setBlog((prevBlog) => ({ ...prevBlog, description }));
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 w-full mx-auto">
      {/* Title */}
      <input
        type="text"
        placeholder="Enter blog title"
        value={blog.title || ""}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        className="w-full p-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400 text-lg"
        required
      />

      {/* Image */}
      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
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

      {/* Jodit Editor */}
      <JoditEditor
        value={description}
        onChange={handleDescriptionChange}
        ref={editorRef}
        config={{
          readonly: false,
          placeholder: "Enter blog description here...",
        }}
        className="w-full p-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400 text-lg min-h-[120px] bg-purple-50"
        onBlur={handleBlur}
      />

      {/* Submit */}
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl shadow font-bold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 border border-blue-300"
      >
        Save Blog
      </button>
    </form>
  );
}

export default BlogForm;
