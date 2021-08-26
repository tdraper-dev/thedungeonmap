<h1 style="font-size: 80px">Dungeon Map!</h1>
<span>
  <img alt="GitHub" src="https://img.shields.io/github/license/tdraper-dev/thedungeonmap?label=license"> 
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/tdraper-dev/thedungeonmap"> 
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/tdraper-dev/thedungeonmap"> 
</span>
<h2 style="font-size: 40px">Table of Contents</h2>
<ul>
<a href="#description" title="Link to Description section"><li style="font-size: 17px">Description</li></a>
<ul>
<a href="#frontendRepo" title="Link to frontendRepo sub section"><li>Frontend Repository</li></a>
</ul>

<a href="#usage" title="Link to Usage section"><li style="font-size: 17px">Usage</li></a>
<ul>
<a href="#createDungeonMaster" title="Link to subsection To Create Dungeon Master Account of Usage"><li>To Create Dungeon Master Account</li></a>
<a href="#dungeonMaster" title="Link to subsection As Dungeon Master of Usage"><li>As Dungeon Master</li></a>
<ul>
<a href="#dashboard"><li>Dashboard</li></a>
<a href="#gameboard"><li>Gameboard</li></a>
</ul>
<a href="#guestPlayer" title="Link to subsection As Guest Player of Usage"><li>As Guest Player</li></a>
</ul>

<a href="#installation" title="Link to Installation section"><li style="font-size: 17px">Installation</li></a>

<a href="#nextSteps" title="Link to Next Steps section"><li style="font-size: 17px">Next Steps...</li></a>
</ul>
  <h2 id="description" style="font-size: 40px">Description</h2>
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
  <p id="frontendRepo" style="font-size: 18px">Frontend Repo:</p>
  <a href="https://github.com/tdraper-dev/dungeonmapfrontend" target="_blank" rel="noreferrer" title="Link to frontend files for Dungeon Map!">https://github.com/tdraper-dev/dungeonmapfrontend</a>
  <br/>
  <br/>
