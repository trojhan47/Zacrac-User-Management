# Zacrac-user-profile-application-assessment

This project repository contains a Node.js + MongoDB application written in TypeScript. It serves as a backend for a user management system. Below are instructions on how to set up and run the application.

Prerequisites
Before you can run this application, make sure you have the following software installed on your system:

Node.js (v14 or higher) <br>
npm (Node Package Manager) <br>
TypeScript  (Install globally using npm install -g typescript)
Git

## Installation
Clone this repository to your local machine by running:

git clone https://github.com/trojhan47/Zacrac-User-Management.git

Change your current directory to the project folder:

Install the project dependencies by running: <br>
npm install

## Configuration
Create a .env file in the root directory of the project to store environment-specific configuration variables. You can use the provided .env.example file as a template. Update it with your own values.
cp .env.example <br>
Modify the values in .env to match your setup.

## Building
To transpile TypeScript code to JavaScript, run the following command: <br>
npm run build <br>
This will generate a dist folder containing the compiled JavaScript files.

## Database
This application uses a mongoDB database. The application is connected to the database at initialization using mongoose: <br>


## Running the Application
To start the Node.js server in development mode with automatic reloading, run:

npm run dev <br>
The API server will be available at `http://localhost:${PORT}/api`.


## Testing the API Endpoints
To test the API endpoints, you can use the rest.http file attached to this repository. This file contains all the endpoints and requests for testing. To use it, you will need to install the REST Client extension for your code editor.

Install the REST Client extension for your code editor. If you're using Visual Studio Code, you can find it [here](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

Open the rest.http file in your code editor.

You can now send requests to the API endpoints directly from the rest.http file.

Alternatively, you can use tools like Postman to test the APIs by importing the rest.http file.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Author
Oyetunji Atilade <oyetunji.solina@gmail.com>

