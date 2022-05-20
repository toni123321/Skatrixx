# SM4-RB1-Skatrixx
This is the official repository for Skatrixx project. Skatrixx project is an IoT system
including PWA app, Hardware system and Server. The idea of the project is to be made a 
handy and small hardware system that can be attached to the skateboard of the user and this
small system to be connected to our server and to the app which the user has access to.

**You want to find a real demo. Find the PWA app here**
## Live Link
> https://i451508.hera.fhict.nl/

## Video of hardware system communicating with the PWA app through the backend server
- You can see it in our YouTube channel. [Link here](https://youtu.be/Ymbr5G8lzB0)


**You want to see some of our work. You can view our prototype in Figma, our documentation or our code in the repository. 
Please see below fo rmore information.**

## Figma prototype
> https://www.figma.com/file/xPccm5aQFLGmXnU8X67uyT/High-fidelity-Skaterixx

## Documentation
> https://git.fhict.nl/I451508/sm4-rb1-skatrixx/-/tree/main/Documents

## Links to all members's portfolios

| Name | Portfolio |
| ------ | ------ |
| Sesil | [Link](https://git.fhict.nl/I461891/sesil-portfolio/-/wikis/home) |
| Yoana | [Link](https://git.fhict.nl/I455146/portfolio-yoana-churkina/-/wikis/home) |
| Angel | [Link](https://git.fhict.nl/I451459/individual_repo_smartmobile_semester4/-/wikis/home) |
| Joan | [Link](https://git.fhict.nl/I451508/sm4-rb1-joan_krastanov/-/wikis/home) |
| Antonio | [Link](https://git.fhict.nl/I454917/smartmobile-portfolio/-/wikis/home) |
| Arkan | [Link](https://git.fhict.nl/I451854/shaban_a) |


## Localhost installation to continue developing (**This part of the Readme is provided for developers in the team.**)

1. Clone the repository
> git clone https://git.fhict.nl/I451508/sm4-rb1-skatrixx.git

2. Switch to the specified branch (if you don't know on which branch to start, please ask the team leader)
3. Install node modules since you probably have a local version of node modules which differs from the one from used in the project
- Install node modules on the backend
> cd express-server (Please, run this command from the parent folder - sm4-rb1-skatrixx/)

> npm install
- Install node modules on the frontend
> cd frontend-files (Please, run this command from the parent folder - sm4-rb1-skatrixx/)

> npm install


4. Running the app and/or the server

**Want to run the server and the app at the same time, then use this command**
- To run whole application
> cd express-server (Please, run this command from the parent folder - sm4-rb1-skatrixx/)

> npm run dev 

**Don't want to run the two apps at once, then here are the two commands for you**

- Run Express server only
> cd express-server (Please, run this command from the parent folder - sm4-rb1-skatrixx/)

> nodemon index.js

- Run React app only
> cd frontend-files (Please, run this command from the parent folder - sm4-rb1-skatrixx/)

> npm start


**This part is still in development, please do not use it unless you have a specific task related to it**

We use docker to containerize our applications for better development and testing.
1. To build Docker image
> docker build -t (folder-name) .

2. To create Docker container for front-end
> docker run -it -p 3001:3001 --rm --name (Name of container)  (folder-name)

3. To create Docker container for back-end
> docker run -it -p 3000:3000 --rm --name (Name of container)  (folder-name)

