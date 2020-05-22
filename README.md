## Prerequisites ##
First you need to have nodejs and npm installed on your pc.
You can see it [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### Cloning and Running the Application in local ####
- Clone the repo in your terminal by clicking the green clone or download button at the top right and copying the url
- Type ```git clone [repository url]```
- Type ```cd [local repository]``` to go to local repository.
- Check package.json file and ensure scripts are notated as below:
```
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  ```
- Delete the node_modules folder and any 'lock' files such as yarn.lock or package-lock.json if present.
- Type ```npm install``` for installing all dependency
- Type ```npm start``` to run the projects
- If you face roboto-font error Type ```npm install typeface-roboto --save```to install it
- Again Type```npm start```

The Application Runs on __localhost:3000__
