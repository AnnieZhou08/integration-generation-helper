const express = require('express');
const readline = require('readline');
const fs = require('fs');
const readfiles = require('readfiles')
const app = express();

var downloadFolder = "";
app.listen(3000, function(){
  console.log("integration-generation-helper is running...");
  if(process.argv.length < 3){
    console.log("the directory of downloaded files is set to current folder.");
    downloadFolder="./";
  }else{
    for(var i = 2; i < process.argv.length; i++){
      downloadFolder += process.argv[i] + " ";
    }
    downloadFolder = downloadFolder.trim();
    console.log("the directory of downloaded files is set to " + downloadFolder + ".");
  }
  const rl = readline.createInterface({
    input: process.stdin
  });
  
  rl.on('line', (line) => {
    processInput(line);
  });
});

var specDir = "";
var testDir = "";
var lastNfiles = 0;

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
      createFolder();
    }else if(directory === "testDir"){
      testDir = name;
      console.log(testDir);
      createFolder();
    }else{
      console.log("please enter a valid input");
      return;
    }
  }else{
    lastNfiles = input;
    console.log(lastNfiles);
    createFiles();
  }
}

function createFolder(){
  var folder = specDir + "/" + testDir;
  if(!fs.existsSync(folder)){
    fs.mkdirSync(folder);
  }else{
    console.log("folder already exists!");
  }
}

function createFiles(){
  console.log("creating files...");
  var files = fs.readdirSync(downloadFolder);
  var processedFiles = files.filter(function (file) {
                          var isJSON = file.indexOf("JSON") >= 0 || file.indexOf("json") >= 0;
                          return isJSON;
                        });
  
  if(processedFiles.length < lastNfiles){
    console.log("please enter a valid number");
    return;
  }
  
  processedFiles.sort(function(file1, file2){
    var timestamp1 = fs.statSync(downloadFolder + "/" + file1).mtime.getTime();
    var timestamp2 = fs.statSync(downloadFolder + "/" + file2).mtime.getTime();
    return timestamp2 - timestamp1;
  });
  
  console.log(processedFiles);
  
  for(var i = 0; i < lastNfiles; i++){
    var newDir = specDir + "/" + testDir + "/" + processedFiles[i];
    fs.writeFileSync(newDir, fs.readFileSync(downloadFolder + "/" + processedFiles[i]));
  }
}
