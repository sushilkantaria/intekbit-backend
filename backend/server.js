// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const blogRoutes = require('./routes/blogRoutes');

// const app = express();
// app.use(cors());
// // app.use(express.json());
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));


// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

//   app.use('/api', blogRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 






// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


const allowedOrigins = [
  'http://localhost:5173', // Vite default
  'http://localhost:3000', // CRA default (if you use it)
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));



// ---- SAME uploads dir everywhere ----
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, 'uploads');
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Serve files
app.use('/uploads', express.static(UPLOADS_DIR));

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Simple health
app.get('/healthz', (req, res) => res.send('ok'));

// 🔍 Diagnostics (TEMPORARY: keep during debugging)
app.get('/api/_diag', (req, res) => {
  try {
    const exists = fs.existsSync(UPLOADS_DIR);
    const files = exists ? fs.readdirSync(UPLOADS_DIR) : [];
    res.json({
      ok: true,
      uploadsDir: UPLOADS_DIR,
      exists,
      fileCount: files.length,
      envUploadsDir: process.env.UPLOADS_DIR || '(not set)',
      nodeEnv: process.env.NODE_ENV || '(not set)'
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.use('/api', blogRoutes);

// 🌶 Global error logger (prints real error to Render logs)
app.use((err, req, res, next) => {
  console.error('GLOBAL ERROR:', err?.stack || err);
  res.status(500).json({ success: false, message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
