
//Create a list of colors
var colors = ["blue", "red", "orange", "purple",
    "green", "yellow", "magenta", "brown", "cyan",
    "gray", "navy", "pink", "teal", "indigo", "violet"];



function show_pattern() {
    //Add the squares
    //console.log("hello inside function");

    //Get body element
    var body = document.getElementById("theBody");
    //Set initial square size & position
    var position = 25;
    var size = 300;
    while (size > 50) {
        //create a new node
        var thisDiv = document.createElement("div");
        
        //set the size as size - 20 * i
        thisDiv.style.width = size + "px";
        thisDiv.style.height = size + "px";
        thisDiv.style.top = position + "px";
        thisDiv.style.left = (position + 5) + "px";
        thisDiv.style.background = get_color();
        body.appendChild(thisDiv);
        size -= 20;
        position += 10;
        //console.log(size + "\n");
    }
}
;

//get random color
function get_color() {
    //select random number 0 to color list length - 1
    var num = Math.floor(Math.random() * colors.length);
    //return the color at that index
    return colors[num];
}
;
