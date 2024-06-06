# technical-assignment
## Real-time chat

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

## Prerequisites
1. require node vsersion 18.17.0
2. nodemon

## Getting Started
To run this project locally, follow these steps:
1. Clone the repository.
2. Install the dependencies:
   - Navigate to the `chat-page` directory and run `npm install`.
   - Navigate to the `server` directory and run `npm install`.
   - Navigate to the `socket` directory and run `npm install`.

3. Run the server:
    - Navigate to the `server` directory and run `nodemon`, if not working (in window WSL) run `npm install -g nodemon` and run `nodemon` again.
4. Run the socket server:
    - Navigate to the `socket` directory and run `nodemon`.
5. Run the client:
    - Navigate to the `chat-page` directory and run `npm run dev`.
6. The application will be accessible at `http://localhost:5173`.
7. I have added test user for test but, you can register new user in regsiter menu.
    - user 1  username : `solo@gmail.com` password: `12345678`
    - user 2  username : `lufy@gmail.com` password: `12345678`
8. Try to login between user in different browser.
9. Send message and see result.
