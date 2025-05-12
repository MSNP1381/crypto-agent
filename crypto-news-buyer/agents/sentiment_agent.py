from crewai import Agent

sentiment_agent = Agent(
    role="SentimentAndRelevanceAgent",
    goal="Analyze sentiment of crypto news.",
    backstory="An NLP bot that understands crypto sentiment.",
    verbose=True
)
