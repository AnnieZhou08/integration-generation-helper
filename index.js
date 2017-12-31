const express = require('express');
const readline = require('readline');
const app = express();

app.listen(3000, function(){
  console.log("integration-generation-helper is running...");
  const rl = readline.createInterface({
    input: process.stdin
  });
  
  rl.on('line', (line) => {
    processInput(line);
  });
});

var specDir;
var testDir;
var lastNfiles;

/* exists 3 types of usages for line:
  1. <int>
  2. "specDir=" + <feature> (e.g. "specDir=EnrichedTimeOnCalculations)
  3. "testDir=" + <test name> (e.g. "testDir=ET-out-of-context")
*/
function processInput(line){
  line = line.trim();
  var input = parseInt(line);
  
  if(isNaN(input)){
    var idx = line.indexOf("=");
    if(idx != 7){
      console.log("please enter a valid input");
      return;
    }
    var directory = line.substring(0, idx);
    var name = line.substring(idx+1);
    
    if(directory === "specDir"){
      specDir = name;
      console.log(specDir);
    }else if(directory === "testDir"){
      testDir = name;
      console.log(testDir);
    }else{
      console.log("please enter a valid input");
      return;
    }
  }else{
    lastNfiles = input;
    console.log(lastNfiles);
  }
}