# Crypto News Buy Crew

This project is designed to analyze crypto news, determine sentiment, and recommend the best tokens to buy for short-term profit. It uses agents to gather news, analyze sentiment, screen for relevant tokens, and make buy decisions based on market data.

## Setup Instructions

1. Clone this repository
2. Install dependencies: 
3. Create a  file inside the  folder and add your OpenRouter API key.
4. Run the project: 

## Process Flow

- News Agent: Fetches the latest crypto news.
- Sentiment Agent: Analyzes sentiment of the news articles.
- Screener Agent: Identifies tokens mentioned and analyzes them for market buy potential.
- Decision Agent: Recommends the best crypto tokens for short-term profit based on market trends.

## Dependencies

- Python 3.x
- CrewAI
- DuckDuckGo Search API
