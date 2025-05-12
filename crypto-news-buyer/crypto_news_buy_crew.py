import os
from dotenv import load_dotenv
from crewai import Crew
from tasks.task_definitions import tasks
from agents.news_agent import news_agent
from agents.sentiment_agent import sentiment_agent
from agents.screener_agent import screener_agent
from agents.decision_agent import decision_agent
from datetime import datetime

load_dotenv("config/keys.env")

os.environ["OPENAI_API_BASE"] = "https://openrouter.ai/api/v1"
os.environ["OPENAI_API_KEY"] = os.getenv("OPENROUTER_API_KEY")

crew = Crew(
    agents=[news_agent, sentiment_agent, screener_agent, decision_agent],
    tasks=tasks,
    process_type="sequential",
    verbose=True,
    planning=True
)

if __name__ == "__main__":
    print("🕒 Starting crypto market analysis at:", datetime.now())
    result = crew.kickoff()
    print("\n📈 Final Recommendation:\n")
    print(result)
