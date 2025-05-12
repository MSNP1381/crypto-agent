from crewai import Agent

decision_agent = Agent(
    role="SpotBuyDecisionAgent",
    goal="Suggest the best cryptocurrencies to buy for short-term profit.",
    backstory="An AI crypto strategist for maximizing profit.",
    verbose=True
)
