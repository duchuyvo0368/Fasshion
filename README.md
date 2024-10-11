# Shopping Website

## Description

This **Shopping Website** is a full-stack eCommerce platform that utilizes advanced technologies to provide a seamless shopping experience for users. The backend is developed using **Node.js** and **Express.js**, with **MySQL** as the relational database, implementing **Object-Relational Mapping (ORM)** and migrations for efficient database management. 

### Key Backend Features:
- **Node.js & Express**: The backend API is built with **Node.js** and **Express.js**, providing RESTful endpoints for managing products, categories, and user authentication.
- **MySQL ORM & Migrations**: **MySQL** is used for the database, with ORM and migration tools to handle data efficiently and ensure smooth schema updates.
- **Socket.io for Real-time Communication**: Real-time features such as notifications and live updates are implemented using **Socket.io** for seamless user interactions.
- **JWT Authentication**: User authentication and authorization are secured using **JSON Web Tokens (JWT)**, ensuring safe access control throughout the platform.
- **Recommendation System**: The platform features a recommendation engine that suggests products based on user input, utilizing deep learning models for better accuracy.
- **Toxic Comment Filtering**: A **Deep Learning LSTM** model, trained using **TensorFlow**, is integrated into the system to automatically detect and filter toxic comments. The model is served using **Flask**, which is integrated into the Node.js backend to handle the toxicity detection process.

### Frontend:
The frontend is developed using **React.js** to ensure a smooth and interactive user experience. It features a responsive design for browsing products, viewing recommendations, and interacting with other features like the chat and comments system.

### Key Frontend Features:
- **React.js**: The UI is built with **React.js**, providing a dynamic and modern shopping interface.
- **Axios for API Calls**: **Axios** is used for making API requests to the backend for product data, authentication, and real-time interactions.
- **Redux for State Management**: **Redux** is implemented to manage the application's state, making it easier to track user sessions, cart data, and more.
- **AI Chatbot using Dialog**: A built-in **AI Chatbot** is implemented using **React Dialog** components, helping users with product recommendations and customer support. The chatbot is powered by AI to simulate conversational shopping assistance.

### Technology Stack
- **Backend**: Node.js, Express.js, MySQL, Socket.io, JWT, Flask, TensorFlow, LSTM (Deep Learning).
- **Frontend**: React.js, Axios, Redux, Dialog (for AI chatbot).

## Screenshots

![Product Recommendations](https://github.com/duchuyvo0368/shopping_website/blob/master/demo/route_recommendation.png)
![Product Page](https://github.com/duchuyvo0368/shopping_website/blob/master/demo/route_product.png)
![Toxic Comment Detection](https://github.com/duchuyvo0368/shopping_website/blob/master/demo/recommendation.png)
![AI Chatbot](https://github.com/duchuyvo0368/shopping_website/blob/master/demo/chat.png)

## Conclusion

This shopping platform combines powerful real-time features, AI-based recommendations, and toxic comment filtering to create a safe and enjoyable online shopping experience. With the help of **Node.js**, **MySQL**, **TensorFlow**, and **React.js**, it ensures high performance, security, and scalability.
