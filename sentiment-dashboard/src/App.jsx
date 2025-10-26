import { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './App.css'; // You'll need to add some basic styling

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [topic, setTopic] = useState('');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sampleTexts, setSampleTexts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setChartData(null);
    setSampleTexts([]);
    try {
      const response = await axios.post('https://x-sentiment-analysis-6znh.onrender.com/analyze', { topic });
      const { positive, negative, neutral } = response.data.results;

      setChartData({
        labels: ['Positive', 'Negative', 'Neutral'],
        datasets: [{
          label: 'Sentiment Distribution',
          data: [positive, negative, neutral],
          backgroundColor: [
            'rgba(76, 175, 80, 0.8)',
            'rgba(244, 67, 54, 0.8)',
            'rgba(255, 193, 7, 0.8)'
          ],
          borderColor: [
            'rgba(76, 175, 80, 1)',
            'rgba(244, 67, 54, 1)',
            'rgba(255, 193, 7, 1)'
          ],
          borderWidth: 2,
        }],
      });

      if (response.data.sample_texts) {
        setSampleTexts(response.data.sample_texts);
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 
        'Failed to fetch sentiment data. Make sure the Flask server is running!'
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎯 Sentiment Analysis Dashboard</h1>
        <p className="info-note">
          ℹ️ Results are based on 10 recent posts scraped from X (Twitter). 
          The free developer API only provides access to 100 posts per month.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic (e.g., 'Tesla', 'Bitcoin', 'AI')..."
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Analyzing...' : '🔍 Analyze'}
          </button>
        </form>
        {error && <p className="error">❌ {error}</p>}
        {chartData && (
          <>
            <div className="chart-container">
              <Pie 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        padding: 20,
                        font: {
                          size: 14,
                          weight: '500'
                        }
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          return `${context.label}: ${context.parsed}%`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
            {sampleTexts.length > 0 && (
              <div className="samples-container">
                <h2>📝 Sample Tweets</h2>
                <div className="samples-grid">
                  {sampleTexts.map((sample, index) => (
                    <div key={index} className={`sample-card ${sample.sentiment}`}>
                      <span className="sentiment-badge">{sample.sentiment}</span>
                      <p>{sample.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;