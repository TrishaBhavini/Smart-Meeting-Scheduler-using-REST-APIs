import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import qs from "qs";
import { faker } from '@faker-js/faker';
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
app.set("view engine", "ejs"); // Add this if using EJS
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const accID = process.env.ZOOM_ACCOUNT_ID;
const userID = process.env.ZOOM_USER_ID;
const clientId = process.env.ZOOM_CLIENT_ID;
const clientSecret = process.env.ZOOM_CLIENT_SECRET;
const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
const tokenUrl = `https://zoom.us/oauth/token`;
// Utility to generate random address
function generateAddress(city) {
  return {
    street: faker.location.streetAddress(),
    city: city,
    state: faker.location.state(),
    country: "India",
    zipCode: faker.location.zipCode("######")
  };
}

// Weather-based advice
function getOnlineMeetingAdvice(icon) {
  switch (icon) {
    case "snow":
    case "snow-showers-day":
    case "snow-showers-night":
      return "Snowy weather. Stay warm indoors and ensure internet is stable. Make some Hot Chocolate! ☕️";
    case "thunder-rain":
    case "thunder-showers-day":
    case "thunder-showers-night":
      return "Thunderstorms expected. Charge devices in case of outages. Carry your emotional support animal for the frightening sounds. 🐾";
    case "rain":
    case "showers-day":
    case "showers-night":
      return "Rainy day. Stay in, close windows, and focus on your call. Make some Chai!";
    case "fog":
      return "Low visibility outside. Avoid windows for better lighting. ";
    case "wind":
      return "Windy outside. Keep background noise low. Don't fly away with the wind! 🌬️";
    case "cloudy":
    case "partly-cloudy-day":
    case "partly-cloudy-night":
      return "Mild weather. Enjoy the ambient light.";
    case "clear-day":
      return "Sunny day! Keep hydrated. A good day to have some Ice Cream! 🍧";
    case "clear-night":
      return "Clear and calm. Ideal for evening calls.";
    default:
      return "No specific weather condition. Be prepared!";
  }
}

function getOfflineMeetingAdvice(icon) {
  switch (icon) {
    case "snow":
    case "snow-showers-day":
    case "snow-showers-night":
      return "Dress warmly, and expect delays.";
    case "thunder-rain":
    case "thunder-showers-day":
    case "thunder-showers-night":
      return "Carry an umbrella. Roads might be blocked.";
    case "rain":
    case "showers-day":
    case "showers-night":
      return "Rain gear needed. Be careful on wet roads.";
    case "fog":
      return "Low visibility. Drive slow and safe.";
    case "wind":
      return "Avoid loose clothing. Stay alert.";
    case "cloudy":
    case "partly-cloudy-day":
    case "partly-cloudy-night":
      return "Cloudy but calm. Keep an eye out.";
    case "clear-day":
      return "Sunglasses, sunscreen, water – carry essentials.";
    case "clear-night":
      return "Cool and pleasant. Light jacket recommended.";
    default:
      return "Check sky and dress accordingly.";
  }
}

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/schedule", async (req, res) => {
  try {
    const { mode, name, location, date, time, email } = req.body;
    const startDateTime = `${date}T${time}:00+05:30`;
    
    // Fetch weather
    const weatherRes = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?key=${process.env.WEATHER_API_KEY}&unitGroup=metric&iconSet=icons2`);
    const weatherDay = weatherRes.data.days[0];
    const weather = weatherDay.description;
    const icon = weatherDay.icon;

    let meetingID, joinURL, passcode, address;
    let weatherAdvice;

    if (mode === "online") {
      // Get Zoom token
      const tokenResponse = await axios.post(tokenUrl, qs.stringify({
        grant_type: "account_credentials",
        account_id: accID
      }), {
        headers: {
          "Authorization": `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      const accessToken = tokenResponse.data.access_token;

      // Create meeting
      const zoomRes = await axios.post(`https://api.zoom.us/v2/users/${userID}/meetings`, {
        agenda: 'Meeting',
        duration: 120,
        password: '98765',
        start_time: startDateTime,
        timezone: 'Asia/Kolkata',
        topic: 'My Meeting',
        type: 2
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      meetingID = zoomRes.data.id;
      joinURL = zoomRes.data.join_url;
      passcode = zoomRes.data.password;
      weatherAdvice = getOnlineMeetingAdvice(icon);
    } else {
      weatherAdvice = getOfflineMeetingAdvice(icon);
      address = generateAddress(location);
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    transporter.sendMail({
      from: 'Trisha <for.developing.purpose400@gmail.com>',
      to: email,
      subject: `${name}, Your Meeting has been Scheduled!`,
      html: `
        <h2>🎉 Meeting Successfully Scheduled!</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Your meeting details are as follows:</p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Mode:</strong> ${mode}</li>
        </ul>
        ${mode === "online" ? `
        <h3>🔗 Online Meeting Details</h3>
        <ul>
          <li><strong>Meeting ID:</strong> ${meetingID}</li>
          <li><strong>Join URL:</strong> <a href="${joinURL}" target="_blank">${joinURL}</a></li>
          <li><strong>Passcode:</strong> ${passcode}</li>
        </ul>
        ` : `
        <h3>📍 Offline Meeting Details</h3>
        <ul>
          <li><strong>Location:</strong> ${location}</li>
          <li><strong>Address:</strong> ${address.street}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}</li>
        </ul>
        `}
       <div class="weather-info">
      <h2>🌤️ Bonus Weather Scoop!</h2>
      <div class="weather-content">
        <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${icon}.png" alt="Weather Icon" width="60" />
        <p><strong>Forecast:</strong> ${weather}</p>
      </div>
      <p>☂️ <strong>Heads-up:</strong> ${weatherAdvice}</p>
      <p class="fun-tip">I can't control the weather, but I can help you not show up soaked or sunburnt. 😎🌧️</p>
      </div>
        <p>Looking forward to your presence.<br/> Warm Regards,<br/>Trisha</p>`
    });
    // Final render
    res.render("success.ejs", {
      name, date, time, mode,location, email,
      weather, icon, weatherAdvice,
      meetingID, joinURL, passcode
    });

  } catch (err) {
    console.error("Error scheduling meeting:", err.message);
    res.status(500).send("Something went wrong. Please try again.");
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
