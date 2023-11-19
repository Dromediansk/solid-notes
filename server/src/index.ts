import http from "http";
import app from "./app";

const server = http.createServer(app);
const port = process.env.PORT;

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
