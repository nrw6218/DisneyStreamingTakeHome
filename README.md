# Disney Streaming Take Home

This is a simple JavaScript application meant to mimic the landing page of a streaming service with selectable content tiles the user can scroll through.

## Getting Started
After cloning the repository, you must first run `npm install` from the main directory. Use the `npm run start` command to launch the application at `localhost:8080` in your browser. Any changes you make should automatically refresh the browser.

## Available Commands
### `"npm run build": "webpack"`,

Creates a production-ready build of the application.

### `"npm run start": "webpack --watch"`,

Creates a localhost server with live reloading of the app intended for development.

## Controls
- `ARROW UP/DOWN/LEFT/RIGHT` : Navigate Menu
- `ENTER` : Select
- `BACKSPACE/DELETE/ESC` : Go Back

## Built With
- JavaScript
- Node
- NPM
- Webpack
- HTML
- CSS

## Potential Future Enhancements
### General Code Improvements
An immediate change that could be made to separate concerns would be to break out the home screen javascript into its own file and only make `index.js` responsible for importing css, calling the `init` function from a `home.js` file, and doing any other general setup tasks that would be needed in the future.

The `pageContent` array of `Shelf` objects could be updated to be a map with the associated ids from the api response as the keys. Similarly, the values could be maps of `Cards` with the ids as their respective keys. This would remove the need to keep track of indices and instead keep track of a content or set id.

Keeping track of ids and/or types of sets could also allow future enhancements such as specialized shelves of content based on the type (think the Collections set with special styles to emphasize collections more than a series or movie).

### Tech Stack
To improve on the tech stack of this application I would bring in TypeScript to improve code management through strict typing. I would also consider bringing in a framework such as React to allow for more in-depth component-based architecture utilizing JSX. I would also introduce testing libraries (e.g. Cypress, Jest) and a minifier to shrink the client download size.

## Author
**Nik Whiteside**

- [Profile](https://github.com/nrw6218)
- [Email](mailto:nikolaswhiteside@gmail.com)
- [Website](https://nikwhiteside.com)