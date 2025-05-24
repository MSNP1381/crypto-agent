
const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create a history directory if it doesn't exist
const historyDir = path.join(__dirname, '../history');
if (!fs.existsSync(historyDir)) {
  fs.mkdirSync(historyDir, { recursive: true });
}

// Helper function to save analysis to history
function saveToHistory(analysisData) {
  const timestamp = new Date().toISOString();
  const id = `analysis-${Date.now()}`;
  const filePath = path.join(historyDir, `${id}.json`);
  
  // Extract first sentence of market analysis for the summary
  let summary = analysisData.marketAnalysis.split('.')[0];
  if (summary.length > 150) {
    summary = summary.substring(0, 147) + '...';
  }
  
  const historyItem = {
    id,
    date: timestamp,
    summary,
    data: analysisData
  };
  
  fs.writeFileSync(filePath, JSON.stringify(historyItem, null, 2));
  return historyItem;
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// API endpoint to run the Python script
app.post('/api/analyze', (req, res) => {
  console.log('Received request to analyze market data');
  
  // استفاده از مسیر دقیق فایل پایتون - اطمینان از وجود فایل
  const pythonScriptPath = path.join(__dirname, 'analyze_market.py');
  
  // بررسی وجود فایل پایتون
  if (!fs.existsSync(pythonScriptPath)) {
    console.error(`Python script not found at: ${pythonScriptPath}`);
    return res.status(500).json({ error: 'Python script not found' });
  }
  
  // اجرای اسکریپت پایتون با مسیر دقیق
  exec(`python3 ${pythonScriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      return res.status(500).json({ error: error.message });
    }
    
    if (stderr) {
      console.error(`Python script stderr: ${stderr}`);
    }
    
    console.log(`Python script stdout: ${stdout}`);
    
    // Read the generated README.md file
    fs.readFile(path.join(__dirname, '../README.md'), 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading README.md: ${err}`);
        return res.status(500).json({ error: 'Failed to read analysis results' });
      }
      
      // Parse the markdown to extract sections
      const sections = parseMdSections(data);
      console.log('Parsed sections:', JSON.stringify(sections, null, 2));
      
      // Save to history
      const historyItem = saveToHistory(sections);
      console.log('Saved to history:', historyItem.id);
      
      res.json(sections);
    });
  });
});

// API endpoint to get the current analysis without running the script
app.get('/api/current-analysis', (req, res) => {
  fs.readFile(path.join(__dirname, '../README.md'), 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading README.md: ${err}`);
      return res.status(500).json({ error: 'Failed to read analysis results' });
    }
    
    // Parse the markdown to extract sections
    const sections = parseMdSections(data);
    console.log('Current analysis sections:', JSON.stringify(sections, null, 2));
    res.json(sections);
  });
});

// API endpoint to get analysis history
app.get('/api/analysis-history', (req, res) => {
  try {
    // Read all history files
    const historyFiles = fs.readdirSync(historyDir).filter(file => file.endsWith('.json'));
    const historyItems = historyFiles.map(file => {
      const data = JSON.parse(fs.readFileSync(path.join(historyDir, file), 'utf8'));
      return {
        id: data.id,
        date: data.date,
        summary: data.summary
      };
    });
    
    // Sort by date, most recent first
    historyItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    res.json(historyItems);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch analysis history' });
  }
});

// API endpoint to get a specific analysis by ID
app.get('/api/analysis/:id', (req, res) => {
  const { id } = req.params;
  const filePath = path.join(historyDir, `${id}.json`);
  
  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Analysis not found' });
    }
    
    const historyItem = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(historyItem.data);
  } catch (error) {
    console.error(`Error fetching analysis ${id}:`, error);
    res.status(500).json({ error: 'Failed to fetch analysis data' });
  }
});

// Helper function to parse markdown sections
function parseMdSections(markdown) {
  // Extract news section
  const newsMatch = markdown.match(/## 📰 Latest News Headlines for the Week:([\s\S]*?)(?=##|$)/);
  const news = newsMatch ? newsMatch[1].trim() : '';
  
  // Extract market analysis section
  const analysisMatch = markdown.match(/## \*\*Market Analysis\*\*:([\s\S]*?)(?=## Last Updated|$)/);
  const marketAnalysis = analysisMatch ? analysisMatch[1].trim() : '';
  
  // Extract last updated date
  const lastUpdatedMatch = markdown.match(/## Last Updated:\s*(.*?)$/m);
  const lastUpdated = lastUpdatedMatch ? lastUpdatedMatch[1].trim() : '';

  // Parse news items
  const newsItems = [];
  const newsRegex = /\d+\.\s\*\*([^*]+)\*\*\s+\*Date\*:\s+([^\n]+)\s+\*Link\*:\s+\[Read more\]\(([^)]+)\)/g;
  let newsItem;
  
  while ((newsItem = newsRegex.exec(news)) !== null) {
    newsItems.push({
      title: newsItem[1].trim(),
      date: newsItem[2].trim(),
      url: newsItem[3].trim()
    });
  }
  
  return {
    news: newsItems,
    marketAnalysis,
    lastUpdated
  };
}

// Catch-all handler to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
