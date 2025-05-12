from crewai import Agent
from tools.duckduckgo_tool import DuckDuckGoSearchTool

search_tool = DuckDuckGoSearchTool()

news_agent = Agent(
    role="NewsMonitoringAgent",
    goal="Track and retrieve fresh crypto-related news.",
    backstory="A real-time financial news analyst.",
    tools=[search_tool],
    verbose=True
)
