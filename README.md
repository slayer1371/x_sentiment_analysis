# 🎯 X Sentiment Analysis Dashboard

A full-stack web application that analyzes sentiment from X (Twitter) posts in real-time. Enter any topic and get instant sentiment analysis with beautiful visualizations showing the distribution of positive, negative, and neutral opinions.

![Python](https://img.shields.io/badge/Python-3.13-blue)
![Flask](https://img.shields.io/badge/Flask-3.0-green)
![React](https://img.shields.io/badge/React-18-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff)

## ✨ Features

- 🔍 **Real-time Sentiment Analysis** - Analyze sentiment from recent X posts on any topic
- 📊 **Interactive Visualizations** - Beautiful pie charts showing sentiment distribution
- 💬 **Sample Posts Display** - View sample posts with their sentiment classifications
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🌙 **Dark Mode Support** - Automatic dark mode based on system preferences
- 🎨 **Modern UI** - Gradient backgrounds, smooth animations, and glassmorphism effects

## 🏗️ Architecture

### Backend (Flask)
- **Framework**: Flask with CORS support
- **Sentiment Analysis**: VADER (Valence Aware Dictionary and sEntiment Reasoner)
- **Data Source**: X (Twitter) API v2
- **API Endpoint**: `/analyze` - POST endpoint for sentiment analysis requests

### Frontend (React + Vite)
- **Framework**: React 18 with Vite
- **Charts**: Chart.js with react-chartjs-2
- **HTTP Client**: Axios
- **Styling**: Custom CSS with modern design patterns

## 📋 Prerequisites

- Python 3.13+ installed
- Node.js 18+ and npm installed
- X (Twitter) Developer Account with API access
- Bearer Token from X Developer Portal

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd sentiment_analysis_scraper
```

### 2. Backend Setup

#### Create and activate virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### Install Python dependencies:
```bash
pip install flask flask-cors vaderSentiment tweepy
```

#### Add your X API Bearer Token:
Edit `app.py` and replace the bearer token:
```python
bearer_token = 'YOUR_BEARER_TOKEN_HERE'
```

#### Run the Flask server:
```bash
python app.py
```

The backend will run on `http://127.0.0.1:5000`

### 3. Frontend Setup

#### Navigate to frontend directory:
```bash
cd sentiment-dashboard
```

#### Install dependencies:
```bash
npm install
```

#### Start development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🎮 Usage

1. **Start both servers** (backend on port 5000, frontend on port 5173)
2. **Open your browser** to `http://localhost:5173`
3. **Enter a topic** (e.g., "Tesla", "Bitcoin", "AI", "Climate Change")
4. **Click Analyze** to see sentiment analysis results
5. **View the pie chart** showing sentiment distribution
6. **Read sample posts** to see examples of each sentiment category

## 📊 How It Works

1. **User Input**: User enters a topic in the search box
2. **API Request**: Frontend sends POST request to Flask backend
3. **Data Collection**: Backend fetches 10 recent posts from X API
4. **Sentiment Analysis**: VADER analyzes each post's sentiment
5. **Classification**: Posts are categorized as positive, negative, or neutral
6. **Aggregation**: Results are calculated as percentages
7. **Visualization**: Frontend displays interactive charts and sample posts

## 🔑 Sentiment Classification

The VADER sentiment analyzer uses compound scores to classify sentiment:

- **Positive**: Compound score ≥ 0.05
- **Negative**: Compound score ≤ -0.05
- **Neutral**: Compound score between -0.05 and 0.05

## 🛠️ Technologies Used

### Backend
- **Flask** - Lightweight Python web framework
- **Flask-CORS** - Handle Cross-Origin Resource Sharing
- **VADER Sentiment** - Sentiment analysis tool
- **Tweepy** - X (Twitter) API client library

### Frontend
- **React** - UI library for building user interfaces
- **Vite** - Next-generation frontend build tool
- **Chart.js** - JavaScript charting library
- **react-chartjs-2** - React wrapper for Chart.js
- **Axios** - Promise-based HTTP client

## ⚙️ Configuration

### API Rate Limits

The free X Developer API has the following limitations:
- **100 posts per month** across all requests
- **10 posts per request** in this application
- Results are based on recent posts only

### Customization

#### Change number of posts analyzed:
In `app.py`, modify the `max_results` parameter:
```python
response = client.search_recent_tweets(query, max_results=50)  # Change from 100
```


## 🐛 Troubleshooting

### Common Issues

**CORS Error**
- Ensure Flask-CORS is installed: `pip install flask-cors`
- Verify backend is running on port 5000

**No Tweets Found**
- Check if the topic has recent posts on X
- Verify your bearer token is valid
- Check API rate limits in X Developer Portal

**Connection Failed**
- Ensure both servers are running
- Check that ports 5000 and 5173 are not blocked
- Verify the API URL in frontend matches backend

**Import Errors**
- Activate virtual environment: `source venv/bin/activate`
- Reinstall dependencies: `pip install -r requirements.txt`

## 📝 API Documentation

### POST /analyze

Analyzes sentiment for posts about a given topic.

**Request Body:**
```json
{
  "topic": "string"
}
```

**Response:**
```json
{
  "topic": "string",
  "results": {
    "positive": 45,
    "negative": 20,
    "neutral": 35
  },
  "sample_texts": [
    {
      "text": "Sample post text...",
      "sentiment": "positive"
    }
  ]
}

**Note**: This application uses the X (formerly Twitter) API. 
Results are based on 10 recent posts scraped from X. 
The free developer API only provides access to 100 posts per month.

