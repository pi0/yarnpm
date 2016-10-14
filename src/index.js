#!/usr/bin/env node
const WIN32 = process.platform.indexOf("win32") !== -1;
const Spawn = require('child_process').spawn;
const Path = require('path');
const FS = require('fs');

// NPM -> Yarn Arguments Mapping
const _map = {
    'install': 'add',
};

const _need_tty = [
    'publish',
];

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
var _args = npm ? args.map(npm2yarn) : args;
var detached = needsTTY(_args);
Exec(command, _args, detached);

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

    // Filter out and don't pass --npm and --yarn options!
    if (['--npm', '--yarn'].indexOf(arg) !== -1)
        return '';

    return arg;
}

// Spawn and allocate TTY is detached==true
function Exec(cmd, args, detached) {
    Spawn(cmd + ' ' + args.join(' '), [], {
        shell: true,
        stdio: 'inherit',
        detached: detached
    });
}

// Check if command needs to run in detached mode and needs tty
function needsTTY(arg) {
    for (var cmd in _need_tty)
        if (arg.indexOf(cmd) !== -1)
            return true;
    return false;
}

// DOC ME
function installBin() {
	var dest = Path.resolve(Path.dirname(process.env.ComSpec),'npm');
	if(WIN32) {
		// On windows systems we need to make a .bat file
		dest = dest + '.bat';
		console.log('Writing to ' + dest);
		FS.writeFileSync(dest, '@"'+process.argv[0]+'"' + ' "' +  process.argv[1] + '" %*');
	} else {
		// On Unix systems we can directly execute script
		var src = process.argv[1];
		console.log('Making syslink' + src + ' -> ' + dest);
		FS.symlinkSync(src, dest);
	}
}
