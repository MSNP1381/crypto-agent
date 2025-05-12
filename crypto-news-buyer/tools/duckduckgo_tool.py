from crewai_tools import BaseTool
import duckduckgo_search

class DuckDuckGoSearchTool(BaseTool):
    name = "DuckDuckGo Search Tool"
    description = "Free crypto news search using DuckDuckGo"

    def _run(self, query: str) -> str:
        from duckduckgo_search import ddg
        results = ddg(query, region='wt-wt', safesearch='Off', max_results=5)
        return "\n".join([r["title"] + ": " + r["href"] for r in results])
