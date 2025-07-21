# Meeting Scheduler WebApp

A practical Node.js web application that allows users to schedule meetings — either **online via Zoom** or **offline with weather-based suggestions**.

---

## Index

1. [Tech Stack](#tech-stack)
2. [APIs Used](#apis-used)
3. [Key Features](#key-features)
4. [Setup Instructions](#setup-instructions)
5. [Using the App](#using-the-app)
6. [.env Configuration](#env-configuration)
7. [Resources](#resources)
8. [Planned Enhancements](#planned-enhancements)

---

## Tech Stack

| Tool / Library | Purpose                           |
| -------------- | --------------------------------- |
| Node.js        | Backend runtime                   |
| Express.js     | Web server framework              |
| EJS            | Templating engine                 |
| Axios          | HTTP requests                     |
| body-parser    | Parsing form data                 |
| nodemailer     | Sending email notifications       |
| qs             | Encoding Zoom auth requests       |
| dotenv         | Environment variable management   |
| faker-js/faker | Generating mock offline addresses |

---

## APIs Used

| API                 | Usage                                     |
| ------------------- | ----------------------------------------- |
| Zoom API            | Automatically create Zoom meetings        |
| Visual Crossing API | Get weather forecasts                     |
| Gmail SMTP          | Send confirmation emails using Nodemailer |

---

## Key Features

* Schedule a meeting by filling a simple form.
* For **online meetings**, auto-generates a Zoom link with details.
* For **offline meetings**, displays weather forecast and suggestions.
* Sends a confirmation email with all meeting information.
* Fun but informative — random addresses used only for demo purposes.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/TrishaBhavini/meeting-scheduler.git
cd meeting-scheduler
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure `.env`

Create a `.env` file and add:

```env
PORT=3000

ZOOM_ACCOUNT_ID=your_account_id
ZOOM_USER_ID=your_zoom_user_email
ZOOM_CLIENT_ID=your_client_id
ZOOM_CLIENT_SECRET=your_client_secret

WEATHER_API_KEY=your_weather_api_key

EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

Ensure `.env` is listed in `.gitignore`.

### 4. Run the App

```bash
npm start
```

Visit `http://localhost:3000`

---

## Using the App

1. Fill in meeting details: name, email, location, date, time, and meeting mode.
2. On submission:

   * Online mode → Zoom link + credentials.
   * Offline mode → Forecast + generated location + weather tip.
3. An email with meeting info is sent to the user.

---

## .env Configuration

Keep your `.env` file private. Include in `.gitignore`:

```gitignore
.env
```

---

## Resources

* [Zoom API Documentation](https://developers.zoom.us/docs/api/)
* [Visual Crossing Weather API Docs](https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/)
* [How to Send Emails with Gmail and Node.js](https://edigleyssonsilva.medium.com/how-to-send-emails-securely-using-gmail-and-nodejs-eef757525324)

---

## Planned Enhancements

* Database integration for storing meetings.
* Reschedule or cancel functionality.
* Google Calendar sync.
* Map previews for offline locations.
* Improved error handling and mobile responsiveness.

---

**Developed by Trisha Bhavini**
