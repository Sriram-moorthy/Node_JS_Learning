// CREATING A SIMPLE SERVER

//Importing the http module to create a server
const http=require('http');
const server=http.createServer((request,response)=>{
  console.log(request);
  response.end('Hello from the server!');
});

// In the below code, we make the server listen on port 8000 and localhost 
server.listen(8000,'127.0.0.1',()=>{
  console.log('Listening to requests on port 8000');
})
// We actually create a server using the http module in Node.js and listen for incoming requests then respond to them after that 
// In the above code, we create a simple HTTP server that listens on port 8000
// When a request is made to the server, it responds with 'Hello from the server!'
// Note: This is a basic example of creating a server using Node.js

