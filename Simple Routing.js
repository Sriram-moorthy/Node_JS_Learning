// CREATING A SIMPLE SERVER AND ROUTING

//Routing:Implementing different actions based on different URLs
//Importing the http module to create a server
const http=require('http');
const url=require('url');
const server=http.createServer((request,response)=>{
  const pathName=request.url;
  //request.url gives the URL of the request made to the server
  // Routing logic based on the requested URL is below
  if(pathName==='/overview'){
    response.end('This is the OVERVIEW');
  }else if(pathName==='/product'){
    response.end('This is the PRODUCT');
  }else{
    response.writeHead(404,{
      'Content-type':'text/html',
      'my-own-header':'hello-world'
    })
    //response.writeHead is used to write the response header with status code and content type which is HTML in this case
    response.end('<center><h1>Page Not Found</h1></center>');
  }
});
