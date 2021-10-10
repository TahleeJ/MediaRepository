function updateTimeDisplay(newTime) {
    var new_text;

    if (newTime <= 0) {
        new_text = "Time's up!"
        background_color = "red";
    } else {
        new_text = `Time remaining: 0:0:${newTime}`;
    }

    console.log(new_text);
}