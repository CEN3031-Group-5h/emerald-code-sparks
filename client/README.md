# Group 5H - Admin Role: Project 12 - Client

This is the readme file for the **client** side of the full-stack CASMM project.

## Table of Contents
1. [Application Setup](#Application-Setup)
2. [Project Structure](#Project-Structure)
3. [Routing](#Routing)
4. [Styling](#Styling)
5. [Project Directory Guide](#Project-Directory-Guide)
6. [Features Implemented](#Features-Implemented)

## Application Setup

> [React.js](https://reactjs.org/) application which represents the entire browser-side client. File structure is standard for a [create-react-app](https://github.com/facebook/create-react-app) application with some minor changes. Any component which represents an entire page is categorized under the [views](/client/src/views) folder.

<br />

#### Prerequisites

Before you begin the setup process, ensure you have the following prerequisites in place. This will ensure you can smoothly perform the setup process as well as troubleshoot any issues thay may come up. 
1. Have basic understanding of HTML, CSS (.less), React.js, & Node.js
2. Have basic understanding of git in the event you wish to clone the repository

#### Setup

1. Install [Node](https://nodejs.org/en/) and [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable). To verify the installations were successful, you can run the 'node -v' and 'yarn --version' commands in your command line interface
3. Run `yarn` to install project dependencies
4. Run `yarn start` to startup the client (please note that much of the functionality will not work without also starting up the backend services)
5. Navigate to chrome://flags/ and enable the #enable-experimental-web-platform-features flag (This will provide your browser access to serial ports)

<br />

## Project Structure

This react project has the following file structure rules:
1. Routing is handled from client root in `App.js`, rendered in react by `index.js`
2. Components which render as a page are generally listed under the `/views` folder
3. Component styling is placed into a folder under the name of the main component alongside the component and sub-component files. 
    - As an example the folder `/Home` contains the `Home.js` component, the `Home.css` styling, and a couple of sub-components.
4. `/Utils` contains additional utility functions like different database requests or authentication handlers

<br/>

## Routing

All client routes are handled by react router. The **index.html** file and all static assets will be served by the [server](/server#static-assets).

<br/>

#### Available Scripts

In the project directory, you can run:

##### `yarn start`

Runs the app in the development mode.
However, ensure terminal location is in client prior to entering the 'yarn start' command(use command cd client)
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

##### `yarn start-build`

Starts a basic http server (using [http-server](https://www.npmjs.com/package/http-server)) which serves the build folder on [http://localhost:3000](http://localhost:3000) .

##### `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

#### 'docker compose up'
Reads the docker-compose.yml file, and starts all services defined in this file. Essentially enables the connection to the backend. 

#### Admin sign-in details
To begin using the application, you must sign in as admin. 

<br />

## Styling

To maintain a consistant theme the folowing has been implemented in `\client\src\assets\style.less` for import

### Colors

    primary: #3D5C82;
    secondary: #5BABDE;
    tertiary: #F4F4F5;
    text-primary: #414141;
    text-secondary: #FFFFFF;

<br />

### Relevant notes

Section on fixing issue where yarn build does not minify: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

Section on code splitting, worth considering at some point: https://facebook.github.io/create-react-app/docs/code-splitting

### Project Directory Guide

| Directory | Explanation |
|----------|----------|
| ../public  | Contains libraries and symbols/icons used within the project.  |
| ../public/images  | Contains symbols/icons used within the project.  |
| ../public/lib  | Contains libraries used within the code. For more info there is a readme file in the lib directory.  |
| ../src  | Contains all source code for the project, as well as pictures and diagrams used within the project.  |
| ../src/utils  | Contains custom hooks, functions for api calls, and other various exported functions used within the project.  |
| ../src/assets  | Contains images and diagrams used within the project.  |
| ../src/components  | Contains reusable "building blocks" for the project.  |
| ../src/views  | Contains all the views for the project. i.e. UIs, dashboard, login screens, etc.  |
| ../src/views/Admin  | This contains code for the admin component where mentors/teachers can see and add organizations  |
| ../src/views/Dashboard  | This contains code for the dashboard component where mentors/teachers can view/manage classrooms within the platform.  |



### Features Implemented

#### Admin UI Page

This is the central UI page for admins. It displays their currently active organizations with their attributes ( # of members and classes), as well as providing a **+** button for which they can create a new organization. When the **+** is clicked, it renders a pop-up form where the client is prompted to enter in the name of the organization they would like to create. By clicking the **view** button on an organization, the admin can then access three new views: **Classrooms**, **Users**, and **Lessons**.
<div style="display: flex; justify-content: space-between;">
    <img src="https://media.discordapp.net/attachments/1168945470920466504/1182413589798211635/Admin_Page.png?ex=65849b77&is=65722677&hm=08429dde8c26912b27ce070bd575c39be2c4df228f2fd95cd9b0962af05123af&=&format=webp&quality=lossless&width=720&height=390" alt="Admin UI View" width="48%">
    <img src="https://media.discordapp.net/attachments/1168945470920466504/1182413590221819995/Create_Org_Form.png?ex=65849b78&is=65722678&hm=d413a96081fdfc63bf5fa1dd65a7fb899d0dd6fc512abd5a04f27b8a6f8e972e&=&format=webp&quality=lossless&width=720&height=390" alt="Admin UI Add Organization" width="48%">
</div>

#### Classrooms UI Page

This is the first tab that the admin will be sent to upon clicking **view** on an organization. It displays each class within the organization, the classroom's join code, and # of students (note, the # of students is currently not showing up due to a bug). There are two buttons provided on each tile: **view** and **add mentor**. This means admins can add teachers to manage a specific classroom, or click view to see more details about the classroom.

<img src="https://media.discordapp.net/attachments/1168945470920466504/1182413590708367501/Org_Manager_Page_Classrooms.png?ex=65849b78&is=65722678&hm=3a58b3f18340ba0289b7e139ba0a80ce5f298fd8cf64a05ee99749df251c4df4&=&format=webp&quality=lossless&width=720&height=391" alt="Classrom UI View" width="96%">

#### Users UI Page

This is the second tab that the admin can navigate to upon clicking **view** on an organization. It displays each user within the organization. Admins can add users to the organization by typing in their email to the add user form. If the user's email does not exist as an authorized user within the CASMM system, then the submit button will prompt an error message informing the admin that the user cannot be added. Otherwise, the user will be added to the user UI table upon submission.

<div style="display: flex; justify-content: space-between;">
    <img src="https://media.discordapp.net/attachments/1168945470920466504/1182413591186526218/Org_Manager_Users_Page.png?ex=65849b78&is=65722678&hm=40242c1a5579bb75eeaaf9c9bb5aef528a8e36390c6b3ebf9aef133ee708c32b&=&format=webp&quality=lossless&width=720&height=389" alt="User UI View" width="48%">
    <img src="https://media.discordapp.net/attachments/1168945470920466504/1182413591555608687/Org_Manager_Add_User_Form.png?ex=65849b78&is=65722678&hm=ebfa5278b4f33c93fe4fdbb81ac71f3f1c1dda8a2ef6badea6dab050fdfe4817&=&format=webp&quality=lossless&width=720&height=330" alt="User UI Add User" width="48%">
</div>

#### Lessons UI Page

The third and final tab that the admin can navigate to upon clicking **view** on an organization is the lessons UI page. This page shows each lesson plan created within the organization. It also provides admins with an easy-to-use lesson plan creator. This form can only be submitted if every form is filled and will provide admins with notifications indicating empty fields. The lesson will then be added live, without the need to refresh the page, to the lesson plans. Additionally, the lessons will be added to the backend upon creation.

<div style="display: flex; justify-content: space-between;">
    <img src="https://media.discordapp.net/attachments/1168945470920466504/1182413592138625024/Org_Manager_Lessons_Page.png?ex=65849b78&is=65722678&hm=a4b9e165be5bc0f5d760a392ddc876e518e125b4a42006525504e1ad28c56500&=&format=webp&quality=lossless&width=720&height=390" alt="Lesson UI View" width="48%">
    <img src="https://media.discordapp.net/attachments/1168945470920466504/1182413592738402464/Org_Manager_Lessons_Form.png?ex=65849b78&is=65722678&hm=5e3021c8f32afa3fc6317586273f20c760cf7fada275b1260b27277d69217e19&=&format=webp&quality=lossless&width=720&height=361" alt="Lesson UI Add Lesson" width="48%">
</div>
