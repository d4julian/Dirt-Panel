# Dirt-Panel
DirtCraft's Staff Panel
It's a panel for admins but also moderators due to inclusivity, to administate the servers using the panel. Moderators can only read console and turn off the server and back on again. Admins can be granted FTP and Console-send.

# How to import
1. git clone --recurse-submodules https://github.com/Dirt-Craft/Dirt-Panel
2. Import the entire folder
3. Import PanelPlugin/Dirt-Panel-Daemon build.gradle
4. Set both branches to master if they are not.
5. ??? profit

# How to deploy
1. Set up an SQL Database if you don't have one, and make sure node package manager (NPM) is installed.
2. Create the correct databases/tables
   * Create dirtpanel database tables. (/Dev-Configs/dirtpanel.sql, /Dev-Configs/ftp_blacklist.sql)
   * If you don't have luckperms installed, create luckperms database and tables. (/Dev-Configs/luckperms.sql)
   * If you don't have discord-link, create the player-data database and tables. (/Dev-Configs/playerdata.sql)
4. Create both the .env files for backend and client.
   * Place ".env backend" into /backend and ".end client" into /dirtpanel. Rename both to .env
   * fill out token and O2 Auth info. (Will require setting up discord O2 Auth bot) in both .env files
   * fill out SOCKET_CONN_TOKEN. Can be anything, just keep it for later. (Will need it for Daemon)
   * Input database credentials into the relevant .env file.
5. Build both the client and backend
   * Go into the backend folder and execute the following command "npm install"
   * Go into the dirtpanel folder and execute the following command "npm install"
5. The panel itself should now be functional. Execute the backend with "node app.js" and the client with "npm start".
   * Make sure your discord ID is linked to your MC UUID in playerdata/verificiation table
   * Make sure you have the owner group "group.owner" with global server/world context in the luckperms/luckperms_user_permissions table. 
   * The panel should be accessable via "localhost:3000", granted you are using the default values.
6. Create server nodes
   * Create a node configuration in the admin panel, add some servers and create the config. The start args should be the batch/.sh command used to boot MC.
   * Keep the node window open, you will need it in step 7. Repeat as many times as needed. (1 node is fine for testing)
7. Create daemon setups
   * Build Daemon project, place the jar inside a folder that can be anywhere.
   * Copy token.txt from /Dev-Configs/ and place the SOCKET_CONN_TOKEN from step 4 in.
   * Go to the node you created in step 6, Click view config, download and place it in the folder.
   * Create a "servers" folder and enter inside it.
   * Create a folder for each server, name set as the prefix for each server. (Only for a single node, We will repeat step 7 for other nodes)
   * Place a fully working server setup inside each folder.
   * Build PanelPlugin project, place inside each server. Make sure SpongeForge is also installed, as well as Configuration-Lib-1.0.0. (Included in /Dev-Configs/)
   * Repeat for each node created.
8. Boot the Daemon.
