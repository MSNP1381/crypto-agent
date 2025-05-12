from crewai import Task
from agents.news_agent import news_agent
from agents.sentiment_agent import sentiment_agent
from agents.screener_agent import screener_agent
from agents.decision_agent import decision_agent

tasks = [
    Task(description="Fetch and summarize breaking crypto news.", agent=news_agent),
    Task(description="Analyze sentiment of news articles.", agent=sentiment_agent),
    Task(description="Identify tokens and check market data for buy signals.", agent=screener_agent),
    Task(description="Recommend tokens to buy for profit in next 7 days.", agent=decision_agent)
]
