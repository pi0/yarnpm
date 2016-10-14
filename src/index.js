#! /usr/bin/env node

const WIN32 = process.platform.indexOf("win32") !== -1;
const _Exec = require('child_process').exec;
const Path = require('path');
const FS = require('fs');

// NPM -> Yarn Arguments Mapping
const _map = {
    'install': 'add',
};

// Extract Command Line Args
const args = process.argv ? process.argv.splice(2) : [];

// Check for internal commands
if (args[0] === 'yarnpm') {
    switch (args[1]) {
        case 'install':
            installBin();
            break;
        default:
            console.log('YARNPM::Invalid action');
    }
    return;
}

// Let's go
var npm = useNPM();
var command = npm ? 'npm' : 'yarn';
Exec(command, npm ? args.map(npm2yarn) : args);

// Spawn and redirect stdout/stderr
function Exec(cmd, args) {
    var p = _Exec(cmd + ' ' + args.join(' '));
    p.stdout.pipe(process.stdout);
    // Make output pretty, it is already formatted by child
    p.stderr.pipe(process.stdout);
}

// Check if we Should NPM instead of Yarn
function useNPM() {
    if (args.indexOf('--npm') !== -1)
        return true;

    if (args.indexOf('--yarn') !== -1)
        return false;

    // Scoped packages are not currently working with YARN
    for (var arg in args)
        if (arg.indexOf('@') === 0)
            return true;

    return false;
}

// Convert argument from NPM to Yarn
function npm2yarn(arg) {
    // Check for arguments mapping
    if (_map[arg])
        return _map[arg];
    return arg;
}

function installBin() {
    var src = Path.resolve(__filename);
    var dest_dir = WIN32 ? Path.dirname(process.env.ComSpec) : '/usr/local/bin';
    var dest = Path.resolve(dest_dir, 'npm');

    console.log(src + ' -> ' + dest);
    FS.symlinkSync(src, dest);
}