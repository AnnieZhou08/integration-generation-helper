# integration-generation-helper

## Setup:
`git clone` this repository to a desired directory (e.g. "C:/") <br>
run `npm install` to install all dependencies

## Usage:
1. open command prompt
2. navigate to this directory
3. run `node index.js arg`, where `arg` is the source directory of where your jsons are going to be downloaded to (most likely the download folder). Leaving `arg` blank would set the source file directory to the current folder (i.e. path/to/integration-generation-helper)
4. There are 3 inputs user can enter after app starts running: <br>
  "specDir=" + <feature-name> (i.e. specDir=Enriched-Time-Calculations) : this creates a spec folder *in the current directory* for all the tests; if folder (path/to/specDir) already exists, system switches to this folder. <br>
  "testDir=" + <test-name> (i.e. testDir=ET-based-variance_single-val-filter) : this creates a test folder inside the specified spec folder; if folder (path/to/specDir/testDir) already exists, system switches to this folder. <br>
  "int" : this would move the last "int" modified JSON files from source directory to the created folder from above (i.e. creating "int" files: path/to/specDir/testDir/story.json, path/to/specDir/testDir/Chart1.json etc.)

## Example:
0. `node index.js C:/I######/Downloads`
1. specDir=Enriched-Time -> creates a folder : path/to/integration-generation-helper/Enriched-Time
2. testDir=ET_out-of-context -> creates a folder : path/to/integration-generation-helper/Enriched-Time/ET_out-of-context
3. refresh the story in Orca -> downloads story.json, Chart1,json, Chart2.json to the Downloads folder
4. 3 -> copies the last 3 modified json files (story.json, Chart1,json, Chart2.json) in C:/I######/Downloads to path/to/integration-generation-helper/Enriched-Time/ET_out-of-context
5. testDir=ET_in-context -> creates a folder : path/to/integration-generation-helper/Enriched-Time/ET_in-context
6. specDir=Fiscal-Time -> creates a folder : path/to/integration-generation-helper/Fiscal-Time
7. then running: specDir=Enriched-Time, followed by: testDir=ET_in-context will switch you to path/to/integration-generation-helper/Enriched-Time/ET_in-context
This way it allows you to be flexible switching between tests and stories

## Future implementations:
1. going to allow two command arguments (i.e. `npm index.js arg1 arg2`), where `arg2` is going to be the destination directory; so instead of having to manually move the specDir to the directory inside hana, it just creates the specDir straight inside hana.
2. going to allow the follow command argument instead of "int" : <br>
  "tables=" + "int" : specifies how many table.json is needed in testDir, and automatically generates a Table<n>.json file with an empty json object inside testDir.
3. going to "cut and paste" the files inside source directory instead of "copy and paste" (need to talk about this)
4. going to generate the "it" block based on the files names
