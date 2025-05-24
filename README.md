
# 📈 Crypto View Analyzer

> AI-powered cryptocurrency market analysis and recommendations platform

[![Last Analysis](https://img.shields.io/badge/Last%20Analysis-2025--05--22-blue)](README.md)
[![Python](https://img.shields.io/badge/Python-3.8+-green)](https://python.org)
[![React](https://img.shields.io/badge/React-18.3+-blue)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://typescriptlang.org)

## 🚀 What is Crypto View Analyzer?

Crypto View Analyzer is an advanced cryptocurrency market analysis platform that combines **AI-powered analysis** with **real-time market data** to provide intelligent investment recommendations. The platform uses OpenRouter's Gemini AI model to analyze market trends, news sentiment, and technical indicators to suggest the top cryptocurrencies to buy each week.

### 🌟 Key Features

- **🤖 AI-Powered Analysis**: Advanced market analysis using Google's Gemini 2.0 Flash model
- **📊 Interactive Charts**: Real-time price predictions and market trend visualization
- **📰 Latest News Integration**: Automated crypto news aggregation from NewsAPI
- **📈 Price Predictions**: 7-day price forecasts with interactive charts
- **📋 Analysis History**: Complete history of past analyses with search functionality
- **🎨 Modern UI**: Beautiful, responsive interface with dark theme
- **⚡ Real-time Updates**: Live market data and instant analysis updates

## 📸 Screenshots

### Main Dashboard
![Main Dashboard](screenshots/main-dashboard.png)
*The main dashboard showing latest crypto news, market analysis, and price prediction charts*

### Analysis History
![Analysis History](screenshots/analysis-history.png)
*History page displaying all previous market analyses with search functionality*

### Detailed Analysis View
![Detailed Analysis](screenshots/detailed-analysis.png)
*Detailed view showing comprehensive market analysis with methodology and recommendations*

## 🛠️ Technology Stack

### Frontend
- **React 18.3+** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/UI** component library
- **Recharts** for data visualization
- **React Router** for navigation
- **TanStack Query** for state management
- **Sonner** for toast notifications

### Backend
- **Node.js** with Express
- **Python 3.8+** for AI analysis
- **OpenRouter API** (Gemini 2.0 Flash)
- **NewsAPI** for crypto news
- **CORS** enabled for cross-origin requests

### AI & APIs
- **Google Gemini 2.0 Flash** via OpenRouter
- **NewsAPI** for cryptocurrency news
- **Real-time market data** integration

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.8+
- OpenRouter API key
- NewsAPI key

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/crypto-view-analyzer.git
cd crypto-view-analyzer
```

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 3. Backend Setup

```bash
# Navigate to server directory
cd server

# Install Node.js dependencies
npm install

# Install Python dependencies
pip install requests asyncio

# Start the server
npm start
```

The backend will be available at `http://localhost:5000`

### 4. Configure API Keys

Update the API keys in the Python files:

**In `server/analyze_market.py`:**
```python
# Replace with your OpenRouter API key
api_key = "sk-or-v1-your-openrouter-api-key-here"

# Replace with your NewsAPI key  
news_api_key = "your-newsapi-key-here"
```

**In `analyze_market.py` (root directory):**
```python
# Replace with your OpenRouter API key
api_key = "sk-or-v1-your-openrouter-api-key-here"

# Replace with your NewsAPI key
news_api_key = "your-newsapi-key-here"
```

### 5. Get Your API Keys

#### OpenRouter API Key
1. Visit [OpenRouter.ai](https://openrouter.ai)
2. Sign up for an account
3. Navigate to API Keys section
4. Generate a new API key
5. Copy and paste it in the Python files

#### NewsAPI Key
1. Visit [NewsAPI.org](https://newsapi.org)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key
5. Paste it in the Python files

## 🎯 How to Use

### 1. Start the Application

1. **Start the backend server** (from `/server` directory):
   ```bash
   npm start
   ```

2. **Start the frontend** (from root directory):
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

### 2. Generate Market Analysis

1. Click the **"Update Analysis"** button on the main dashboard
2. Wait for the AI to analyze current market conditions (10-30 seconds)
3. View the comprehensive analysis with:
   - Market outlook and sentiment
   - Top 3 cryptocurrency recommendations
   - Price predictions with interactive charts
   - Risk assessments and investment strategies

### 3. View Analysis History

1. Click the **"History"** button in the header
2. Browse through previous analyses
3. Use the search functionality to find specific analyses
4. Click **"View Details"** to see full analysis reports

### 4. Interactive Features

- **📊 Charts**: Hover over price prediction charts to see detailed data points
- **📰 News**: Click on news headlines to read full articles
- **🔍 Search**: Use the search functionality in history to find specific analyses
- **📱 Responsive**: Access the platform on any device - desktop, tablet, or mobile

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Customizing Analysis Parameters

Edit the AI prompt in `server/analyze_market.py` to customize:
- Analysis timeframe (currently set to 1 week)
- Number of cryptocurrency recommendations (currently 3)
- Analysis depth and focus areas
- Chart prediction periods

## 📊 API Endpoints

### Backend Endpoints

- `GET /api/current-analysis` - Get the latest analysis
- `POST /api/analyze` - Generate new market analysis
- `GET /api/analysis-history` - Get analysis history
- `GET /api/analysis/:id` - Get specific analysis by ID

### Python Scripts

- `analyze_market.py` - Standalone analysis script
- `server/analyze_market.py` - Server-integrated analysis script

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

**Important**: This tool is for educational and research purposes only. Cryptocurrency investments are inherently risky, and past performance is not indicative of future results. Always do your own research and consult with financial advisors before making investment decisions. The predictions and recommendations provided by this AI system should not be considered as financial advice.

## 🙏 Acknowledgments

- **OpenRouter** for providing access to advanced AI models
- **NewsAPI** for cryptocurrency news data
- **Google Gemini** for powerful AI analysis capabilities
- **Shadcn/UI** for beautiful React components
- **Recharts** for data visualization
- **The crypto community** for inspiration and feedback

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/crypto-view-analyzer/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Made with ❤️ for the crypto community**

*Last Updated: 2025-05-24*
