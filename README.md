# Ylitse Web README

[Ylitse Project][], started by SOS Children's Villages Finland, aims at
reducing the need for intergenerational child protecting services by
supporting young parents with a foster care background.

Ylitse Web is a single-page application using [Ylitse API](https://gitlab.com/ylitse/ylitse-api/). It provides
a web UI for all types of users of Ylitse service.

[ylitse project]: https://www.sos-lapsikyla.fi/ylitse-mentorapp/
[ylitse api]: https://gitlab.com/ylitse/ylitse-api/
[ylitse mobile app]: https://github.com/sos-lapsikyla/ylitse-app

## Dependencies

The project depends on the following libraries:

- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Styled-components](https://styled-components.com/)
- [Redux](https://redux.js.org/)
- [React-router](https://reactrouter.com/)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)
- [Google fonts](https://fonts.google.com/)

## Project structure

### Top level

    .
    ├── dist # Compiled files
    ├── cypress # Cypress and e2e-tests
    ├── src # Source files
    ├── tools # Tools and utilities
    ├── LICENSE
    ├── _.config.js, ._, \*.json # Config files
    └── README.md

### React source files

    src
    ├── features # Feature based components etc.
    │ Feature # The feature folder
    │ ├── api # Feature's API related stuff
    │ ├── SubComponent # Subfolder to structure subcomponents or similar
    │ ├── Feature.tsx # React code for the feature
    │ ├── \*.test.ts(x) # Unittest for the corresponding code
    │ └── index.tsx # The default export
    ├── hooks # Custom react hooks
    ├── login # Static login page
    ├── register # Static registration page
    ├── static # Static assets (fonts, images, locales, styles)
    ├── App.tsx # Main App component
    ├── index.html # The main index.html
    ├── index.tsx # The main React mounting point
    └── store.ts # Redux store

## Usage

### Prerequirities

For local development it's recommended to have ylitse-api up and running. For this project you need Node.js and npm installed.

Project uses [git-hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) for pre-commit linting checks. Please initialize git-hooks locally as following:

`git config core.hooksPath .githooks`

### How to run the project?

1. Install node packages `npm i`
1. Run tests `npm run test`
1. Start the development server `npm run start` or use the dev API `DEV_API="https://dev.ylitse.fi/api" npm run start`

## End-to-end tests

Tests need `YLITSE_API_PASS` and `YLITSE_MFA_SECRET` environment-variables for admin-user that can setup the database for tests

Run locally:

1. Start Ylitse-API

```shell
docker compose --project-name e2e up
```

2. Start dev server

```shell
DEV_API="http://localhost:8080" npm start
```

3. Export env variables (found in `ylitse-api/ylitse_conf/ylitse.conf`)

```shell
export YLITSE_API_PASS={{admin_password}}
export YLITSE_MFA_SECRET={{admin_2fa}}
```

4. Run cypress

```shell
npm run test:e2e
```

or interactively

```shell
npx cypress open
```

Example of cypress command for better debugging of a specific test:

```shell
npx cypress run --spec 'cypress/tests/logout.cy.ts' --headed --browser firefox --no-exit
```

To target test run to a specific step you can use `it.only()`.

## How to create lisences list

Run `npm run licenses` to generate new licenses list.

## Development

1. Create a branch with your name and a name which describes the change for example john/add-login-page
1. Make your changes (code changes, tests and documentation)
1. Create a pull request and find a reviewer

## Releasing

TODO

## License

Ylitse Web is offered under the MIT license.
