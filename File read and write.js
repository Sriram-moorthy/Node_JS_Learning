// File System Module: Reading and Writing Files
const fs = require('fs');
 
// Reading a file synchronously means the code execution will wait until the file is read completely
// For that, we use readFileSync method from fs module
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut=`This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

// Writing a file synchronously means the code execution will wait until the file is written completely
// For that, we use writeFileSync method from fs module
fs.writeFileSync('./txt/output.text',textOut);
console.log('File written!');

// Note: Synchronous methods block the event loop, which can lead to performance issues in a real-world application.



// Asynchronous File Reading and Writing

fs.readFile('./txt/start.txt','utf-8',(err,data)=>{
  console.log(data);
});
console.log('Will read file!');
// In the above code, 'Will read file!' will be logged before the content of start.txt
// This is because readFile is asynchronous and does not block the event loop

fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
  if(err) return console.log('Error 💥');
  fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
    console.log(data2);
    fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
      console.log(data3);
      fs.writeFile('./txt/final.text',`${data2}\n${data3}`,'utf-8',err=>{
        console.log('Your file has been written');
      })
    })
  })
});
console.log('Will read file!');

// In the above code, we read start.txt to get the name of another file to read
// Then we read that file and another file (append.txt)
// Finally, we write the combined content into final.txt
// All operations are done asynchronously using callbacks

// Note: While asynchronous methods do not block the event loop, excessive nesting of callbacks can lead to "callback hell"


