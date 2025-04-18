AIM
The aim of this project is to create a Recipe Finder web application using HTML, CSS, and JavaScript. The user will be able to search for recipes based on an ingredient entered into a search field. The app will also feature dark mode, allowing the user to switch between light and dark themes.

OBJECTIVE
Build a responsive user interface for a recipe search application.

Integrate an external API (TheMealDB) to fetch and display recipes based on the user’s input.

Implement a dark mode feature that allows users to toggle between light and dark themes.

Prerequisites
Before starting this project, you should have knowledge of the following technologies:

HTML: Used for structuring the content of the page.

CSS: Used for styling and implementing dark mode.

JavaScript: Used for adding interactivity, fetching data from an API, and dynamically updating the page.

API Usage: Understanding how to make API calls using fetch() and handle the data returned.

No specific libraries or frameworks are required, but basic knowledge of DOM manipulation and asynchronous functions is helpful.

THEORY
The project involves using TheMealDB API to retrieve recipes based on the user's search input. Below are the special commands required in the code:

fetch():

Definition: fetch() is an asynchronous function used to make requests to a server and retrieve resources (such as data from an API).

Purpose: We use fetch() to send a request to TheMealDB API and get data about recipes based on the search term provided by the user.

document.getElementById():

Definition: This method is used to get an HTML element by its id.

Purpose: We use it to access elements in the DOM, such as the search input box, search button, results container, and the dark mode toggle button.

async/await:

Definition: async/await is used for handling asynchronous code in JavaScript. async makes a function return a promise, and await is used to pause the execution until the promise resolves.

Purpose: We use async/await to handle the asynchronous fetch operation in the searchRecipe() function.

classList.toggle():

Definition: This method toggles a class on an HTML element. If the class exists, it removes it; if it doesn't, it adds it.

Purpose: We use this to toggle the dark class on the body element to switch between light and dark modes.

innerHTML:

Definition: innerHTML is a property of DOM elements that represents the HTML content inside the element.

Purpose: We use it to dynamically insert the recipe results or messages into the page based on the response from the API.

OUTPUT
Initial View:

The user sees a search box, a "Search" button, and a "Dark Mode" toggle button at the top.

Below the buttons, there’s a section for featured recipes.

Search Results:

When the user enters an ingredient and clicks "Search", a list of recipes related to that ingredient will appear with images, names, and links to full recipes.

Dark Mode:

Clicking the "Dark Mode" button switches the theme between light and dark mode.

CONCLUSION
This project demonstrates how to build a dynamic web application using HTML, CSS, and JavaScript, where users can search for recipes and toggle between light and dark themes. It highlights the usage of APIs, asynchronous JavaScript (async/await), DOM manipulation, and event handling in a real-world context. This project can be further expanded by adding more features such as saving favorite recipes, searching by category, or refining the search experience with more filters.











