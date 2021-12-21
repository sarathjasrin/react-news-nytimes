## Prerequisite:
* Install Node
* open cmd type ```npm i create-react-app -g```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Components

* App Component ( `class` Component)

App component is the main component for Routing. All the logics for other components like events, fetch articles, Sorting, searching all wrritten here

`componentDidMount` -> This will once all elements are mounted to dom. Here we making api call to fetch  articles (`loadHomepagePost`)

`loadMore` -> load more button event to append new articles. This will hide once it's reaches total pages.

`searchHandler` -> this event fired from `Header Component`. In header component the search box located.


`sortBy` -> this event fired from `search route`.

`renderPosts` -> This will loop through all articles in the state call `post component`

In App component we have 5 Routes

* Home Route (`/`)
* Empty Search to error message (`/search`)
* Search page with keyword (`/search/:keyword`)
* View page for featured article (`/view/featured/:url`)
* View page for article (`/view/:url`)

## View Component

This component render the single article dyanmically. Here we have two types of
payload one for home page articles and search articles

## Header Component

This component contains search textbox.


# API Calls

* `topstories/v2/home.json` --> Get posts from current homepage of NYTimes
*  `search/v2/articlesearch.json` --> Search posts using query.

Here we can pass following below fields to search the articles

* Headline - `fq=headline:('search_value')`
* Sort     - `sort=oldest`
* page     - `page=1`