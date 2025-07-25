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
    <form onSubmit={handleSubmit} className="space-y-6 w-full mx-auto">
      {/* Title */}
      <input
        type="text"
        placeholder="Enter blog title"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        className="w-full p-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400 text-lg"
        required
      />

      {/* Image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400"
        required
      />
      {/* Image Preview Container */}
      {blog.image && (
        <div className="inline-block border-2 border-purple-200 rounded-xl p-2 w-fit bg-purple-50">
          <img
            src={blog.image}
            alt="Preview"
            className="max-w-[120px] max-h-[120px] object-cover rounded-xl shadow"
          />
        </div>
      )}

      {/* Description (Rich text) */}
      <div className="border-2 border-purple-200 rounded-xl bg-purple-50">
        <JoditEditor
          ref={editor}
          value={blog.description}
          onBlur={(newContent) => setBlog({ ...blog, description: newContent })}
        />
      </div>

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
