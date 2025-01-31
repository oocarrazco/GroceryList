# GroceryList

This project was created using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.1.

## To start the Angula UI of this project

Install and start a local development server, run the commands below in your console:

```bash
npm install
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```


Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.


## To run the API

Open the REST-API Solution in Visual Studio.

### Update the ConnectionStrings to connect to a DB

Open the file appsettings.json and update the ConnectionStrings to match your DB connection.

To update:

```bash
"Server=YourDBServer;Database=YourDBName;User ID=YourUserName;Password=YourPassword;MultipleActiveResultSets=true;TrustServerCertificate=True;"
```

Press CTRL+F5


## Docker integration


The Docker integration is upcoming.