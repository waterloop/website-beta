# website
Waterloop Official Website

## Requirements
- node.js (http://nodejs.org, pick current rather than LTS if installing fresh)
- git (https://git-scm.com/)

## Development Instructions
- Clone the repo
- Ask for the `.env` file from the web lead
- Download said `.env` file (save it without the `.` on Mac and Linux since files starting with `.` are hidden on these platforms, and on Mac specifically there is no easy way to make finder show them)
- Copy said `.env` file into the project folder and rename it to be `.env`
- On a terminal (Terminal.app on Mac, Command Prompt/cmd.exe on Windows, if you're using Linux you know what I'm talking about) `cd` into the project directory
- Run `npm install`
- Run `npm run dev`, wait, and then open the link in the browser

If you have any questions about any of the above, please contact the web lead immediately.

## FAQ
### How do I "Clone the repo"?
https://try.github.io/

Please create branches for things you work on, and create pull requests for merging them in.
### Command lines are scary!
https://www.codecademy.com/learn/learn-the-command-line (some of it will not work on Windows command prompt, but that's okay for our use case)
### What are all these files ending in `.vue`?
https://vuejs.org/ (please read at least "Essentials")
### What is `nuxt.config.js`?
https://nuxtjs.org/ (if you do no understand anything then it's okay)

Under normal usage, you need not touch that file.
### What do I use to edit the code?
Your favourite code editor, as long as it is not Word, Notepad, etc. If you don't have one, I recommend https://code.visualstudio.com/.
### Why do I have no syntax highlighting?
You have to install plugins for your editor for syntax highlighting for `.vue` files. This is the one for vscode: https://marketplace.visualstudio.com/items?itemName=octref.vetur
