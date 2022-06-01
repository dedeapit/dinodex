# DinodexAPI

This codebase contains DinodexAPI example, implemented with Node.js in TypeScript.

## 🚀 Getting Started for Development

1.  **Install dependencies.**

    With Yarn installed, run the following command:

    ```sh
    yarn install
    ```

2.  **Setup local database.**
    ```sh
    # install postgres
    brew install postgresql

    # run postgres
    brew services start postgresql

    # create dinodex database
    createdb dinodex

    # running migration
    yarn typeorm --config .dev.env migration:run
    ```

2.  **Start the server locally with hot reloading.**

    Run the following command:

    ```sh
    yarn start
    ```
