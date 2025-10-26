from flask import Flask, request, jsonify
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import tweepy
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize VADER sentiment analyzer
analyzer = SentimentIntensityAnalyzer()

@app.route('/')
def home():
    # Return a simple message and a 200 OK status code
    return "OK", 200

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    topic = data['topic']

    # 1. Fetch data
    tweets = fetch_tweets(topic)
    if not tweets:
        return jsonify({'error': 'Could not find tweets on this topic.'}), 404

    # 2. Analyze and aggregate results
    results = {'positive': 0, 'negative': 0, 'neutral': 0}
    sample_texts = []

    for tweet in tweets:
        sentiment = analyze_text(tweet)
        results[sentiment] += 1
        if len(sample_texts) < 5: # Get a few samples to display
            sample_texts.append({'text': tweet, 'sentiment': sentiment})

    # Calculate percentages
    total = len(tweets)
    results_percent = {key: round((value / total) * 100) for key, value in results.items()}

    final_response = {
        'topic': topic,
        'results': results_percent,
        'sample_texts': sample_texts
    }
    return jsonify(final_response)

def fetch_tweets(topic):
    # Get bearer token from environment variable
    bearer_token = os.getenv('TWITTER_BEARER_TOKEN')
    
    if not bearer_token:
        raise ValueError("TWITTER_BEARER_TOKEN not found in environment variables")
    
    client = tweepy.Client(bearer_token)

    # Search for recent tweets, excluding retweets
    query = f'{topic} -is:retweet lang:en'
    response = client.search_recent_tweets(query, max_results=10)

    tweets = []
    if response.data:
        for tweet in response.data:
            tweets.append(tweet.text)
    return tweets

def analyze_text(text):
    score = analyzer.polarity_scores(text)['compound']
    if score >= 0.05:
        return 'positive'
    elif score <= -0.05:
        return 'negative'
    else:
        return 'neutral'

if __name__ == '__main__':
    app.run(debug=True)