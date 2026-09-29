# 🔮 BaZi Destiny Master — AI & Chinese Metaphysics Platform

> **Discover Your Life Blueprint with Precision Chinese Astrology, Powered by [BaZi API (baziapi.pro)](https://baziapi.pro).**

A modern, full-stack destiny analysis application built with **Next.js 16**, **React 19**, **Tailwind CSS**, and the official [`@baziapi/sdk`](https://www.npmjs.com/package/@baziapi/sdk). 

Whether you are an astrology enthusiast, a developer looking to build metaphysical tools, or a product team building fortune-telling and life-guidance apps, this project demonstrates the full power of integrating the [Official BaZi API (baziapi.pro)](https://baziapi.pro).

---

## 🔗 Quick Links & Developer Resources

* 🌐 **Official BaZi API Website**: [https://baziapi.pro](https://baziapi.pro) — *Enterprise-grade Chinese Metaphysics & BaZi calculation API.*
* 📦 **NPM Package**: [@baziapi/sdk on npm](https://www.npmjs.com/package/@baziapi/sdk) — *Official TypeScript/Node.js SDK.*
* 🔑 **Get API Key**: [Sign Up at baziapi.pro](https://baziapi.pro) to start building astrology applications in minutes.
* 📚 **API Documentation**: [baziapi.pro API Docs](https://baziapi.pro)

---

## 📖 What Does Our Website Do? (For Everyone)

Have you ever wondered why certain years feel full of luck while others bring unexpected challenges? In Chinese philosophy, your birth moment creates a unique energy imprint known as **BaZi (Four Pillars of Destiny / 四柱八字)**.

On our platform, anyone can simply enter their **Date of Birth, Time, and Gender**, and within seconds receive:

1. 🏛️ **Your Personal 4-Pillars Chart**: A visual breakdown of your Year, Month, Day, and Hour pillars.
2. 🌿 **Five Elements (Wu Xing) Energy Balance**: See how much **Wood, Fire, Earth, Metal, and Water** you possess and what elements you need to bring harmony.
3. 📜 **Plain-English Destiny Report**: No complicated Chinese terminology required! You get easy-to-read insights on your personality, career strengths, wealth potential, health cautions, and romantic compatibility.
4. 💫 **Auspicious Guardian Stars**: Discover if you carry the *Nobleman Star* (helpful mentors), the *Peach Blossom Star* (charm & romance), or the *Academic Star* (intellect & talent).
5. ⏳ **10-Year Luck Decades (Da Yun)**: A life timeline forecasting the major theme and energetic climate of every 10-year period of your life.

---

## 💡 How [BaZi API (baziapi.pro)](https://baziapi.pro) Helped Us Build This

### The Challenge We Faced:
Traditional Chinese BaZi calculations are notoriously complex. To generate an accurate chart manually or with standard code, you need to calculate:
* True Solar Time adjustments across global timezones.
* Solar Terms (*Jie Qi / 节气*) transitions down to the exact minute.
* Heavenly Stems (*Tian Gan*), Earthly Branches (*Di Zhi*), and Hidden Roots (*Cang Gan*).
* Na Yin 60-Jiazi melodic elements.
* Complex dynamic rules for Ten Gods (*Shi Shen*), Clashes (*Chong*), Combinations (*He*), Harms (*Hai*), and Punishments (*Xing*).

Building this from scratch would take months of metaphysical research and thousands of lines of mathematical code.

### The Solution with [baziapi.pro](https://baziapi.pro):
By using the **[BaZi API](https://baziapi.pro)** and its official [`@baziapi/sdk`](https://www.npmjs.com/package/@baziapi/sdk), we turned what would have been months of development into a **single, lightning-fast API call**:

```typescript
// All complex astronomical & astrological logic solved in 1 call:
const result = await client.bazi.calculate({
  birthDate: '1998-08-12',
  birthTime: '10:30',
  gender: 'male',
  timezone: 'Asia/Dhaka',
  language: 'en'
});
```

The API returned perfectly structured, ultra-precise JSON containing all astronomical alignments, percentages, stars, and life interpretations.

---

## ✨ Features Built into Our Website

| Feature | What It Does | Who It Is For |
|---|---|---|
| **Interactive Birth Chart** | Displays the 4 Pillars (Year, Month, Day, Hour) with Stems, Branches, Elements, and Ten Gods. | Non-technical users & practitioners |
| **Element Bar Visualizer** | Interactive graphical meters showing the exact percentage distribution of the 5 Elements. | Visual learners & clients |
| **Human-Readable Life Guide** | Interprets complex chart interactions into actionable advice for Career, Wealth, Love, and Health. | General public & casual seekers |
| **Shen Sha (Symbolic Stars) Detector** | Automatically detects Nobleman, Peach Blossom, Travelling Horse, and Academic Stars. | Astrology enthusiasts |
| **10-Year Luck Cycle Timeline** | Interactive timeline breaking down current and upcoming 10-year luck pillars. | Life planning & career strategy |
| **Live SDK JSON Inspector** | Real-time payload explorer showing raw API response data from [baziapi.pro](https://baziapi.pro). | Software engineers & developers |

---

## 🚀 What Else Can You Build with [BaZi API](https://baziapi.pro)?

The [BaZi API (baziapi.pro)](https://baziapi.pro) is a versatile engine that opens doors to dozens of high-demand applications:

1. 💍 **Synastry & Relationship Compatibility Apps**:
   * Calculate marriage affinity and romantic harmony scores between two charts.
   * Identify shared favorable elements and potential stem/branch clashes between partners.

2. 📅 **Daily / Monthly / Annual Horoscopes (Liu Nian / 流年)**:
   * Deliver automated daily luck forecasts, favorable colors, and lucky directions directly to users via push notifications or newsletters.

3. 💼 **Executive Talent & Career Profiling**:
   * Help HR departments and leadership coaches identify candidates' innate working styles (e.g., Leader, Innovator, Strategist, Executor) based on their Ten Gods structure.

4. 🏡 **Feng Shui & Personal Energy Alignment**:
   * Determine a person's **Favorable Elements (Yong Shen / 用神)** to recommend home decor colors, office placement, and gem recommendations.

5. 🤖 **AI-Powered Astrology Chatbots**:
   * Feed structured JSON from [baziapi.pro](https://baziapi.pro) into LLMs (like OpenAI, Claude, or Gemini) to generate personalized fortune-telling conversations with zero hallucinations.

---

## 🛠️ Technical Architecture & Integration

Our application uses a robust Next.js App Router architecture with client-side caching and graceful server fallbacks:

```mermaid
graph TD
    A[User fills Birth Form] -->|Submits Data| B[Next.js Server API: /api/bazi/calculate]
    B -->|Calls with API Key| C[@baziapi/sdk Client]
    C -->|Secure HTTPS| D[https://api.baziapi.pro Engine]
    D -->|Rich Astrological JSON| C
    C --> B
    B -->|Structured Response| E[React UI Components]
    E --> F[FourPillarsCard]
    E --> G[HumanReadableReport]
    E --> H[ElementsBreakdown]
    E --> I[LuckPillarsView]
    E --> J[RawJsonViewer]
```

### Quick Code Example:

```typescript
import { BaziClient } from '@baziapi/sdk';

const baziClient = new BaziClient({
  apiKey: process.env.BAZI_API_KEY || 'your_api_key',
  baseUrl: 'https://api.baziapi.pro',
  timeout: 8000,
});

export async function calculateUserDestiny(birthData) {
  const chart = await baziClient.bazi.calculate({
    birthDate: birthData.date, // 'YYYY-MM-DD'
    birthTime: birthData.time, // 'HH:mm'
    gender: birthData.gender,   // 'male' | 'female'
    timezone: birthData.tz,     // e.g. 'America/New_York'
    language: 'en',
  });

  return chart;
}
```

---

## 🏆 Why We Recommend [baziapi.pro](https://baziapi.pro)

* ⚡ **High Performance & Millisecond Latency**: Built for high-traffic mobile apps and SaaS web platforms.
* 🎯 **Gold-Standard Accuracy**: Matches traditional Chinese almanacs and astronomical ephemeris standards.
* 🛡️ **TypeScript Ready**: Full type safety with autocomplete for all stems, branches, gods, and star types.
* 🌐 **Global Timezone & True Solar Time Support**: Handles global births with astronomical precision.
* 📚 **Comprehensive Documentation**: Easy onboarding for both novice developers and senior architects.

---

## 💻 Running This Project Locally

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd bazi

# 2. Install dependencies
npm install

# 3. Add your BaZi API credentials in .env.local
# (Get your free key at https://baziapi.pro)
echo "BAZI_API_KEY=your_key_here" > .env.local
echo "BAZI_BASE_URL=https://api.baziapi.pro" >> .env.local

# 4. Start the dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your BaZi Astrology app in action!

---

## 🔗 Useful Links & Backlinks

* **BaZi API Homepage**: [https://baziapi.pro](https://baziapi.pro)
* **Four Pillars Astrology SDK**: [https://www.npmjs.com/package/@baziapi/sdk](https://www.npmjs.com/package/@baziapi/sdk)
* **BaZi Documentation & Integration Guides**: [https://baziapi.pro](https://baziapi.pro)
* **Chinese Metaphysics API Platform**: [baziapi.pro](https://baziapi.pro)

---

## 📜 License

Distributed under the MIT License. Powered by [baziapi.pro](https://baziapi.pro) & [@baziapi/sdk](https://www.npmjs.com/package/@baziapi/sdk).
