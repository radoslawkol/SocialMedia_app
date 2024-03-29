# BeConnected
This is a social media app, design was inspired by facebook.
[Check a demo](https://beconnected-app.netlify.app/)

## Screenshots

<img src='https://res.cloudinary.com/detfhw9ll/image/upload/v1685210877/github%20docs/beconnected/beconnected-photo_si6dej.png' width=360 height=182/><img src='https://res.cloudinary.com/detfhw9ll/image/upload/v1685210879/github%20docs/beconnected/beconnected-home_gn2x6w.png' width=360 height=182/><img src='https://res.cloudinary.com/detfhw9ll/image/upload/v1685210879/github%20docs/beconnected/beconnected-details_cg4pwa.png' width=360 height=182/><img src='https://res.cloudinary.com/detfhw9ll/image/upload/v1685210879/github%20docs/beconnected/beconnected-create_v1g8zl.png' width=360 height=182/><img src='https://res.cloudinary.com/detfhw9ll/image/upload/v1685210877/github%20docs/beconnected/beconnected-post_cydbno.png' width=360 height=182/><img src='https://res.cloudinary.com/detfhw9ll/image/upload/v1685210878/github%20docs/beconnected/beconnected-friends_wyd98q.png' width=360 height=182/>


## What problem does it solve?

The main idea of the app was to assure the place for users, where they can communicate with friends and others.

**Main Features**

- Create an account
- Creating posts
- Real time chatting with other users
- Adding friends
- Update profile(picture, cover, bio, details)
- Writting comments
- Reacting to posts
- Getting notifications
- Setting color theme(light/dark)
- Getting upcomming friends birthdays
- Saving posts

## What I learnt by this project

During the development of this project, I gained valuable experience in creating full-stack applications. It enabled me to enhance my skills on a larger-scale project. I got familiar into essential React concepts such as useState, refs, useEffect, and Portals, which strengthened my understanding in building dynamic user interfaces. Additionally, I had the chance to explore the powerful features of Redux Toolkit, which significantly improved my comprehension of state management in complex applications.

In terms of routing, I utilized the latest version of React Router (v6). This enabled me to create navigation and enhance the overall user experience.

I made significant progress in working with MongoDB and Express, particularly in implementing authentication functionalities and developing a comprehensive API. The process of structuring and organizing data in the database to efficiently serve the needs of the application challenged me to think critically and find optimal solutions on the backend. As a result, I have gained a deeper understanding of backend development and acquired valuable problem-solving skills.

Throughout the development process, I made use of various packages and libraries to enhance the functionality and performance of the application. These packages were carefully selected and integrated to ensure a smooth user experience.



## Technology used

- Node.js
- Express
- MongoDB
- React
- Sass
- SOCKET.IO
- OAuth2
- Cloudinary

**Packages**

- FontAwesome
- Redux Toolkit
- Axios
- Formik
- Yup
- dotenv
- js-cookie
- bcrypt
- nodemailer
- nodemon
- jsonwebtoken
- cloudinary
- express-fileupload
- googleapis
- emoji-picker-react
- react-spinners
- react-slick
- react-easy-crop
- react-responsive
- file-saver
- react-moment
- eslint


## API Endpoints

### Auth
- Login - `POST /api/v1/users/login`
- Register - `POST /api/v1/usets/register`

### Posts
- Create a post - `POST /api/v1/posts`
- Get all posts - `GET /api/v1/posts`
- Save a post - `PATCH /api/v1/posts/save`
- Delete a post - `DELETE /api/v1/posts/:id`
- Create a comment - `PATCH /api/v1/posts/comment`

### Reactions 
- React on a post - `PATCH /api/v1/reacts`
- Get post reactions - `GET /api/v1/reacts/:postId`

### Users
- Get a user - `GET /api/v1/users/:id`
- Activate an account - `POST /api/v1/users/activate`
- Send verification link to user via email - `POST /api/v1/users/sendVerification`
- Send reset password code to email - `POST /api/v1/users/sendResetPasswordCode`
- Validate reser password code - `POST api/v1/users/validateResetCode`
- Change password - `POST api/v1/users/changePassword`
- Find a user by email - `GET /api/v1/users/findUser`
- Get profile by username - `GET /api/v1/users/:username`
- Update profile picture - `PATCH api/v1/users/updateProfilePicture`
- Update profile details - `PATCH api/v1/users/updateDetails`
- Update profile cover - `PATCH api/v1/users/updateCover`
- Add a friend - `PATCH api/v1/users/addFriend/:id`
- Cancel friend request - `PATCH api/v1/users/cancelRequest/:id`
- Accept friend request - `PATCH api/v1/users/acceptRequest/:id`
- Delete friend request - `PATCH api/v1/users/deleteRequest/:id`
- Follow a profile - `PATCH api/v1/users/follow/:id`
- Unfollow a profile - `PATCH api/v1/users/unfollow/:id`
- Delete from friends - `PATCH api/v1/users/unfriend/:id`
- Get info about friends - `GET /api/v1/users/getFriendsInfos`
- Search users - `POST api/v1/users/search/:searchTerm`
- Add user to searchHistory - `PATCH api/v1/users/addToSearchHistory`
- Get search history - `GET api/v1/users/getSearchHistory`
- Delete from search history - `PATCH api/v1/users/deleteFromHistory`
- Get saved posts - `GET api/v1/users/getSavedPosts/:id`
- Unsave a post - `PATCH api/v1/users/unsavePost/:id`


### Conversations
- Create a conversation - `POST /api/v1/conversations`
- Get user's conversations - `GET /api/v1/conversations/:userId`

### Messages
- Create a message - `POST /api/v1/messages`
- Get messages from conversation - `GET /api/v1/messages/:conversationId`

### Notifications
- Create a notification - `POST /api/v1/notifications`
- Get notifications - `GET /api/v1/notifications`
- Set notification as read `POST /api/v1/notifications/:id`


### Images
- Upload images - `POST /api/v1/images`
- Get images from Cloudinary `POST /api/v1/images/listImages` 
