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

# SETUP:

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

# Inside the store added index.js file

// Inside this file we are going to create a Redux store and export it.

// This a central EXPORT POINT for everything related to the Redux store.

// Inside the index.js in the store folder we are going to import the configureStore function from Redux Toolkit and the usersReducers from the usersSlice.js file.

# React-Redux installation

// Inside the terminal:
npm install react-redux

# inside the index.js file in the src folder

// We are going to import the Provider component from React-Redux and the store from the store folder.

// We are going to wrap the App component with the Provider component and pass the store as a prop.

// ----------------------------------------------

## Storing a data:

// Denormalized Form:

[
    {
        id: 1,
        name: 'John Doe',
        albums: [
            { id: 1, title: 'My Summer Vacation'},
            { id: 2, title: 'My Winter Vacation'}
        ]
    },
    {
        id: 2,
        name: 'Jane Doe',
        albums: [
            { id: 3, title: 'My Summer Vacation'},
            { id: 4, title: 'My Winter Vacation'}
        ]
    }
]

// Normalized Form:

List of Albums:

[
    { id: 1, title: 'My Summer Vacation', userId: 50},
    { id: 2, title: 'My Winter Vacation', userId: 50},
    { id: 3, title: 'My Summer Vacation', userId: 63},
    { id: 4, title: 'My Winter Vacation', userId: 63}
]

List of Users:

[
    { id: 50, name: 'John Doe'},
    { id: 63, name: 'Jane Doe'}
]

function getAlbumsForUser(user, albums) {
    return albums.filter(album => ablum.userId === user.id);
}

## If structure of data doesn't really match the UI, we should use Normalized Form!

It is easier to update the data in the Normalized Form and
more flexible to change the structure of the data.

In React-Redux we are going to use Normalized Form (often).

Our API server may not return the data in the Normalized Form, so we are going to have to transform it.

## Options for Data Fetching in Redux Toolkit:

- Async Thunk Functions
We will use this to handle users

- RTK Query
We will use this to handle albums and photos

Usually we are not going to use both of them in the same application. Here we will use the both to understand the differences.

## Where to put the data fetching logic?

The flow of component is:

- user does something
- we are going to dispatch an action
- the action is going to be handled by a reducer
- the reducer is going to update the state
- the component is going to re-render

## Don't make requests inside of the reducer!

Why?

- Reducers must be 100% synchronous
- reducers should only operate on their arguments - no outside variables!

## Adding state for data loading

We need to add in some STATE to our application to keep track of whether we should SHOW A LOADING indicator or not, LIST OF USERS or an ERROR message:

isLoading (boolean),
data (array of objects), 
error (null or error object)

## Start the request:

{
    isLoading: true,
    data: [],
    error: null
}

## Request successful:

{
    isLoading: false,
    data: [{ id: 1, name: 'John Doe'}],
    error: null
}

## Request failed:

{
    isLoading: false,
    data: [],
    error: { message: 'Error message'}
}

This means, that we need multiple separate actions to be dispatched.

# Async Thunk Function

When we start a request, the Async Thunk Function is going to dispatch an action with the type of 'users/fetchUsers/pending' during the data loading process. Then it is going to set off to all of the reducers that are interested in that action.

We are going to configure the usersSlice.js file to handle that action. When it sees that action, it is going to update the state to set isLoading to true.

// success

After we get the data back from the API server, the Async Thunk Function is going to dispatch a second action with the type of 'users/fetchUsers/fulfilled'. It is going to flow into all of our reducers. We are going to set up another custom reducer inside of the usersSlice.js file to handle that action. When it sees that action, it is going to update the state to set isLoading to false and set the data to the data that we got back from the API server.

// error

The first part is the same as the success part. The Async Thunk Function is going to dispatch an action with the type of 'users/fetchUsers/rejected'. It is going to flow into all of our reducers. We are going to set up another custom reducer inside of the usersSlice.js file to handle that action. When it sees that action, it is going to update the state to set isLoading to false and set the error to the error that we got back from the API server.

## Fetching data with Async Thunk Function

// inside the db.json file we created users list;

## Creating Async Thunk Function

// the GOAL of this THUNK is to FETCH some DATA and automatically have some ACTIONS DISPATCHED for us as we are FETCHING the DATA.

1. Create a NEW FILE for YOUR THUNK. Name it after the purpose of the request.
2. Create the THUNK. Give it a base type that describes the purpose of the request

// inside the store folder adde thunks folder and inside it added fetchUsers.js file

// inside the fetchUsers.js file we are going to import the createAsyncThunk function from Redux Toolkit and axios library.

// We are going to create a new THUNK using the createAsyncThunk function. We are going to give it a base type of 'users/fetch' (we can put any string that we want).

// When we initally make our request the action type is going to be 'users/fetch/pending'.

// The same THUNK is going to dispatch a second action with the type of 'users/fetch/fulfilled' when the request is successful.

// The same THUNK is going to dispatch a third action with the type of 'users/fetch/rejected' when the request is failed.

3. In the thunk, make the REQUEST, RETURN THE DATA that you want to use in your reducer

const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3005/users');

 return response.data;
});

// We are going to make a request to the API server using axios library. We are going to get the list of users from the API server.

// Inside response.data we have the list of users.

4. In the SLICE, add extraReducers, watching for the action types that the thunk will dispatch

