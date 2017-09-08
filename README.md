# wiki-search-international
A fullstack javascript project: This project uses JavaScript on the client to query the wikimedia api for specific search results or a random wikipedia page. The server side uses express.js and detects the clients preferred language to configure the correct wikimedia api url in the client html and js files. The wikimedia api query is called using fetch-jsonp because the browser window.fetch does not support the JSONP function response type. 