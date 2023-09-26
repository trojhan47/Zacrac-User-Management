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

ALTERNATIVELY
you can use tools like Postman to test the APIs by importing the rest.http file.
 OR FIND THE ENDPOINTS URL BELOW
## API ENDPOINTS

The following endpoints are available for the application and their input bodies/parameters
FOR LOCAL SETUP
### Get all user profiles
GET http://localhost:PORT/api/users
Connection: keep-alive
### Get a user by email or userID or username
GET http://localhost:PORT/api/users/test@gmail.com or userID or username
Connection: Keep-alive
### create new user
POST http://localhost:PORT/api/users
Connection: keep-aliveContent-Type: application/json
{"first_name":"Johny",
"last_name":"Doe do",
"username":"doeysetyhbjkh",
"address":"testing no 7 Nigeria",
"phone_number":"+2348187654323"}
### Update User profile by email, username or userID
POST http://localhost:PORT/api/users/jdyseytu@gmail.com or userID or username
Connection: keep-aliveContent-Type: application/json
{"first_name":"Johny",
"last_name":"Doe do",
"username":"doeysetyhbjkh",
"address":"testing no 7 Nigeria",
"phone_number":"+2348187654323"}
### Delete User profile by email, username or userID
DELETE http://localhost:PORT/api/users/jdyseytu@gmail.com or userID or username
Connection: keep-alive


FOR PRODUCTION SETUP 
### Get all user profiles
GET http://13.51.241.140/api/users
Connection: keep-alive
### Get a user by email or userID or username
GET http://13.51.241.140/api/users/test@gmail.com or userID or username
Connection: Keep-alive
### create new user
POST http://13.51.241.140/api/users
Connection: keep-alive
Content-Type: application/json
{"first_name":"Johny",
"last_name":"Doe",
"username":"doeysety",
"address":"testingno 7 Nigeria",
"phone_number":"+2348156565656",
"email":"jdyseytu@gmail.com"
}
### Update User profile by email, username or userID
POST http://13.51.241.140/api/users/jdyseytu@gmail.com or userID or username
Connection: keep-alive
Content-Type: application/json
{"first_name":"Johny",
"last_name":"Doedo",
"username":"doeysetyhbjkh",
"address":"testingno 7 Nigeria"
,"phone_number":"+2348187654323"
}
### Delete User profile by email, username or userID
DELETE  http://13.51.241.140/api/users/jdyseytu@gmail.com or userID or username
Connection: keep-alive

License
This project is licensed under the MIT License. See the LICENSE file for details.

Author
Oyetunji Atilade <oyetunji.solina@gmail.com>