<br/>
<h2 id="usage" style="font-size: 40px">Usage</h2>
In order to access and use the app, visit <a href="https://thedungeonmap.herokuapp.com" target="_blank" rel="noreferrer" title="Link to Dungeon Map! by Travis Draper">https://thedungeonmap.herokuapp.com</a>.
<br/>
<br/>
<p id="createDungeonMaster" style="font-size: 17px; background-color: rgba(46, 49, 49, 1); width: fit-content">To Create Dungeon Master Account:</p>
<ol>
  <li>On the login page, click "Sign Up." Input a username and password. Note that special characters <strong>[ }, {, \, /, `, *, $, ), ( ]</strong> are not allowed. If you'd like to preview the experience, click "Demo as Dungeon Master" to be logged in with demo account credentials.</li>
  <li>Once you see a confirmation above that the account has been created, login to the app under the "Login" section using the newly created credentials.</li>
</ol>
<br/>
<p id="dungeonMaster" style="font-size: 17px; background-color: rgba(46, 49, 49, 1); width: fit-content">As Dungeon Master:</p>
Your <span id="dashboard" style="font-size: 17px"><strong>dashboard</strong></span> is home to your various gameboards. Here you can:
<ul>
  <li>Create new gameboards</li>
  <ol>
    <li>Click the "Create" button in the top left corner of your dashboard screen.</li>
    <li>Input a name for your gameboard so that you can easily recognize it.</li>
    <li>[OPTIONAL] Click "Upload Image" to select an image file for your gameboard. You can also do this inside the gameboard later. If no image is chosen, a default image is selected.</li>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Note:</strong> only .png and .jpeg image files are accepted.</span>
    <li>[OPTIONAL] If your image is of an acceptable file format, you will see a thumbnail preview of it below the "Select Image" box.</li>
    <li>[OPTIONAL] Click "Create" to generate your new gameboard.
  </ol>
  <li>Delete unused gameboards</li>
  <ol>
    <li>Click the red X associated with your gameboard.</li>
    <li>Confirm deletion.</li>
  </ol>
  <li>Quick preview existing gameboards and pieces on those boards</li>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Note:</strong> any existing pieces on your boards are not moveable from this view. Please host the gameboard to manipulate pieces and image.</span>
  <li>Host any of your existing gameboards</li>
  <ol>
    <li>Click the green check associated with your gameboard.</li>
  </ol>
  <li>Logout</li>
  <ol>
    <li>Click the "Logout" button located in the top left corner of your dashboard screen.</li>
  </ol>
</ul>
<br/>
Your <span id="gameboard" style="font-size: 17px"><strong>gameboard table</strong></span> is where you and friends will interact with map by creating, moving, and deleting pieces, as well as chat through in-app chat functionality. As Dungeon Master you have sole control of the map image and the creation of player pieces. Furthermore, you have the ability to begin and end game sessions, the status of which will either prevent or allow players to join. Your abilities include:
<ul>
<li>Hosting live game sessions</li>
<ol>
  <li>Click the 3 white vertical dots in the top right corner of your screen.</li>
  <li>Click "Start Session" from the dropdown menu of options.</li>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Note:</strong> the three vertical dots are now RED; this indicates your session is live.</span>
  <li>You can share the full URL with players to invite them into the game OR share the text following "gameboard/". This text is the unique indentifier for your specific gameboard."</li>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>For example:</strong> in https://thedungeonmap.herokuapp.com/gameboard/TheWitcher-234253, "TheWitcher-234253" is the unique identifier.</span>
</ol>
<li>Ending live game sessions</li>
<ol>
  <li>Click the 3 red vertical dots in the top right corner of your screen.</li>
  <li>Click "End Session". You will see information regarding the live Session ID disappear.</li>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Note:</strong> the three vertical dots are now WHITE; this indicates your session is no longer live.</span><br/>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Note:</strong> If you click "End Session", any players inside the game will be kicked out. If you would prefer for players to remain, simply exit the board by clicking "Dashboard" or close the webpage tab.</span>.
</ol>
<li>Changing the map image</li>
<ol>
  <li>Click the red circle on the right of the gameboard table screen "Tools".</li>
  <li>Click "Change Map" from the tool box option bar.</li>
  <li>Click "Select Image" and select an image file.</li>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Note:</strong> only .png and .jpeg image files are accepted.</span>
   <li>If your image is of an acceptable file format, you will see a thumbnail preview of it below the "Select Image" box.</li>
   <li>Click "Upload" to change the board image.</li>
</ol>
<li>Adding game pieces</li>
<ol>
  <li>Click the red circle on the right side of the gameboard table screen "Tools".</li>
  <li>Click "Add Icon" from the tool box option bar.</li>
  <li>Enter text input for the player piece. Once text has been entered, you will see an auto-generated preview of the piece.</li>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Note:</strong> [ }, {, \, /, `, *, $, ), ( ] are not accepted characters</span>
  <li>Select a color for your piece from the dropdown options under "Color."</li>
  <li>Click "Create Icon" to generate the player piece in the top right corner of your gameboard</li>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Note:</strong> To hide the tool box, click the red circle "Tools" floating to the left of the tool box.</span>
</ol>
<li>Deleting game pieces</li>
<ol>
<li>Drag and drop the game piece on top of the "Delete" circle located in the very top left hand corner of gameboard table screen.</li>
</ol>
<li>Chatting with fellow players</li>
<ol>
  <li>Click the blue circle on the right side of the gameboard table screen "Chat".</li>
  <li>Input text in the text box located at the bottom of the chat window.</li>
  <li>Press "Enter" or click the message icon located to the right of the text box to send your message.</li>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Note:</strong> As Dungeon Master, your chat name will be your Dungeon Master username.</span><br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Note:</strong> To hide the chat window, click the blue circle "Chat" floating to the left of the chat window.</span>
</ol>
<li>Returning to your Dashboard</li>
<ol>
  <li>Click the 3 white vertical dots in the top right corner of your screen.</li>
  <li>Click "Dashboard" from the dropdown menu of options.</li>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Note:</strong> If your game session is live, this will NOT remove players from the session. First click "End Session" to do so.</span><br/>
