const http = require("http");
const server=http.createServer(function (req, res) {
  if (req.url==="/") {
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end("Welcome to My Node.js Server!");
  } 
  else if (req.url==="/about"){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end("This is a basic Node.js server created using the http module.");
  } 
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Page Not Found");
  }
});
server.listen(3000, function () {
  console.log("Server is running on http://localhost:3000");
});
