
#!/usr/bin/env python3
import asyncio
import requests
import json
from datetime import datetime

# تنظیمات OpenRouter با API Key به صورت مستقیم
api_key = ""  # Your OpenRouter API key
base_url = "https://openrouter.ai/api/v1"

# NewsAPI Key (شما باید API Key خود را از NewsAPI بگیرید)
news_api_key = ""  # Your NewsAPI key
news_base_url = "https://newsapi.org/v2/everything"

# تابع برای جستجوی اخبار از NewsAPI
def search_for_news(query="cryptocurrency market"):
    """
    جستجو برای اخبار مرتبط با ارز دیجیتال از NewsAPI
    """
    url = f"{news_base_url}?q={query}&apiKey={news_api_key}"
    response = requests.get(url)

    if response.status_code == 200:
        news_data = response.json()
        articles = news_data.get("articles", [])
        news_info = []

        # فقط لینک اخبار را نمایش می‌دهیم
        for article in articles[:5]:  # نمایش فقط 5 تیتر اول
            title = article.get("title")
            published_at = article.get("publishedAt")
            url = article.get("url")  # لینک خبر
            news_info.append((title, published_at, url))

        return news_info
    else:
        print(f"Error fetching news: {response.status_code}")
        return []

# تابع برای ارسال درخواست به OpenRouter
async def analyze_market():
    # تنظیم هدرهای درخواست
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "X-Title": "Crypto View Analyzer",  # Updated site title
        "HTTP-Referer": "https://crypto-view-analyzer.com"  # Updated site URL
    }

    # داده‌هایی که باید به API ارسال شوند
    data = {
        "model": "google/gemini-2.0-flash-001",  # مدل مورد استفاده
        "messages": [
            {
                "role": "user",
                "content": """
                You are an advanced cryptocurrency strategist AI tasked with maximizing profit in a volatile market. 
                Based on the latest market sentiment, trends, financial indicators, and real-time news, analyze and suggest 
                the top 3 cryptocurrencies to buy this week, and also provide exact dates for the optimal time to sell to maximize profit.
                
                Your analysis should include:
                
                1. **Current Market Outlook**: Assess whether the market is bullish, bearish, or consolidating.
                2. **Selection Methodology**: Explain how you selected these cryptocurrencies, including:
                   - **Fundamental analysis** (technology, team, tokenomics, use case, adoption, partnerships).
                   - **Technical analysis** (chart patterns, support/resistance levels).
                   - **Sentiment analysis** (based on news, trends, and public sentiment).
                   - **Upcoming catalysts** (mainnet launches, partnerships, token unlocks, etc.).
                   - **Risk assessment** (volatility, regulatory challenges, etc.).
                3. **Cryptocurrency Analysis**: Provide a detailed breakdown of each cryptocurrency, including:
                   - **Core rationale for potential profit**: Why is this cryptocurrency expected to perform well this week?
                   - **Key strengths & catalysts**: What are the market-moving events for this coin?
                   - **Risks & potential downsides**: What are the risks of investing in this coin?
                   - **Relevance to the current market narrative**: How does it fit with current market trends?
                4. **Portfolio Recommendation**: Suggest the best portfolio of these top 3 cryptocurrencies, including allocation percentages (e.g., BTC 40%, ETH 30%, Alt-X 30%).
                5. **Time Horizon**: Your analysis should suggest a time horizon for each of the cryptocurrencies (short-term, mid-term).
                
                Make sure your recommendations are based on real-time data, trends, and news. Focus on maximizing profit potential for this week.

                For each cryptocurrency, include price predictions for the next 7 days. Format this data as follows at the end of each cryptocurrency section:

                ```chart
                {
                  "type": "line",
                  "title": "[Cryptocurrency Name] Price Prediction",
                  "dataPoints": [
                    {"date": "[Today's Date]", "value": [Current Price], "prediction": [Current Price]},
                    {"date": "[Date+1]", "value": null, "prediction": [Predicted Price]},
                    {"date": "[Date+2]", "value": null, "prediction": [Predicted Price]},
                    {"date": "[Date+3]", "value": null, "prediction": [Predicted Price]},
                    {"date": "[Date+4]", "value": null, "prediction": [Predicted Price]},
                    {"date": "[Date+5]", "value": null, "prediction": [Predicted Price]},
                    {"date": "[Date+6]", "value": null, "prediction": [Predicted Price]}
                  ]
                }
                ```
                
                Use emojis for headings and key points to make the analysis more visually appealing.

                **Please provide the result in a clean Markdown format for easy reading and interpretation.** Additionally, include the **last update date** at the end of the document.
                """
            }
        ]
    }

    # ارسال درخواست به OpenRouter
    response = requests.post(f"{base_url}/chat/completions", headers=headers, json=data)

    # چاپ کامل پاسخ برای دیباگ
    print(f"OpenRouter Response Status: {response.status_code}")
    print("OpenRouter Response Body: ", response.text)

    if response.status_code == 200:
        # اگر درخواست موفقیت‌آمیز بود
        result = response.json()

        # بررسی اینکه کلید 'choices' موجود است
        if 'choices' in result:
            market_analysis = result['choices'][0]['message']['content']

            # جستجو برای تیتر اخبار و تاریخ آن‌ها
            news_data = search_for_news()  # تابع جستجوی اخبار
            if news_data:
                print("News Search: Done")  # اعلام موفقیت در جستجوی اخبار

            # چاپ مصرف توکن
            print("OpenRouter Token Usage:")
            print(f"Prompt Tokens: {result['usage']['prompt_tokens']}, Completion Tokens: {result['usage']['completion_tokens']}, Total Tokens: {result['usage']['total_tokens']}")

            # به‌روز کردن خروجی در قالب Markdown
            markdown_output = f"""
# 📈 Cryptocurrency Market Analysis for the Next Week

## 📰 Latest News Headlines for the Week:
Here are the latest headlines related to the cryptocurrency market:
"""
            for title, date, url in news_data:
                markdown_output += f"\n1. **{title}**  \n   *Date*: {date}  \n   *Link*: [Read more]({url})"

            markdown_output += f"""

## **Market Analysis**:
{market_analysis}

## Last Updated:
{datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
"""

            # ذخیره خروجی در فایل README.md - از مسیر نسبی استفاده می‌کنیم
            with open("../README.md", "w") as f:
                f.write(markdown_output)

            return market_analysis
        else:
            return "Error: 'choices' not found in the response."
    else:
        print(f"Error: {response.status_code}")
        return f"Error: {response.status_code}"

async def get_cryptocurrency_recommendations():
    # دریافت و پردازش تحلیل بازار و اخبار
    market_analysis = await analyze_market()
    
    # فقط نمایش پاسخ نهایی
    print(f"\n📈 Cryptocurrency Recommendation for the next 1 week:\n{market_analysis}")
    
    return market_analysis

if __name__ == "__main__":
    # اجرای غیرهمزمان برای تحلیل بازار
    asyncio.run(get_cryptocurrency_recommendations())
