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

- We are going to assume the user is ona bandwith constrained connection,
- the data-loading cxperience must be near-perfect,
- we are going to first look at data fetching with plain RTK, then use RTK Query

