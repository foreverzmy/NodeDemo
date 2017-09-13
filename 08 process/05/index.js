#!/usr/bin/env node

let args = process.argv.splice(2);
let command = args.shift();
let taskDescription = args.join(' ');

console.log(process.cwd());

switch (command) {
  case '-v':
  case '--version':
    console.log('v0.0.1');
    return;
  case '-t':
  case '--time':
    console.log(getTime());
    return;
  case '-h':
  case '--help':
  default:
    console.log('Usage: hello [options]\n');
    console.log('Options');
    console.log('  -h, --help  print the command help')
    console.log('  -t, --time  show the time now')
    console.log('  -v, --version   print hello version');
}

function getTime() {
  let now = new Date();
  return now.toLocaleString();
}