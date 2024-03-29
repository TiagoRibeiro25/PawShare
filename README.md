<div align="center" id="top">
  <img src="./images/Logo.png" width="600" alt="paw-share-logo">
  <br/>
  <h1>Paw Share</h1>
  <p>"Empowering Care for Animals and Their Guardians in Challenging Times"</p>
  <span>School Project</span>
</div>
<br />

## Table of Contents

- [:bulb: About](#about)
- [:computer: Tech Stack](#tech-stack)
- [:pencil: Actors & User Stories](#actors-user-stories)
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
- [TypeScript](https://www.typescriptlang.org/)
- [NativeWind](https://www.nativewind.dev/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)
- [Cloudinary](https://cloudinary.com/)

<a id="getting-started"></a>

## Actors & User Stories :pencil:

[ACTORS_USERS_STORIES.md](https://github.com/TiagoRibeiro25/PawShare/blob/main/docs/ACTORS_USER_STORIES.md)

<a id="actors-user-stories"></a>

## Getting Started :rocket:

### Prerequisites

- [Node.js](https://nodejs.org/en/)* (at least 18.18.0)
- [NPM](https://www.npmjs.com/)*
- [Docker](https://www.docker.com/)

If you don't have or want to use Docker, you will need to have:

- A mysql database running locally or remotely on port 3306 (be sure to update the credientials in the `.env` file)

### Installation

#### Automated (experimental)

1. Clone the repo

2. Run the setup script (use the correct script for your OS)

##### Linux or MacOS

```sh
chmod +x ./scripts/setup-project.sh && ./scripts/setup-project.sh
```

##### Windows

```sh
./scripts/setup-project.bat
```

3. Create a `.env` file in the following directories:

- `/packages/api`
- `/packages/app`
- `/packages/web`

And follow the `.env.example` file in each directory to fill in the required environment variables.

4. Run the project (use the correct script for your OS)

##### Linux

```sh
chmod +x ./scripts/start-project.sh && ./scripts/start-project.sh
```

If you get an error saying that a command was not found, edit the `start-project.sh` file and add your current terminal to the list of terminals (line 3).

###### Example

```sh
local terminals=("x-terminal-emulator" "gnome-terminal" "konsole" "YourTerminal")
```

To find out the name of your terminal, run the following command:

```sh
ps -p $(ps -p $$ -o ppid=) -o comm=
```

##### MacOS

```sh
chmod +x ./scripts/macos-start-project.sh && ./scripts/macos-start-project.sh
```

##### Windows

```sh
./scripts/start-project.bat
```

#### Manual

1. Clone the repo

2. Install NPM packages

```sh
  cd packages/api
  npm install
 
  cd ../app
  npm install

  cd ../web
  npm install
```

3. Create a `.env` file in the following directories:

- `/packages/api`
- `/packages/app`
- `/packages/web`

And follow the `.env.example` file in each directory to fill in the required environment variables.

4. Start the database

```sh
cd packages/api
npm run db
```

5. Start the API

```sh
cd packages/api
npm run dev
```

6. Start the app

```sh
cd packages/app
npm start
```

7. Start the web client

```sh
cd packages/web
npm run dev
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
