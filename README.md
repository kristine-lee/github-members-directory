# Github Members Directory

Built as part of Pavilion's frontend challenge. View the deployed version at: https://kristine-lee.github.io/github-members-directory

![Demo](https://github.com/kristine-lee/github-members-directory/blob/4266a54f07c38d9e2c70b4ec5a33004a982948b6/.github/github%20members%20directory%20demo.gif)


## Features

- Each page displays 10 cards with information about each member, including: username (that links to their Github profile), avatar, name, location, email address, and the number of public repositories they have
- Clicking the "Next" button fetches the next set of 10 members
- Fully responsive, minimalist styling with styled-components
- Error handling


## Approach

The first factor I took into consideration was how absolutely large this data was going to be. Github has millions of users, so it seemed like the approach should be to continuously make requests to the server, rather than fetching all of the data at once. Luckily, Github API provides the ability to make paginated requests with the `since` query parameter, which maps to the `id` of a user. Github will return data ([Docs](https://docs.github.com/en/rest/guides/using-pagination-in-the-rest-api?apiVersion=2022-11-28#using-link-headers)) This parameter can be parsed from the response's `header`.

Link header returned from `/users*` endpoints includes the `rel=next` and `rel=first` relations. The `since` parameter included in the `rel=next` string can be used in the subsequent API call to receive the next page of users. The link header is serialized, then parsed using JavaScript methods.

The data returned from the `/users` [endpoint](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#list-users) doesn't include everything we need for this challenge, so a second request must be made to each user's `/users/{username}` [endpoint](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user).

Clicking the "Next" button on the page triggers a re-render and an API call with the new `since` parameter.

Minimalist styling was achieved using Styled Components. The app is responsive across all devices.

Unit tests were written using Jest and React Testing Library. End-to-end tests were written with Cypress to simulate user journeys and ensure consistent data flows.

### Future improvements

- "Previous" button
- Filtering
- Prefetching data
- Continuous integration and deployment

### Tech Stack

Bootstrapped with: [Create React App](https://create-react-app.dev)
Styled with: [Styled Components](https://styled-components.com/)
Tested with: Jest, React Testing Library, Cypress
Formatted with: Eslint, Prettier, Husky

## Installation

### Github access token

Create a personal access token by following the instructions [here.](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

Create an `.env` file at the root, and store the key an environmental variable
```bash
REACT_APP_KEY= # your key
```

### Local Installation
To run this project locally, follow these instructions:

```bash
# clone this repository to your local machine
git clone https://github.com/kristine-lee/github-members-directory.git

# go into the repository
cd github-members-directory

# install dependencies
yarn install

# start the app
yarn start
```
View the app at: [http://www.localhost:3000](http://www.localhost:3000)

To run all unit tests, run `yarn test`. You can also specify a single file, for example: `yarn test App.test.js` 

To run Cypress (end-to-end) tests, make sure that the app is running locally. Then run `yarn run cypress open`. Cypress should automatically launch a headless browser. Choose the browser and test in browser. 

