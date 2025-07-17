# 📅 Smart Scheduler: Weather-Aware & Zoom-Ready Meeting Web App

**Fun meets function!**  
This is a quirky yet practical Node.js web app where you can schedule meetings — online via **Zoom**, or offline with **weather-based preparation tips**. 🌦️  
Whether you’re planning a virtual catch-up or an in-person chai meeting, we’ve got you covered — literally, with umbrellas if needed. ☂️

> ⚠️ Offline meeting addresses are **randomly generated** for fun UX and demo purposes — you won’t actually meet someone at a fictional tea stall. 😉

---

## 📚 Index

1. [🛠️ Tech Stack & Packages Used](#️-tech-stack--packages-used)  
2. [🌐 APIs Integrated](#-apis-integrated)  
3. [📸 Features](#-features)  
4. [🚀 Setup Instructions](#-setup-instructions)  
5. [🎯 How to Use the App](#-how-to-use-the-app)  
6. [🔐 .env Setup](#-env-setup)  
7. [📖 Resources Used](#-resources-used)  
8. [🧩 Future Improvements](#-future-improvements)

---

## 🛠️ Tech Stack & Packages Used

| Tool / Library     | Purpose |
|--------------------|---------|
| **Node.js**        | Backend runtime environment |
| **Express.js**     | Web framework |
| **EJS**            | Templating engine for dynamic HTML |
| **Axios**          | To make HTTP requests (Zoom + Weather APIs) |
| **body-parser**    | To parse form data |
| **nodemailer**     | To send email confirmations |
| **qs**             | To serialize Zoom token request |
| **dotenv**         | To store and load sensitive credentials |
| **faker-js/faker** | To generate fake offline addresses for fun |

---

## 🌐 APIs Integrated

| API | Description |
|-----|-------------|
| **Zoom API** | For scheduling Zoom meetings dynamically |
| **Visual Crossing Weather API** | For fetching daily weather data |
| **LocationIQ (Optional)** | You may use it to enhance location accuracy or geocode addresses |
| **Gmail SMTP** | For sending email notifications via Nodemailer |

---

## 📸 Features

- Schedule meetings with a custom name, date, time, mode, and location
- Automatically creates **Zoom meetings** for online mode with all necessary links
- Generates **fun offline locations** using `faker` library (for demo purposes)
- Shows **live weather forecast** and offers **customized advice**
- Sends a **friendly confirmation email** with all meeting details
- Uses **emojis, icons, and a fun UX tone** throughout the app

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/meeting-weather-app.git
cd meeting-weather-app
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` file

```bash
touch .env
```

Paste your credentials in `.env` like this:

```env
PORT=3000

# Zoom credentials
ZOOM_ACCOUNT_ID=your_account_id
ZOOM_USER_ID=your_zoom_user_email
ZOOM_CLIENT_ID=your_client_id
ZOOM_CLIENT_SECRET=your_client_secret

# Weather API
WEATHER_API_KEY=your_weather_api_key

# Email credentials (App Passwords)
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

Make sure `.env` is listed in `.gitignore` before pushing to GitHub.

### 4. Start the App

```bash
npm start
```

Visit `http://localhost:3000` in your browser 🚀

---

## 🎯 How to Use the App

1. Open the homepage.
2. Fill in your **name**, **email**, **preferred mode**, **location**, **date**, and **time**.
3. Click **Schedule**.
4. You’ll see:

   * For **online meetings**: a Zoom link, meeting ID, and passcode
   * For **offline meetings**: a fun fake address in the city you chose
   * In both: the **weather forecast** and a **funny weather tip**
5. You’ll also receive a **confirmation email** with everything summarized neatly.

---

## 🔐 .env Setup

**Important**: Never share or push `.env` to GitHub.

Make sure your `.gitignore` contains:

```gitignore
.env
```

---

## 📖 Resources Used

## 📚 Resources Used

Below are some of the key resources, documentation, and blogs referred during the development of this app:

- 📘 [Zoom API Documentation](https://developers.zoom.us/docs/api/)
- 🌦️ [Visual Crossing Weather API Documentation](https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/)
- 📧 [Blog: How to Send Emails Securely Using Gmail and Node.js](https://edigleyssonsilva.medium.com/how-to-send-emails-securely-using-gmail-and-nodejs-eef757525324)

---

## 🧩 Future Improvements

* Store user and meeting info in a database (e.g., MongoDB)
* Add cancel/reschedule functionality
* Integrate Google Calendar
* Map preview for offline meetings using Google Maps or Leaflet
* Better error handling and retry logic
* Mobile responsiveness polish

---

### 🧑‍💻 Made with 💖 and a bit of sarcasm by Trisha

