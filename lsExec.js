import { exec } from "child_process";

exec("ls -la", (err, stdout, stderr) => {
  if (err) {
    console.log(`err, ${err.message}`);
    return;
  }
  if (stdout) {
    console.log(`stderr: ${stderr}`);
  }
  console.log(`stdout: ${stdout}`);
});