// extraReducers allow us to watch for ADDITIONAL ACTION TYPES that we want to handle inside of our SLICE.

// We don't need to add the 'users/fetch/pending' action type because it is going to be handled automatically by the createAsyncThunk function:

extraReducers (builder) {
        builder.addCase('users/fetch/pending');
        builder.addCase();
        builder.addCase();
    }

// instead of 'users/fetch/pending' we can use fetchUsers.pending:

extraReducers (builder) {
        builder.addCase(fetchUsers.pending);
        builder.addCase();
        builder.addCase();
    }

// Huge part of Redux Toolkit is that we don't have to write the action types BY HAND. We can use VARIABLE with properties automatically generated by the createAsyncThunk function:

fetchUsers.pending === 'users/fetch/pending'
fetchUsers.fulfilled === 'users/fetch/fulfilled'
fetchUsers.rejected === 'users/fetch/rejected'

// Now we can make an UPDATE to the STATE object inside of the reducer and optionally return a NEW STATE object (we can use the IMMER library to make the update to the state object easier):

extraReducers (builder) {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        });
    }

// Whatever we return from fetchUsers, it is going to be available as action.payload inside of the reducer:

extraReducers (builder) {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
    };

5. Export the thunk from the store/index.js file
6. Inside UsersList.js: When a user does something, dispatch the thunk from the component to run the request 

// When users list is first displayed, we dispatch out thunk and run data loading process. This means we need useEffect hook.

// We need to put EMPTY ARRAY as a second argument to useEffect hook to run the data loading process ONLY ONCE.

// To make the warning from ESLint go away we can put dispatch inside the empty array.

// To check if the data is really fetched we can check in the console NETWORK tab, Fetch/XHR and reload the page. In the Preview tab we can see the list of users.

// Remember to run both servers: npm run start:server and npm start

# Displaying the list of users

// Inside usersList we are going to import the useSelector hook from React-Redux and the fetchUsers thunk from the store folder.

// We are going to use the useSelector hook to get the list of users from the Redux store.

// We are going to use destructuring to get the list of users from the state:

const {data, isLoading, error} = useSelector(state => state.users);

// Then using useEffect hook we are going to display the number of users using users.length inside curly braces (in case testing)

// Tp get an error message we can change the URL in the fetchUsers.js file to e.g.:
http://localhost:3005/userss

## Making a pause for testing

// We can make a pause for testing by adding a promise to the fetchUsers.js file


## Creating skeleton loader

// We are going to use the set of grey boxes to show the user that something is loading.

// To do this we can use for loop and create an array of 'times' elements.

   const boxes = [];
    for (let i = 0; i < times; i++) {
        boxes.push(
            <div key={i}>Box</div>
        )
    }
    return boxes;

// Better way is to use the Array().fill().map() method.

## Creating shimmer effect:

Goal:

// We are going to use the CSS property called background-image and linear-gradient() function.

// Basically there are two elements, that are overlapping each other. The first one is the grey box and the second one has a gradient background.

// Initially the second element is not visible, but when we add the animation, the second element is going to move to the right and the first element is going to be hidden.

Skeleton.js file:

// We are going to create a new component called Skeleton.js

// Adding variables outerClassNames and innerClassNames to the Skeleton component with many classes.

usersList.js file:

// We are going to import the Skeleton component to the usersList.js file.

// We are going to use the Skeleton component to display the list of users.

## Adding user button

// Whenever users click on the button, we are going to make a POST request to the API server to create a new user.

// In th BODY of the request we are going to have an object with a name property randomly generated.

// We will use Faker.js library to generate random data.

// After sending the request to the API server, we are going to get back the new user object with an id property created by the API server.

// We are going to ADD the new user object to the list of users in the Redux store.

To do this we will use a THUNK.

## Creating a new THUNK

// It is going to have a type of 'users/add'.

// Whenever we start the request, the THUNK is going to dispatch an action with the type of 'users/add/pending'.

## Managing loading state

// We want to show the loading indicator when we are making the request inside of the BUTTON.


# 'Fine-Grained' loading state

// Maintaining separate state variables for each request.

// Generally two options for implementation

// The RTK Query module that we will use in a little a bit handles this for us automatically.

# Option 1: move all LOADING and ERROR state TO COMPONENTS

ADVANTAGES:

- this may be a useful technique in some corner cases
- tedious to implement, so we need to create a custom hook to handle this
- usefull to better understand async thunks
- you might have to work on a project that uses this technique

## When calling the dispatch function, we receive a PROMISE back, but the rules are different than the normal promise rules.

// In dispatch function the promise's .then() method is going to be called when the request is successful OR when the request is failed!

// Argument to the .then() is fulfilled or rejected ACTION OBJECT.

# We can use .unwrap() method to get the rpomise back following the conventional promise rules.

... so the useEffect hook is going to look like this:

useEffect(() => {
        setIsLoadingUsers(true);
        dispatch(fetchUsers())
            // BAD! DO NOT DO THIS! DISPATCH IS NOT A DEPENDENCY! IS ASYNC!
            // setIsLoadingUsers(false);
            .unwrap()
            .then(() => {
                console.log('fetchUsers thunk completed!');
            })
            .catch(() => {
                console.log('fetchUsers thunk failed!');
            });
    }, [dispatch]);

// we can use .finally() method to set the isLoadingUsers to false

// NOW we can KEEP TRACK whether we are LOADING DATA AND whether or not there was an ERROR.
