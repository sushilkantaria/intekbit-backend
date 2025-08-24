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
 








// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();

// const blogRoutes = require('./routes/blogRoutes');

// const app = express();

// app.use(cors());

// // Keep JSON parsers for non-file routes
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

// // Serve uploaded files statically
// // Files saved to: <project root>/uploads
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

// app.use('/api', blogRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



















// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');
// require('dotenv').config();

// const blogRoutes = require('./routes/blogRoutes');

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

// // Resolve uploads path (env for Render persistent disk)
// // const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, 'uploads');
// const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, '..', 'uploads');


// // Ensure folder exists
// fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// // Serve uploads statically
// app.use('/uploads', express.static(UPLOADS_DIR));

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

// // Simple health ping
// app.get('/healthz', (req, res) => res.send('ok'));

// app.use('/api', blogRoutes);

// // GLOBAL error handler to expose real error message
// app.use((err, req, res, next) => {
//   console.error('GLOBAL ERROR:', err?.stack || err);
//   res.status(500).json({ success: false, message: err.message || 'Server error' });
// });

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
