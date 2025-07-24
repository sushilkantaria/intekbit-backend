import { useRef } from "react";
import JoditEditor from "jodit-react";

function BlogForm({ blog, setBlog, handleSubmit }) {
  const editor = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBlog({ ...blog, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto bg-white p-6 rounded shadow">
      {/* Title */}
      <input
        type="text"
        placeholder="Enter blog title"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        className="w-full p-3 border rounded"
        required
      />

      {/* Image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 border rounded"
        required
      />
      {/* Image Preview Container */}
{blog.image && (
  <div className="inline-block border rounded p-1 w-fit">
    <img
      src={blog.image}
      alt="Preview"
      className="max-w-[100px] max-h-[100px] object-cover rounded"
    />
  </div>
)}


      {/* Description (Rich text) */}
      <JoditEditor
        ref={editor}
        value={blog.description}
        onBlur={(newContent) => setBlog({ ...blog, description: newContent })}
      />

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Save Blog
      </button>
    </form>
  );
}

export default BlogForm;
