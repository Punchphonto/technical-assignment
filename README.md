# technical-assignment

## Technologies Used
- React and React Boostrap for the frontend
- Node/Express for creating API endpoints and authentication
- MongoDB for storing chat room members and their messages
- Socket.io for making the app real-time

## Basic Features
- Users can register/login via email and password.
- Users can create a room to chat with others.
- Users can see online status.
- send and receive messages in real-time.
- Messages are displayed in a chronological order
- Emoji picker is also integrated.


## Getting Started

To run this project locally, follow these steps:
1. Clone the repository.
2. require node vsersion 18.17.0
3. Install the dependencies:
   - Navigate to the `chat-page` directory and run `npm install`.
   - Navigate to the `server` directory and run `npm install`.
   - Navigate to the `socket` directory and run `npm install`.

4. Run the server:
    - Navigate to the `server` directory and run `nodemon` in not work run npm install -g nodemon and run `nodemon` again.
5. Run the socket server:
    - Navigate to the `socket` directory and run `nodemon`.
7. Run the client:
    - Navigate to the `chat-page` directory and run `npm run dev`.
8. The application will be accessible at `http://localhost:5173`.
