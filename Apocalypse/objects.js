class Player {  // The Object controlled by the player
    constructor() {  // Create the player object 
        this.color = "green";
        this.x = 370;
        this.y = 570
        this.width = 20;
        this.heigth = 25;
        this.cooldown = 60;
        this.immunityFrame = 0;
        this.life = 3
    }

    shoot(list) {  // If the cooldown == 0 append shoot to object-array
        if (this.cooldown == 0) {  // If no cooldown -> shoot a bullet
            list.push(new Bullet(this.x, true));  // Bullet up
            this.cooldown = 60;  // Reset Cooldown
            if (this.immunityFrame > 0) {  // Lowers the immunityFrame by 1 per shoot to 0
                this.immunityFrame --;
            }
        } else {
            this.cooldown --;;
        }
    }

    move(key) {  // When a key is pressed: key == the pressed key
        if (key.keyCode == 37 && this.x >= 5 ||
            key.keyCode == 65 && this.x >= 0) {  // a or leftArrow is pressed -> move left
            this.x -= 7;
        } else if (key.keyCode == 39 && this.x <= 738 ||
            key.keyCode == 68 && this.x <= 738) {  // d or rightArrow is pressed -> move right
            this.x += 7;
        }
    }
}

class Enemy {  // The Object to shoot at the player
    constructor() {
        this.color = "silver";
        this.x = Math.floor(Math.random() * 738);  //Random int between 0 and 738 as x
        this.y = 5
        this.width = 20;
        this.heigth = 25;
        this.cooldown = 120;
        this.immunityFrame = 0;
        this.life = 1;
    }

    shoot(list) {  // If the cooldown == 0 append shoot to object-array
        if (this.cooldown == 0) {  // If no cooldown -> shoot a bullet
            list.push(new Bullet(this.x, false));  // Bullet down
            this.cooldown = 100;  // Reset Cooldown
            if (this.immunityFrame > 0) {  // Lowers the immunityFrame by 1 per shoot to 0
                this.immunityFrame --;
            }
        } else {
            this.cooldown --;
        }
    }
}

class Bullet {  // The Object to be shoot by enemys and the player
    constructor(x, up) {
        this.color = "red";
        this.x = x + 8;  // x position is the same as the one who shoot it
        this.width = 4;
        this.heigth = 12
        this.up = up;  // up or down (Player or Enemy)
        if (up) {  // y -> defined by up or down
            this.y = 552;  // shooting up
        } else {
            this.y = 31;  // shooting down
        }
    }

    forward() {  // The bullet goes forward in its direction
        if (this.up) { // Bullet up -> by Player
            this.y -= 3;
        } else {   // Bullet down -> by Enemy
            this.y += 3;
        }
    }

    collision(list) {  // If something is hit by bullet -> -1 life
        for (var i = 0; i < list.length - 1; i++) {  // Iterates the list
            if (list[i].constructor.name == "Bullet") {  // If i Bullet
                if (list[i].y >= 600 || list[i].y <= -12) {  // If out of canvas remove
                    list.splice(i, 1);  // Bullet gets removed from the list
                    i--;  // Reset i
                    continue;  // Bullet deleted -> continue collision-test with new Element
                }
                for (var j = 0; j < list.length - 1; j++){  // Second iteration - Collison
                    if (list[j].constructor.name != "Bullet"  // j not a bullet
                    && (list[i].y <= 30 && list[i].y >= -7 && list[j].constructor.name == "Enemy"  // Bullet touch Enemy (y-axis)
                    || list[i].y + list[i].heigth >= 570 && list[j].constructor.name == "Player")  // Bullet touch Player (y-axis)
                    && list[i].x <= list[j].x + list[j].width  // Bullet touch Player/Enemy (x-axis) (Not right beside)
                    && list[i].x + list[i].width >= list[j].x) { // Bullet touch Player/Enemy (x-axis) (Not left beside)
                        if(list[j].immunityFrame == 0) {  // No immunity-frame
                            list[j].life --;  // Player/Enemy was hit and lose a life
                            list[j].immunityFrame = 2;  // Count of shoot before the immunityFrame ends
                        }
                        if (list[j].life <= 0 && list[j].constructor.name == "Enemy") {  // Enemy with 0 or less lifes
                            list.splice(j, 1);  // Enemy gets removed from the list
                            score ++;  // Score rise by 1
                        }
                        break;  // Bullet can't collide anymore
                    }
                }
            }
        }
        return list  // Return the new list (With deleted Enemys)
    }
}

class Builder {  // Manges the Enemys
    constructor() {
        this.cooldown = 0;
    }

    build(list) {  // Appends a Enemy to the list if cooldown == 0;
        if (this.cooldown <= 0) {
            list.push(new Enemy);
            this.cooldown = 240;
        } else {
            this.cooldown --;
        }
    }
}