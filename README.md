<div align="center">

# Rob & Dad's Whisky Tracker

A project for me and my Dad to track what whisky we've tried and what we thought of them.
<strong>Storyboard: </strong>https://robbailey3.github.io/whisky-tracker/

</div>

<div style="background: #f9f9f9; padding: 1rem; border-radius: 4px; font-size: 0.9rem; font-style: italic;">

**Note**: This is currently still being built.

</div>

## Project Motivation

Me & my Dad can always say to each other that we should start tracking what whisky we have bought or received so that we can continue to try new whiskies.

Since I love to code and solve problems, I thought I'd just try and solve this problem with a new web app.

## About the Project

The project is, as always, another learning opportunity.

### Built With

- [Nx](https://github.com/nrwl/nx)
- [Angular](https://github.com/angular/angular)
- [NestJS](https://github.com/nestjs/nest)
- [MongoDB](https://github.com/mongodb/node-mongodb-native)

## Features

- UI Component Library using Storybook (see https://robbailey3.github.io/whisky-tracker/)
- API Documentation using Swagger
- Server-Side-Rendering using Angular Universal

## Testing

- Spectator and Jest are used to test the Angular components and the API functionality
- Cypress is used for end-to-end tests
- ESLint is used to lint all code
- Husky is used for commit hooks so that tests and linters are run for every commit and push

## GitHub Actions

There is a GitHub action which runs on every push to build the latest Storybook and deploy to GitHub pages.

## Accessibility

I believe that the web should be accessible for all, that's why I have tried to make components meet Web Content Accessibility Guidelines 2.1 criteria. This is validated using Axe devtools in addition to a11y testing tools for Jest and Cypress. If there are ways to make this more accessible, I would be happy to accommodate.

## To Do

Just some ideas of what I can include:

- Use Redis and Bull to do some asynchronous tasks (e.g. image resizing)
- Add in a chat app

## Contact

Rob Bailey - [@rob_bailey3](rob_bailey3) - rob.bailey3@gmail.com
