const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 8000;

const handleRequest = (req, res) => {
    let serverPage = "";

    switch (req.url) {
        case "/":
            serverPage = "./pages/index.html";
            break;

        case "/about":
            serverPage = "./pages/about.html";
            break;

        case "/service":
            serverPage = "./pages/service.html";
            break;

        case "/contact":
            serverPage = "./pages/contact.html";
            break;

        default:
            serverPage = "./pages/404-error.html";
            break;
    }

    fs.readFile(
    path.join(__dirname, serverPage),
    (Error, pageContent) => {
      if (Error) {
        res.end("Internal Server Error");
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/html",
      });

      res.end(pageContent);
    }
  );
};

const Server = http.createServer(handleRequest);

Server.listen(port, (serverError) => {
  if (serverError) {
    console.log(serverError);
    return;
  }

  console.log(`Server running on port ${port}`);
  console.log(`http://localhost:${port}/`);
});
