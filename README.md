# myevals-plasmic-utils

Utilities shared across MyEvaluations front-end projects built on Plasmic.

Demo: https://studio.plasmic.app/projects/p5fDqKf3tE9hZs34jWhG2h .

## Installation

```bash
yarn
```

## Running the server

```bash
yarn start
```

## Deployment

Automated via Github Actions. Whenever a commit appears on the `main` branch:

- new version of the Plasmic host is deployed (to https://myevaluations.github.io/myevals-plasmic-utils/plasmic-host ),
- new version of the `@myevals/myevals-plasmic-utils` node.js package is published.
