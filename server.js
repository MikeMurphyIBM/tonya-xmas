'use strict';

const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.disable('x-powered-by');

// Health check for Code Engine
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Serve all frontend assets from /public (stateless, read-only)
app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: '7d',
    setHeaders: (res, filePath) => {
      // Always revalidate the HTML so edits show up right away
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  })
);

// Anything else falls back to the card
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Christmas card listening on port ${PORT}`);
});
