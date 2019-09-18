# Navio Web
See [Web App](https://navio-web.herokuapp.com)

# Objectives
Be able to navigate through any dataset (`JSON Array`) with the help of the visual explorer [Navio](https://navio.dev).

## Deployment
* The mongo URI must be configured in the `settings.js` file through the property `mongo.uri`. Be sure that the instance is running properly.
* Configure the backend API host through the `API` constant in `/front/src/settings.js`. For development purposes, the host of the backend will be `API=http://localhost:3001`, for the deployment in Heroku, leave empty.
* To install the dependencies, run:
  ```
    npm install
    cd front
    npm install
  ```
* To start the `Node.js` backend run the command in the root folder:
  ```
    npm start
  ```
  It will deploy the instance in the `3001` port
* To start the `React` frontend run:
  ```
    cd front
    npm start
  ```
  It will deploy the instance in the `3000` port

## Author
[David Narvaez](http://dnarvaez27.github.io)  
For Web Development, Uniandes 2019
