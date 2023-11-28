This is an app using data fetching inside of a Redux.

When the user first loads the page, we are going to make a network request to an outside API fetching a list of users to show them on the screen.

On the top right corner we have a button that allows us to add a new user.

Whenever we click on the button, we are going to make a network request to an outside API to create a new user with randomly generated name.

Next to each user we have a button to delete that user.

On the left side of each user we have an arrow to expand the user and show the list of albums that the user has.

Albums are a collections of photos.

We can delete the user by clicking on the delete button.

We can add a new album by clicking on the add album button.

When we click on the arrow, we are going to make a network request to an outside API to fetch the list of albums for that user (randomly generated).

When we click to an album, we are going to make a network request to an outside API to fetch the list of photos for that album (randomly generated).

All of the data is fetched from the outside API and stored on an outside server.

# Important Notes:

- We are going to assume the user is on a bandwith constrained connection,
- the data-loading experience must be near-perfect,
- we are going to first look at data fetching with plain RTK, then use RTK Query

# Creating db.json file

- Inside of the root of the project, create a file called db.json
- Inside of the file, create an object with a property called users, albums and photos and set them to an empty array

# Installing json-server to start an API server

- Inside package.json, add a new script called "start:server" and set it to json-server --watch db.json --port 3005

# Running the API server

- Inside the terminal (split the terminal):
 npm run start:server

 - WE can see resources available at 
 http://localhost:3005/users, 
 http://localhost:3005/albums, 
 http://localhost:3005/photos

 - Now we can fetch, create, retrieve, update and delete data from the API server

 # Inside compontents folder added:

 - Button.js
 - Panel.js
 - UsersList.js

 # Inside src directory added:

 - store folder
    - slices folder
        - usersSlice.js

// userSlices is a slice of state that is going to be responsible for FETCHING the list of users from the API server and STORING it inside of the Redux store.

// We are going to use the createSlice function from Redux Toolkit to create a slice of state.

# Insice the store added index.js file

// Inside this file we are going to create a Redux store and export it.

// This a central EXPORT POINT for everything related to the Redux store.

// Inside the index.js in the store folder we are going to import the configureStore function from Redux Toolkit and the usersReducers from the usersSlice.js file.

# React-Redux installation

// Inside the terminal:
npm install react-redux

# inside the index.js file in the src folder

// We are going to import the Provider component from React-Redux and the store from the store folder.