</ol>
</ul>
<br/>
<p id="guestPlayer" style="font-size: 17px; background-color: rgba(46, 49, 49, 1); width: fit-content">As Guest Player:</p>
<ul>
<li>To join a game session hosted by a Dungeon Master, either: 
<ol>
<li>Copy and paste the shared URL into your web browser's address bar. Upon loading, you will be asked to input a player name, so as to be identified in the chat room.</li>
</ol>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OR
<ol>
<li>Visit <a href="https://thedungeonmap.herokuapp.com/login" target="_blank" rel="noreferrer" title="Link to Dungeon Map! by Travis Draper">https://thedungeonmap.herokuapp.com/login</a></li>
<li>Click "Join Session" on the Login screen.</li>
<li>Input a player name in the text box provided, so as to be identified in the chat room.</li>
<li>Input the unique Session ID shared with you by the Dungeon Master.</li>
<li>Click "Join" to enter the game session.</li>
</ol>
</li>
<li>To Chat with Fellow Players</li>
<ol>
  <li>Click the blue circle on the right side of the gameboard table screen "Chat".</li>
  <li>Input text in the text box located at the bottom of the chat window.</li>
  <li>Press "Enter" or click the message icon located to the right of the text box to send your message.</li>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Note:</strong> Your chat name will be the player name you provided when joining the game.</span>
</ol>
</uL>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><strong>Note:</strong> If you close the web page tab, you will be asked to re-enter a player name upon reentry.</span>
<br/>
<br/>
<p style="font-size: 17px; background-color: rgba(46, 49, 49, 1); width: fit-content">To move pieces, simply click to hold and release to drop!</p>
<br/>
<br/>
<h2 id="installation" style="font-size: 40px">Installation</h2>
  In order to create your own working copy of <strong>Dungeon Map!</strong>:
  <ol>
  <li>Open your command line.</li>
  <li>Change the current working directory to the location where you want the cloned directory.</li>
  <li>Type "git clone", and then paste the URL for this git repo.</li>
  <pre><code>$ git clone https://github.com/tdraper-dev/thedungeonmap.git</code></pre>
  <li>Press Enter to create a local clone.
  <li>Navigate to the root of the project directory.</li>
  <pre><code>$ cd thedungeonmap</code></pre>
  <li>Run npm install in command line to install project dependencies.</li>
  <pre><code>$ npm install</code></pre>
  <li>Create a .env file.</li>
  <pre><code>$ ni .env</code></pre>
  <li>Using a text editor, create a SECRET environment string variable for jwt token authorization and configure a MONGODB_URI for access to a MongoDB cluster inside of the .env file.</li>
  <pre><code>
  MONGODB_URI="[YOUR MONGODB_URI HERE]"
  SECRET="[YOUR SECRET KEY HERE]"
  //To disable inline-script with CSP so that the app doesn't break at deployment
  INLINE_RUNTIME_CHUNK=false
  </code></pre>
  <li>Deploy to website hosting service like Heroku, or run locally with npm start.</li>
  <pre><code>$ npm start</code></pre>
  </ol>
<br/>
<br/>
<h2 id="nextSteps" style="font-size: 40px">Next Steps...</h2>
<div>
  I would like to see the Dungeon Master toolkit expanded in future releases. I'm interested in adding:
  <ul>
  <li>A shadow tool that allows the Dungeon Master to obscure parts of the map from players, while creating a semi-transparent black screen on sections of their own map. I imagine doing so will require use of the < canvas > element layered on top of the map.</li>
  <li>I think implementing rolling dice would be a fun, useful update as well. I'd love to simulate the d20 roller on <a href="https://www.dndbeyond.com/" title="_blank" rel="noreferrer" title="Link to Beyond20 homepage">Beyond20</a> in my own code at some point, too and perhaps expand it to have multiple dice visuals like the standard white cube as well as DnD dice.</li>
  <li> Support for player pieces that are SVGs. This will probably be the soonest update, as I don't imagine this requires much retooling other than allowing the players an option to upload SVGs (or choose from defaults) and then dynamically checking the player input in React to determine which element (div or svg) to produce.</li>
  <li>Ultimately, I'd like to expand this application to be more universal, rather than catering specifically to Dungeons and Dragons sessions. I want to create and load default game options for the "Dungeon Master" to choose from, like card decks, rolling dice, popular board game images, so that Dungeon Map! could be used as a virtual table top board game session, accessible and playable on mobile and desktop devices everywhere for quick drop-in play with friends</li>
  <li>I want to learn more about efficient image file transfer and storage, as I think my biggest irk with the application right now is the initial load time for a Dashboard with many gameboards. This will require some research. I currently use multer library to transfer files, and the Sharp library to resize them in the backend.</li>
  </ul>
</div>