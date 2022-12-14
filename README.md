
  # Social Network API

  [![License: MIT license](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ![image of API call for pulling all Users from database](imgs/socialNetwork1.png)

  ## Table of Contents
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Questions](#questions)

  ## Description

  You can watch a demo of the API in action [HERE!](https://watch.screencastify.com/v/zLBUbC2fFM9xU7OgaBsr)

  <br>

  This is a NoSQL API built to simulate social-network functionality using Express.js, MongoDB, and Mongoose.js. It allows a programmer to add Users, user Thoughts, and thought Reactions to various data models. Users can have friends (other associated users) and Thoughts can have Reactions (comments to the thought).

  <br>

  ## Installation

  Follow the below steps to install the program:

    npm install

  <br>

  ## Usage
  To initialize the server, enter the following commant into the terminal:

    npm run start

  Because this is a back-end application, users will need to utilize an API platform such as Postman or Insomnia to manipulate data.

  By entering the proper endpoints (all of which are found in the routes/api folder), users can perform various CRUD commands for the User and Thought models. Additionally, Users can add *other* Users as friends, and Thoughts can add reactions. Both friends and reactions are stored as dedicated arrays that are populated when an individual User or Thought is queried.

  ![](imgs/socialNetwork2.png)

  All Thoughts associated with a specific User will be deleted if the User itself is deleted. Similarly, upon deletion, a User is removed from any friend list in which they are currently being referenced. 
  
  ## License
  
  [![License: MIT license](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  This project uses the following license: 
  
    MIT license

  Click the badge to access the full license details.
  

  ## Questions

  For more information, feel free to contact me:

  GitHub: [github.com/stevengoldbergm](https://github.com/stevengoldbergm)
  
