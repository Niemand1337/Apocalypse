// Functions
function main() {  // Main Function
    update();
    render();
}

function update() {  // Update the game
    builder.build(objects);  // Create new Enemys
    for (var i = 0; i < objects.length; i++) {
        if (objects[i].constructor.name == "Bullet") { // If Bullet
            objects[i].forward();  // -> forward
            objects = objects[i].collision(objects);  // Collisionfunction -> If bullet hit Player or Enemy
        } else if (objects[i].constructor.name == "Player" || objects[i].constructor.name == "Enemy"){  // If Player or Enemy
            objects[i].shoot(objects);  // -> shoot
        }
    }
}

function render() {  // Render the game
    // Reset the canvas
    canvas.fillStyle = "black";
    canvas.fillRect(0, 0, 760, 600);

    for (let i = 0; i < objects.length; i++) {  // Iterates through the object-Array and draw them
        drawObject(objects[i]);
    }

    document.getElementById("life").innerHTML = "Life: " + objects[0].life + "  Immunity: " + objects[0].immunityFrame;  // Status health and immunity
    document.getElementById("score").innerHTML = "Score: " + score;  // Status score

    if (objects[0].life <= 0) {  // If Player has no lifes
        death();
    }
}

function drawObject(object) {  // Draw a rectangle Object on a canvas
    canvas.fillStyle = object.color;
    canvas.fillRect(object.x, object.y, object.width, object.heigth);
}

function death(){  // death screen
    document.getElementById("life").innerHTML = "You died";  // Death message
    document.getElementById("score").innerHTML = "Your final Score is:" + score + "</br>Reload side to play again" ;  // Final score
    clearInterval(loop);  // End loop -> script
}

// Init
const canvas = document.getElementById("canvas").getContext("2d");  // Canvas to draw on
var objects = [new Player()]; // Create List with all objects -> player at the start
const builder = new Builder;
var score = 0;  // The score
window.addEventListener("keydown", function(key) {objects[0].move(key)});  // Player controll

// Loop
const loop = setInterval(main, 100/6); // Set the game on a loop