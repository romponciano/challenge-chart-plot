## Solution Explanations

I chose the component folder structure. So, the test files and style sheets (css) are included next to your .js files that represent the components. The solution has 3 components:

- graph: component responsible for rendering the graph on the screen and all the processing of arrays necessary to assemble the graph from a JSON array. This component also has the file that renders the bottom bar fixed because it is the location of the button to generate the graph.
In addition, as the business rules are intrinsically linked to plotting the points on the graph, most of these rules are implemented and are treated in this module, file GraphView.js

The choice of the Google Charts component (https://developers.google.com/chart) for rendering the line graph was made based on the reduction of rework to reimplement this type of graph. The specific choice of Google Charts was made due to having a well structured and used component (https://github.com/RakanNimer/react-google-charts).

- inputdata: this component is responsible for allowing the user to enter the JSON code, manually. For that, I adopted the Code Mirror (https://github.com/codemirror/CodeMirror). It is a Javascript library built to render and handle the events of a text editor in a browser. In this project I chose to use an updated component of this library built for React (https://github.com/scniro/react-codemirror2).

To transform the JSON code with the highlight colors corresponding to the challenge, I made a copy of one of the themes and overwrote the necessary classes with the "correct" colors, in the file intelieJSON.css

In order to facilitate the communication between siblin components (inputdata x graph), I chose to set the code editor value to a context variable, using React's Context API (https://reactjs.org/docs/context. html # api). In this way, the code editor's text is globally accessible to any other component that accesses the context. In contrast, this solution means that this context state value will be updated with each call to the code editor's onChange method.
In manual tests with texts that had +2 million lines, this did not demonstrate a great performance overhead, since: the bigger the text, the greater the probability of the user to copy and paste this text (generating a single onChange) than the user type character by character.

A limitation of the solution that was not as specified in the problem was the draggable component. The solution component is draggable. However, the user needs to take the mouse to the bottom corner of the component, like the draggable of a TextArea.

- topbar: this is a simple component responsible only for rendering the top bar.

In addition to the components, it is important to discuss the context.js file, which represents the global context of the solution. As discussed earlier, this solution was adopted to allow access to the text of the code editor for any components that access the context. So, its main functions are summarized in: (1) setting the code editor value in its state and (2) ensuring that this inserted text is valid in JSON format, so that it is able to return an array of JSONs for plotting the graphic.

To ensure the correct structure of a JSON, the text is treated and checked if valid, to return the JSON array. The treatment of the file consists of (1) taking all fields in the JSON body that do not have double quotes, and set these quotes; (2) eliminate any spaces and blank lines; (3) check if the string of a given line can be converted to JSON, that is, if it is valid.

## How to run

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test-coverage`

Launches the test coverage.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
