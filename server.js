
function run(){
const { exec } = require('child_process');
const command = `json-server --watch db.json --port 3000`;
exec(command, (err, stdout, stderr) => {
  if (err) {
    console.log('Error running exec', err);
    return;
  }
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
});
}