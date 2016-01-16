var high = 100;
var low = 1;
var my_num;
var finished = false;
var guesses = 0;
var your_num;

function do_game(){
    my_num = get_random_in_range(low, high);
    console.log(my_num);
    while (!finished) {
        your_num = parseInt(prompt("I am thinking of a number between " 
                + low + " and " + high 
                + ".\n\nWhat is the number?"));
        guesses++;
        finished = check_guess();
    }
}

function check_guess(){
    if (isNaN(your_num)) {
        alert("Not a number!");
        return false;
    } else if (your_num > high || your_num < low) {
        alert("Not in range!");
        return false;
    } else if (your_num > my_num) {
        alert("Too high! Try again.");
        return false;
    } else if (your_num < my_num) {
        alert("Too low! Try again.");
        return false;
    } else {
        alert("You win!\n\n the number was " + my_num + "!\nYou guessed in " + guesses + " guesses.");
        return true;
    }
}



function get_random_in_range(low, high) {
    return Math.floor(Math.random() * high) + low;
}


