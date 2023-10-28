<div align="center" id="top">
  <img src="https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png" width="150" alt="code-racer-logo">
  <br/>
  <h1>Paw Share</h1>
  <p>"Empowering Care for Animals and Their Guardians in Challenging Times"</p>
 <span>School Project</span>
</div>
<br />

## Table of Contents

- [:bulb: About](#about)
- [:computer: Tech Stack](#tech-stack)
- [:rocket: Getting Started](#getting-started)
- [:memo: Contributors](#contributors)

<a id="about"></a>

## About :bulb:

Paw Share is a compassionate application committed to aiding animals and their caregivers during difficult times. Our app connects individuals facing the challenge of caring for their pets or encountering animals in distress with appropriate solutions to ensure the well-being of these cherished creatures.

We stand firmly against the promotion of animal breeding for profit and instead advocate for responsible adoption and support for animals in distress. At Paw Share, our mission is to foster a culture of empathy and assistance towards animals in need.

Moreover, Paw Share facilitates temporary pet care, enabling pet owners to entrust their beloved companions to the care of others during their absences or times of incapacity. Our primary focus is not financial gain, but rather, it is on cultivating and strengthening the bonds shared by passionate animal lovers like you.

<a id="tech-stack"></a>

## Tech Stack :computer:

- [React](https://reactjs.org/)
- [React Native](https://reactnative.dev/)
- [JavaScript](https://www.javascript.com/)
- [Expo](https://expo.io/)
- [NativeWind](https://www.nativewind.dev/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)
- [Redis](https://redis.io/)

<a id="getting-started"></a>

## Getting Started :rocket:

### Prerequisites

- [Node.js](https://nodejs.org/en/)* (at least 18.18.0)
- [NPM](https://www.npmjs.com/)*
- [Docker](https://www.docker.com/)

If you don't have or want to use Docker, you will need to have:

- A mysql and redis database running locally or remotely on port 3306 and 6379 respectively (be sure to update the credientials in the `.env` file)

### Installation

#### Automated (experimental)

1. Clone the repo

```sh
git clone repo.git
```

2. Run the setup script (use the correct script for your OS)

MacOS:

```sh
npm run macos:setup-project
```

Linux:

```sh
npm run linux:setup-project
```

Windows:

```sh
npm run windows:setup-project
```

3. Create a `.env` file in the following directories:

- `/packages/api`
- `/packages/app`
- `/packages/web`

And follow the `.env.example` file in each directory to fill in the required environment variables.

4. Run the project (use the correct script for your OS)

MacOS:

```sh
npm run macos:start-project
```

Linux:

```sh
npm run linux:start-project
```

Windows:

```sh
npm run windows:start-project
```

#### Manual

1. Clone the repo

```sh
git clone repo.git
```

2. Install NPM packages

```sh
  npm run install:api
  npm run install:app
  npm run install:web
```

3. Create a `.env` file in the following directories:

- `/packages/api`
- `/packages/app`
- `/packages/web`

And follow the `.env.example` file in each directory to fill in the required environment variables.

4. Start the database

```sh
npm run dev:db
```

5. Start the API

```sh
npm run dev:api
```

6. Start the app

```sh
npm run dev:app
```

7. Start the web client

```sh
npm run dev:web
```

<a id="contributors"></a>

## Contributors :memo:

- [Tiago Ribeiro](https://github.com/TiagoRibeiro25)
- [José Nogueira](https://github.com/JoseNogueira13)
- [Pedro Teixeira](https://github.com/pedromst2000)

<br />

<p align="center">
 <a href="#top">Back to top</a>
</p>
