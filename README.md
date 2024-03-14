![1](https://github.com/HassanDev13/factory/assets/48941486/8304ba0b-af52-4d36-8fee-8dd95901aee4)

# Our ToDoApp with Next.js 🔥🔥
Welcome to our ToDoApp built with Next.js! We're excited to present this project, which represents a significant milestone in our development journey, specially the bot chapter. 
We've transitioned from a ToDoApp implemented from scratch using HTML, CSS, vanilla JavaScript, and PHP to the powerful Next.js framework.

## Why Next.js?
Next.js has completely transformed our development experience. With its intuitive structure and powerful features, building dynamic web applications has never been easier.
We're thrilled with the results and can't wait to share them with you.

### What's New?
In this latest version of our app, you'll find the same sleek design and robust functionality you know. However, there's a twist in the behavior of our bot that you won't want to miss.
Our Telegram bot has been supercharged to provide even more value to our users. Now, it not only manages tasks but also fetches detailed information about Telegram users,
including their names, phone numbers, countries, and even their photos. But that's not all—thanks to the magic of CronJob, you can now specify the exact time you want tasks to be sent.
Our Telegram Bot is evolving rapidly, and we're continuously adding new features to enhance your experience. Trust us, you don't want to miss out on this opportunity to try it firsthand.

## To try it, Follow this :

**1) create you're own bot and get the token from the botFather**

Go to your telegram and type on the serch : BotFather

1) Click on start

2) Type the command '/newbot'

3) Type the name of your bot e.g :    HappyBot

4) Then type a unique username of you're bot like :    my_happy_bot          (it must ended with the word 'bot')

5) After the bot father will provide you a token for you're bot like this : 68********:AAH#####################Gw                       keep the key private :)

NOW your bot is ready to test it let's go to the implementation side :

**Implementation : 2) set up you're envirenment and pull the repository, then install : node-telegram-bot-api**

Create a new folder e.g "myApp" for the app

Open the folder on VScode and run on the terminal

```bash
git init
```

Clone the bot repository
```bash
git clone https://github.com/Abdessamed2002/ToDoApp-Next.js-V.git
```

Install node modules
```bash
npm install node-telegram-bot-api express body-parser cors libphonenumber-js node-cron cron-parser
```

Now In the bot.js code replace the botToken with your key provided from botFather "68********:AAH#####################Gw"

**3) run the app on you're terminal**
```bash
npm start
```

**3) Testing Your App and Bot**
Now you're app and bot successfully runs, soo you should go to the localhost:3000 and put a task on the app
![git1](https://github.com/Abdessamed2002/ToDoApp-Next.js-V/assets/157251900/6f0013dd-885d-4293-ada9-611b12253c55)

Then Go to you're telegram and search for you're bot by the username :
![cap3](https://github.com/Abdessamed2002/ToDoAppBot/assets/157251900/76c0e843-9e79-4ea2-9d2c-a05eb25dae2e)

type /start and it will send you 
```bash
welcome!
Share contact
```

Press on the share button or click on the attachement icon
![git2](https://github.com/Abdessamed2002/ToDoApp-Next.js-V/assets/157251900/2c89cb3b-56ab-4697-a600-54fc6e7b2916)

in the terminal you can see you're data like this
![git3](https://github.com/Abdessamed2002/ToDoApp-Next.js-V/assets/157251900/380f6f26-7d26-4efc-a7e9-f39c6b3736cf)

If you want to try the CronJob you need to change just the dateTimeList or the cronList and make a valid date and hour and run the app, you will receive a message on you're phone on the time.
![git6](https://github.com/Abdessamed2002/ToDoApp-Next.js-V/assets/157251900/3c63ef85-49b2-4c5d-be3a-cd884ef07c17)

![git4](https://github.com/Abdessamed2002/ToDoApp-Next.js-V/assets/157251900/c85950a9-97d9-4ca4-b33e-2c381e590b20)

### Contributing
We welcome contributions from developers of all skill levels. Whether you're fixing bugs, adding features, or improving documentation, your contributions are invaluable to us.


**Stay organized, stay productive with our Telegram Bot Integrated ToDo App!**
