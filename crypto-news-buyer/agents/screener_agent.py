from crewai import Agent

screener_agent = Agent(
    role="CryptoScreenerAgent",
    goal="Identify tokens mentioned in news and analyze for market buy potential.",
    backstory="A bot that checks live market data for buy signals.",
    verbose=True
)
