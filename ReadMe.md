<h1 style="font-size: 80px">Dungeon Map!</h1>
<span>
  <img alt="GitHub" src="https://img.shields.io/github/license/tdraper-dev/thedungeonmap?label=license"> 
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/tdraper-dev/thedungeonmap"> 
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/tdraper-dev/thedungeonmap"> 
</span>
  <br/>
  <br/>
  <h2 style="font-size: 40px">Description</h2>
  <div>
    The <strong><a href="https://thedungeonmap.herokuapp.com" ref="noreferrer" target="_blank" title="Link to The Dungeon Map, by Travis Draper">Dungeon Map!</a></strong> is an easy to use, drop-in/drop-out gameboard simulator that makes hosting virtual Dungeons and Dragons sessions simpler for the Dungeon Master and players. Unlike pre-existing web applications, such as the popular <strong><a href="https://roll20.net/" ref="noreferrer" target="_blank" title="Link to Roll20 homepage">Roll20</a></strong>, <strong><a href="https://thedungeonmap.herokuapp.com" ref="noreferrer" target="_blank" title="Link to The Dungeon Map, by Travis Draper">Dungeon Map!</a></strong> features a pared-down interface and easy-to-use session hosting functionality, to streamline interactions and eliminate any obstructions between the players and the game.
    <br/>
    <br/>
    This project was built using React, Node.JS, Express, MongoDB, and Socket.IO. To date, React is the frontend framework on which I feel most confident, and the same goes for Node.JS for the backend. I chose MongoDB, however, as I felt a document database, rather than a relational database, would give this project more room for future content expansion and mesh well with the component-style functionality of the gameboard. By "component-style," I mean the variety of options a Dungeon Master has for editing/adding to their gameboard, currently with the creation or deletion of player piece objects and alteration of the map image. I envision future updates will include the expansion of these choices.  See <a href="#nextSteps">"Next Steps"</a> for more details regarding proposed future expansions. 
    <br/>
    <br/>
    While I wanted to build functionality from scratch wherever possible, I opted to use <a href="https://socket.io/" target="_blank" title="Link to Socket.IO homepage and documentation" rel="noreferrer">Socket.IO</a> rather than configuring my own websockets for live data emissions. I made this decision because Socket.IO not only has wonderful documentation but also a powerful library with built-in fallbacks for failed server handshakes. In an application all about simulated live play, I knew smooth gameplay was essential. Server communications were then handled between Express and Socket.IO, isolating player movements and chatroom communications to Socket.IO.
    <br/>
    <br/>
    Dungeon Masters log in via token authorization (using <a href="https://www.npmjs.com/package/jsonwebtoken" target="_blank" rel="noreferrer" title="Link to NPM page for json web token">jsonwebtoken</a> in the backend) and credentials are stored in local storage. I chose local storage for those credentials, so that the administrative functions of the app could feel invisible to Dungeon Masters, and until they chose to log out their dashboard existed for them whenever they visited the page. Guest credentials, however, are stored in session storage, given that a guest's experience of a game session likely concludes at the closing of the webpage tab. Furthermore, session storage of credentials allows guests to refresh their page without having to input a new username.
    <br/>
    <br/>
    Security for the application includes <a href="https://www.npmjs.com/package/helmet" target="_blank" rel="noreferrer" title="Link to NPM page for helmet">helmet</a> to ensure the most secure options for my HTTP headers, <a href="https://www.npmjs.com/package/express-mongo-sanitize" target="_blank" rel="noreferrer" title="Link to NPM page for express mongoose sanitize">Express Mongoose Sanitize</a> to aid in defense against NoSQL injection attacks, user password hashing with <a href="https://www.npmjs.com/package/bcrypt" target="_blank" rel="noreferrer" title="Link to NPM page for bcrypt">bcrypt</a> for more secure credentials, and custom Mongoose model validators to prevent certain special characters in user-provided input.
    <br/>
    <br/>
    This repository hosts the backend files as well as the production build of the frontend files. To facillitate a quick view of code, you can find the frontend files in the repo<a href="https://github.com/tdraper-dev/dungeonmapfrontend" target="_blank" rel="noreferrer" title="Link to frontend files for Dungeon Map!"> here</a>.
  </div>
  <br/>
  <p style="font-size: 18px">Frontend Repo:</p>
  <a href="https://github.com/tdraper-dev/dungeonmapfrontend" target="_blank" rel="noreferrer" title="Link to frontend files for Dungeon Map!">https://github.com/tdraper-dev/dungeonmapfrontend</a>
  <br/>
  <br/>
<br/>
<h2 style="font-size: 40px">Usage</h2>
<br/>
<h2 style="font-size: 40px">Installation</h2>
<br/>
<h2 id="nextSteps" style="font-size: 40px">Next Steps...</h2>