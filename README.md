# 📰 NewsNerd - A Nerdy App for All

**NewsNerd** is a modern, category-based and search-driven news web application that delivers real-time, top-headline articles from multiple domains like technology, business, entertainment, health, science, sports, and more.

Built with a focus on speed, simplicity, and user engagement, NewsNerd curates the most recent and relevant news using the **NewsAPI**, enabling users to stay informed with personalized search and category-wise filters — all wrapped in a clean, responsive UI.

---

## 🚀 Features

- 🔍 **Search Functionality:** Enter keywords in the search bar to find news articles that match your interests.
- 📚 **Category Navigation:** Choose from multiple categories like Business, Technology, Sports, etc., via a dropdown.
- 📈 **Loading Bar Indicator:** Displays a top loading progress bar while fetching news data.
- ⏱️ **Real-Time News Feed:** Fetches and displays fresh headlines and articles based on the current date.
- 🧠 **Smart Filtering:** Handles edge cases in date management (e.g., first day of the month) to ensure accurate news range.
- 📱 **Responsive Design:** Optimized for mobile and desktop views using Bootstrap 5.
- 🔗 **External Links:** Each article provides a "Read More" link redirecting users to the full story.

---

## 🛠️ Tech Stack

### 💻 Frontend
- **React.js** (Functional components with hooks)
- **React Router DOM** (for client-side routing)
- **Bootstrap 5** (CDN-based styling and responsive layout)
- **React Top Loading Bar** (for loading progress indicator)

### 🌐 APIs
- **[NewsAPI.org](https://newsapi.org/)** – For fetching news articles

### 🧩 Components Used
- `Navbar` – Navigation bar with dropdown category selector and search bar
- `News` – Main component that fetches and displays news
- `NewsItem` – Card UI for individual news articles
- `Spinner` – Loading indicator while fetching news
- `NoArticle` – Displayed when no articles match the search query
- `and much more`
---

## 📦 Dependencies

Below are the major external dependencies used in this project:

## Live Demo

Frontend: https://your-vercel-link.vercel.app  
Backend: https://your-render-backend.onrender.com

```bash
react
react-dom
react-router-dom
react-top-loading-bar
bootstrap (via CDN)
```

---

## 📄 Meta Description (SEO Optimized)

> Stay ahead with NewsNerd – your personalized hub for the latest tech, science, and trending news. Get curated insights, fast updates, and deep analysis all in one place. Powered by smart algorithms for a tailored reading experience!

---

## 📌 Note

- Make sure to set your `REACT_APP_NEWS_API` environment variable with your [NewsAPI](https://newsapi.org/) key.
- Default fallback image is used if an article doesn’t have one.
- The app is designed to show a maximum of 100 articles per category due to API limitations.

---

## 👨‍💻 Author

**Developed by:** Manav Ujwal Naik (Shadow091101)
**Tech Stack:** MERN (React Focused)  
**Status:** Fully Functional

---
