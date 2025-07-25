import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Dashboard() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        'https://intekbit-backend.onrender.com/api/blogs'
      );
      setBlogs(res.data.blogs); // ✅ correct
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(
          `https://intekbit-backend.onrender.com/api/blog/${id}`
        );
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      } catch (err) {
        console.error('Error deleting blog:', err);
      }
    }
  };

  return (
    <div className="py-12 px-4 min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 bg-white/90 border border-purple-300 rounded-3xl shadow-2xl px-10 py-8">
        <h1 className="text-5xl font-black text-purple-700 tracking-wide drop-shadow-lg relative inline-block">
          <span className="relative inline-block">
            <span className="inline-block">B</span>
            <span className="absolute -top-4 -left-8" style={{ transform: 'rotate(-20deg)' }}>
              {/* Bow Ribbon Image */}
              <img src="/bow-ribbon.png" alt="Pink Bow Ribbon" style={{ width: '60px', height: 'auto', display: 'block' }} />
            </span>
          </span>
          log Dashboard
        </h1>
        <Link
          to="/create"
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white px-8 py-4 rounded-2xl shadow-xl font-bold transition-all duration-300 border border-green-300"
        >
          + Add New Blog
        </Link>
      </div>

      {/* Blog List */}
      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center text-xl font-medium">
          No blogs found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border-2 border-purple-300 rounded-3xl shadow-2xl p-8 space-y-5 transition-all duration-300 hover:border-pink-400 hover:bg-pink-100/70 relative flex flex-col justify-between min-h-[220px]"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-bl-full pointer-events-none"></div>
              <h2 className="text-2xl font-bold text-blue-700 mb-2 drop-shadow-md">
                {blog.title}
              </h2>
              <div
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: blog.description
                    ? blog.description.slice(0, 100) + '...'
                    : '',
                }}
              ></div>
              <div className="flex gap-4 mt-6">
                <Link
                  to={`/edit/${blog._id}`}
                  className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-5 py-2 rounded-xl shadow hover:from-purple-400 hover:to-blue-400 transition-all duration-300 border border-blue-300 font-semibold"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-gradient-to-r from-pink-400 to-red-400 text-white px-5 py-2 rounded-xl shadow hover:from-red-400 hover:to-pink-400 transition-all duration-300 border border-pink-300 font-semibold"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
