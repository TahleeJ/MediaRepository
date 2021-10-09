var startTime = 0;
var savedTime = "";
var running = false;

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        running = true;
    }
}

function checkStopwatch() {
    let stopTime = new Date().getTime();
    let savedMilliseconds = stopTime - startTime;

    var savedHours = Math.floor(savedMilliseconds / 3600000);
    savedMilliseconds = savedMilliseconds % 3600000;

    var savedMinutes = Math.floor(savedMilliseconds / 60000);
    savedMilliseconds = savedMilliseconds % 60000;

    var savedSeconds = Math.floor(savedMilliseconds / 1000);

    var checkTime = `${savedHours}:${savedMinutes}:${savedSeconds}`;

    return checkTime;
}

function stopStopwatch() {
    let stopTime = new Date().getTime();
    var savedMilliseconds = stopTime - startTime;

    var savedHours = Math.floor(savedMilliseconds / 3600000);
    savedMilliseconds = savedMilliseconds % 3600000;

    var savedMinutes = Math.floor(savedMilliseconds / 60000);
    savedMilliseconds = savedMilliseconds % 60000;

    var savedSeconds = Math.floor(savedMilliseconds / 1000);

    savedTime = `${savedHours}:${savedMinutes}:${savedSeconds}`;

    return savedTime;
}

function resetStopwatch() {
    startTime = 0;
    savedTime = "";
    running = false;
}
