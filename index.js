const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const myUrl = url.parse(req.url, true);
  const log = `${Date.now()}:${req.method} ${req.url}: New Request Received\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        if (req.method === "GET") res.end("Home Page");
        break;
      case "/about":
        const username = myUrl.query.myname;
        const id = myUrl.query.myid;
        // console.log("Query Params:", myUrl.query);
        res.end(`Hello ${username} your id is: ${id} `);
        break;
      case "/search":
        const serach = myUrl.query.search_query;
        // console.log(myUrl.query);
        res.end("Here is your result for " + serach);
        break;
        case "/signup":
            if (req.method === "GET") res.end("This is a Sign Up Form")
                else if(req.method === "POST"){
            // DB Query
            res.end("Success")
        }
            break;
      default:
        res.end("404 Not Found");
        break;
    }
  });
});

myServer.listen(8000, () => {
  console.log("Server Started");
});
