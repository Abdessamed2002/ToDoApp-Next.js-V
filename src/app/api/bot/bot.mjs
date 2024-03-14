import TelegramBot from "node-telegram-bot-api";
import express from "express"; // create express app wich receive the data from todo app
import bodyParser from 'body-parser';  // to parse the JSON data received from script.js
import cors from 'cors'; // cors to declare the front-end origin of my todo app
import { parsePhoneNumber } from 'libphonenumber-js'; // to get the country code of all phone numbers
import cron from 'node-cron';
import cronParser from 'cron-parser';

const botToken = "6849664260:AAHAZOLoZpJVAcjPqwH31sXeQVG8k_ZEIGw"; // Replace with your bot token
const bot = new TelegramBot(botToken, { polling: true });
const trackedUsers = [];  // Array to store users ID
const usersPhotosDict = {}; // dictionnaire id : userid    value : list of phototoUrls
const photoUrlsList = [];

bot.on('polling_error', err => console.log(err));
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  const firstName = msg.from?.first_name;
  const lastName = msg.from?.last_name;
  let welcomeMessage = "Hello ";

  if (lastName) { welcomeMessage += firstName + " " + lastName; } else { welcomeMessage += firstName; }
  bot.sendMessage(chatId, welcomeMessage);
  
  if (!trackedUsers.includes(userId)) { trackedUsers.push(userId); } // attention to user id and chat id
  
  if (!usersPhotosDict.hasOwnProperty(userId)) {
    bot.getUserProfilePhotos(userId).then((response) => {
      const totalPhotos = response.total_count;
      console.log('Total profile photos: ', totalPhotos);
      const photos = response.photos;
      // Iterate through the photos array
      photos.forEach((photo, photoIndex) => {
        const fileId = photo[2].file_id;
        bot.getFile(fileId).then((fileInfo) => { // Get file information using Telegram Bot API's getFile method
          const fileUrl = `https://api.telegram.org/file/bot${botToken}/${fileInfo.file_path}`;
          photoUrlsList.push(fileUrl);
        });
        const width = photo[2].width;
        const height = photo[2].height;
        const fileSize = photo[2].file_size;
      });
    })
    .catch((error) => {
      console.error('Error fetching user profile photos:', error);
    });
    usersPhotosDict[userId] = photoUrlsList;
  }
  bot.sendMessage(chatId, 'Contact', {
    reply_markup: {
        keyboard: [
            [{ text: 'Share contact', request_contact: true }]
        ],
        resize_keyboard: true
    }
  }).then((sentMessage) => {
    bot.once('contact', async (contactMsg) => { // Listen for the contact event once the message is sent
      const phoneNumber = contactMsg.contact.phone_number;
      const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;// Ensure phone number is in the correct format
      const parsedPhoneNumber = parsePhoneNumber(formattedPhoneNumber);
      let country = '';
      if (parsedPhoneNumber) {
          country = parsedPhoneNumber.country || '';
      }
      // Create an object containing the user's characteristics
      const userData = { 
        userId, 
        chatId, 
        firstName, 
        lastName,
        phoneNumber : formattedPhoneNumber,
        country,
        profilePhotos: usersPhotosDict[userId]
      };
      // Send user data to PHP endpoint
      const response = await fetch("http://localhost:3002/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      })
      .catch(error => {
          console.error("Error:", error);
      });
    });
  }).catch((error) => {
      console.error('Error sending message:', error);
  });
});

const cronList = ["30 * * * *", "31 18 * * *", "32 18 13 3 *"];

function timeMatches(expression, date) {
  const interval = cronParser.parseExpression(expression);
  const data = interval.fields;
  if (!data.second.includes(date.getSeconds())) {
    return false;
  }
  if (!data.minute.includes(date.getMinutes())) {
    return false;
  }
  if (!data.hour.includes(date.getHours())) {
    return false;
  }
  if (!data.dayOfMonth.includes(date.getDate())) {
    return false;
  }
  if (!data.month.includes(date.getMonth() + 1)) {
    return false;
  }
  if (!data.dayOfWeek.includes(date.getDay())) {
    return false;
  }
  return true;
}

