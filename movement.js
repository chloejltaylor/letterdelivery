// this moves the player instantly to whereever has been clicked

        // if(!this.input.activePointer.isDown && isClicking == true) {
        //     player.y = this.input.activePointer.position.y;
        //     player.x = this.input.activePointer.position.x;
        //     isClicking = false;
        // } else if(this.input.activePointer.isDown && isClicking == false) {
        //     isClicking = true;
        // }

// this enables the player to be moved by swiping a touch screen


// function swipemovement(){
//     if(!this.input.activePointer.isDown && isClicking == true) {
//         if(Math.abs(this.input.activePointer.upY - this.input.activePointer.downY) >= 50) {
//             if(this.input.activePointer.upY < this.input.activePointer.downY) {
//                 swipeDirection = "up";
//             } else if(this.input.activePointer.upY > this.input.activePointer.downY) {
//                 swipeDirection = "down";
//             }
            
//         } else if (Math.abs(this.input.activePointer.upX - this.input.activePointer.downX) >= 50) {
//             if(this.input.activePointer.upX < this.input.activePointer.downX) {
//                 swipeDirection = "left";
//             } else if(this.input.activePointer.upX > this.input.activePointer.downX) {
//                 swipeDirection = "right";
//             }
//         }
//         isClicking = false;
//     } else if(this.input.activePointer.isDown && isClicking == false) {
//         isClicking = true;
//     }
    
//     if(swipeDirection == "down") {
//         if(Math.abs(player.y - 500) <= 10) {
//             player.y = 500;
//         } else {
//             player.y += 8;
//         }
//     } else if(swipeDirection == "up" && player.y > 150) {
//         if(Math.abs(player.y - 150) <= 10) {
//             player.y = 150;
//         } else {
//             player.y -= 8;
//         }
//     } else if(swipeDirection == "left" && player.x < 500) {
//         if(Math.abs(player.x - 150) <= 10) {
//             player.x = 150;
//         } else {
//             player.x -= 8;
//         }
//     } else if(swipeDirection == "right" && player.x > 150) {
//         if(Math.abs(player.x + 150) <= 10) {
//             player.x = 150;
//         } else {
//             player.x -= 8;
//         }
//     }
    
// }


