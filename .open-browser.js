"use strict";
const { exec } = require("child_process");

const args = process.argv.slice(2);

// console.log(JSON.stringify(args));

if (args.length > 0) {
  // vite preview sends "preview" as first argument!
  const url = args.length === 2 ? args[1] : args[0];
  exec(
    `google-chrome --incognito --new-window ${url}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`open-browser: error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`open-browser: stderr: ${stderr}`);
        return;
      }
    }
  );
}