function dateTimeMatches(dateTimeList, currentDate) {
  const currentDateTimeStr = currentDate.toISOString().substring(0, 16); // Get the current date and time in YYYY-MM-DDTHH:mm format
  console.log(currentDateTimeStr);
  return dateTimeList.includes(currentDateTimeStr);// Check if the current date and time matches any date and time in the list
}
const dateTimeList = ['2024-03-13T17:55', '2024-03-13T17:56'];// we should make it less one hour cause it works with GMT
const currentDate = new Date();// Check if the current date and time matches any date and time in the list
cron.schedule('* * * * *', () => {
  console.log('Running cron job...');
  cronList.forEach(cronExpression => {
    if (timeMatches((cronExpression), new Date())) {
      trackedUsers.forEach(userId => {
        bot.sendMessage(userId, `This is your scheduled message at : ${cronExpression}`);
      });
    }
    else { console.log("9iiiiw")}
  });
  if (dateTimeMatches(dateTimeList, new Date())) {
    trackedUsers.forEach(userId => {
      bot.sendMessage(userId, 'ba3');
    });
  } else {
    console.log('Current date and time does not match any date and time in the list.');
  }
});
const app = express();
app.use(bodyParser.json()); // use to parse the body data based on the JSON format and converts it into a JavaScript object
app.use(cors({ origin: 'http://localhost' })); // front-end origin
app.post('/bot', async (req, res) => {
  if(req.body.task === "") { return res.status(400).json({ message: "Error : you're task is empty" }); }
  if(!req || !req.body || !req.body.task) { return res.status(400).json({ message: "No task to send" }); }
  const newTask = req.body.task;
  for (const userId of trackedUsers) { bot.sendMessage(userId, `New task added: ${newTask.task}`); }
  res.end();// Close the response
});
app.listen(3001, () => console.log("Server listening on port 3001")); // server started of express app to receive request from script.js




/* delete attachement icon    bot.sendMessage(chatId, 'Your message here', {    reply_markup: {      remove_keyboard: true    }  });*/



/*
bot.on('location', async (msg) => {
  const latitude = msg.location?.latitude;
  const longitude = msg.location?.longitude;
  const locationData = await getLocationData(latitude, longitude);
  if (locationData && locationData.city && locationData.country) {
    const message = `You are in ${locationData.city}, ${locationData.country}`;
    bot.sendMessage(msg.chat.id, message);
  } else {
      bot.sendMessage(msg.chat.id, 'Unable to determine location');
  }
});
const getLocationData = async (latitude, longitude) => {
  const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=a9d5a92cb5e64e029736608e4998448d`);
  const { results } = await res.json();
  const { city, town, country } = results[0].components;
  const point = city || town || '';
  if (!point || !country) return {};
  const transliteratedCity = transliterate(point);
  const transliteratedCountry = transliterate(country);
  return { city: transliteratedCity, country: transliteratedCountry };
};
*/
















/* contact code encien
// const usersData = {}; // Dictionary to store user data
bot.on('contact', (msg) => {
  const phoneNumber = msg.contact.phone_number;
  const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;// Ensure phone number is in the correct format
  const parsedPhoneNumber = parsePhoneNumber(formattedPhoneNumber);
  let country = '';
  if (parsedPhoneNumber) {
      country = parsedPhoneNumber.country || '';
  }
  // Store the user's phone number and country in the usersData dictionary
  usersData[userId] = { phoneNumber: formattedPhoneNumber, country };
  //const country = parsedPhoneNumber ? parsedPhoneNumber.country : '';
  // bot.sendMessage(msg.chat.id, "you're country code is : "+country);
  // const phoneNumber = '+12726385311'; // 9 numbers for phone and the rest to country code
});
if (!usersPhotosDict.hasOwnProperty(userId)) {
    bot.getUserProfilePhotos(userId).then((response) => {
      const totalPhotos = response.total_count;
      console.log('Total profile photos: ', totalPhotos);
      const photos = response.photos;
      // Iterate through the photos array
      photos.forEach((photo, photoIndex) => {
        const fileId = photo[2].file_id;
        bot.getFile(fileId).then((fileInfo) => { // Get file information using Telegram Bot API's getFile method
          const fileUrl = `https://api.telegram.org/file/bot${botToken}/${fileInfo.file_path}`;
          photoUrlsList.push(fileUrl);
          //console.log(photoUrlsList);
        });
        //const fileUrl = `https://api.telegram.org/file/bot${botToken}/${fileId}`; // Constructing the URL
        const width = photo[2].width;
        const height = photo[2].height;
        const fileSize = photo[2].file_size;
        //bot.sendMessage(chatId, `Photo ${photoIndex + 1}:`);
        //bot.sendPhoto(chatId, fileId, { caption: `Width: ${width}, Height: ${height}, File Size: ${fileSize}` });
      });
    })
*/