const express = require('express');
const readline = require('readline');
const app = express();

app.listen(3000, function(){
  console.log("integration-generation-helper is running...");
  const rl = readline.createInterface({
    input: process.stdin
  });
  
  rl.on('line', (line) => {
    console.log(line);
    processInput(line);
  });
})

/* exists 3 types of usages for line:
  
*/
function processInput(line){
  
}