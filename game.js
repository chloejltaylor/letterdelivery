    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var player;
    var barriers;
    var houses;
    var letter1;
    var letter2;
    var letter3;
    var cursors;
    var lettertally = 3;
    var message;
    var letterbox1;
    var letterbox2;
    var letterbox3;
    var lettertallyText;
    var isClicking = false;
    var isSwiping = false
    var swipeDirection;
    var currentLetter = 'letterbox1'
    let isLetter1Delivered = false
    let isLetter2Delivered = false
    let isLetter3Delivered = false
    var timedHideMessage = true
    var timedCongratulationsRead
    var congratulationsMessageRead = true
    let isTravellingRight = false
    let isTravellingLeft = false
    let isTravellingUp = false
    let isTravellingDown = false
    let isStandingStill = true
    let justClicked = false
    let justClickedX = false
    let justClickedY = false


    var game = new Phaser.Game(config);

    function preload ()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('star', 'assets/star.png')
        this.load.image('blocker_h', 'assets/platform.png');
        this.load.image('blocker_v', 'assets/platform90.png');
        this.load.image('house1', 'assets/house1.png');
        this.load.image('house2', 'assets/house2.png');
        this.load.image('house3', 'assets/house3.png');
        this.load.image('letter1', 'assets/letter1.png');
        this.load.image('letter2', 'assets/letter2.png');
        this.load.image('letter3', 'assets/letter3.png');
        this.load.image('letterbox', 'assets/letterbox.png');
        this.load.image('letterbox1', 'assets/letterbox.png');
        this.load.image('letterbox2', 'assets/letterbox.png');
        this.load.image('letterbox3', 'assets/letterbox.png');
        this.load.spritesheet('postalworker', 'assets/postie.png', { frameWidth: 31, frameHeight: 38 });
    }

    function create ()
    {
        this.add.image(400, 300, 'sky');

        barriers = this.physics.add.staticGroup();
        barriers.create(400, 600, 'blocker_h').setScale(2).refreshBody();
        barriers.create(25, 300, 'blocker_v');
        barriers.create(775, 300, 'blocker_v');
        barriers.create(50, 300, 'blocker_h');
        barriers.create(750, 220, 'blocker_h');
        barriers.create(300, 400, 'blocker_h');

        houses = this.physics.add.staticGroup();
        houses.create(400, 500, 'house1').setScale(0.5).refreshBody();
        houses.create(100, 200, 'house2').setScale(0.5).refreshBody();
        houses.create(700, 100, 'house3').setScale(0.5).refreshBody();

        letterboxes = this.physics.add.group();

        letterbox1 = this.physics.add.sprite(400, 550, 'letterbox').setScale(0.5).refreshBody();
        letterbox2 = this.physics.add.sprite(100, 250, 'letterbox').setScale(0.5).refreshBody();
        letterbox3 = this.physics.add.sprite(700, 150, 'letterbox').setScale(0.5).refreshBody();

        letterbox1.name="letterbox1"
        letterbox2.name="letterbox2"
        letterbox3.name="letterbox3"
        // letterboxes.create(400, 550, 'letterbox').setScale(0.5).refreshBody();
        // letterboxes.create(100, 250, 'letterbox').setScale(0.5).refreshBody();
        // letterboxes.create(700, 150, 'letterbox').setScale(0.5).refreshBody();

        letter1 = this.physics.add.sprite(650,520, 'letter1')
        letter2 = this.physics.add.sprite(650,520, 'letter2').setAlpha(0)
        letter3 = this.physics.add.image(650,520, 'letter3').setAlpha(0)

        // stars = this.physics.add.staticGroup();
        // stars.create(100, 300, 'star')
        // stars.create(200, 400, 'star')
        // stars.create(300, 300, 'star')
        // stars.create(400, 400, 'star')
        // stars.create(500, 300, 'star')
        // stars.create(600, 400, 'star')
        // stars.create(700, 300, 'star')

        player = this.physics.add.sprite(400, 50, 'postalworker');
        player.setBounce(0);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('postalworker', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'postalworker', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('postalworker', { start: 13, end: 16 }),
            frameRate: 10
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('postalworker', { start: 9, end: 12 }),
            frameRate: 10
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('postalworker', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // player.play('turn', true)

        cursors = this.input.keyboard.createCursorKeys();

        lettertallyText = this.add.text(16, 16, 'DELIVER THE LETTERS TO THE CORRECT HOUSE', { fontSize: '32px', fill: '#fff' });
        message = this.add.text(16, 56, '', { fontSize: '32px', fill: '#fff' });

        this.physics.add.collider(player, barriers);

        this.physics.add.overlap(player, letterbox1, deliverLetter, null, this);
        this.physics.add.overlap(player, letterbox2, deliverLetter, null, this);
        this.physics.add.overlap(player, letterbox3, deliverLetter, null, this);









    }

    function update ()
    {

//// MOVEMENT ///////

// This makes the arrow keys work
if(justClicked == false){
    if (cursors.left.isDown)
    {
        player.setVelocityX(-80);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(80);
        player.anims.play('right', true);
    }
    else if (cursors.up.isDown)
    {
        player.setVelocityY(-80);
        player.anims.play('up', true);
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(80);
        player.anims.play('down', true);
    }
    else
    {
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('turn');
    }
}


// This moves the player instantly to the pointer

    if(!this.input.activePointer.isDown && isClicking == true) {
        justClicked = true
        justClickedX = true
        justClickedY = true
        player.setData("positionY", this.input.activePointer.position.y);
        player.setData("positionX", this.input.activePointer.position.x);
        isClicking = false;
        cancelTravelDirection()
        
        
        

    } else if(this.input.activePointer.isDown && isClicking == false) {
        isClicking = true;
    }

    movePlayerToPointer()
    function movePlayerToPointer(){
        if(justClicked==true){
            console.log(justClicked)
            showTravelAnimation()
            if(Math.abs(player.x - player.getData("positionX")) <= 10 ) {
                player.x = player.getData("positionX");
                isStandingStill = true
                justClickedX = false
            } else if(player.x < player.getData("positionX")) {
                player.x += 2;
                isTravellingRight = true
            } else if(player.x > player.getData("positionX")) {
                player.x -= 2;
                isTravellingLeft = true
                console.log(player.getData("positionY"))
                console.log(player.y)
            }
            if(Math.abs(player.y - player.getData("positionY")) <= 10) {
                player.y = player.getData("positionY");
                isStandingStill = true
                justClickedY = false
            } else if(player.y < player.getData("positionY")) {
                player.y += 2; 
                isTravellingDown = true
            } else if(player.y > player.getData("positionY")) {
                player.y -= 2;
                isTravellingUp = true
            } 

            if(justClickedX == false && justClickedY == false){
                justClicked = false
            }
        }
    

        
    }

    function cancelTravelDirection(){
        isTravellingLeft = false
        isTravellingRight = false
        isTravellingUp = false
        isTravellingDown = false
        isStandingStill = false
    }

    function showTravelAnimation(){
        console.log("TRAVEL ANIMATION ACTIVATED")
        if (isTravellingLeft == true)
        {
            player.anims.play('left', true);
            console.log("travelling left")
        }
        else 
        if (isTravellingRight == true)
        {
            player.anims.play('right', true);
            console.log("travelling right")
        }
        else if (isTravellingUp == true)
        {
            player.anims.play('up', true);
            console.log("travelling up")
        }
        else if (isTravellingDown == true)
        {
            player.anims.play('down', true);
            console.log("travelling down")
        }
        else
        {
            player.anims.play('turn');
        }
    }








    }
    

    function deliverLetter(player, letterbox){
        
                   
            console.log('letterbox.name: '+ letterbox.name)
            console.log('currentletter: '+ currentLetter)
            if( letterbox.name == currentLetter){
                this.tweens.add({
                    targets: letterbox, 
                    duration: 200, 
                    scaleX: 0.95, 
                    scaleY: 0.95, 
                    yoyo: true, 
                });
                this.tweens.add({
                    targets: player, // on the player 
                    duration: 200, // for 200ms 
                    scaleX: 1.15, 
                    scaleY: 1.15,
                    yoyo: true, // at the end, go back to original scale 
                });
                
                lettertally -= 1;
                message.setText('Well Done! You delivered a letter!')
                congratulationsMessageRead = false
                timedHideMessage = this.time.addEvent({ delay: 2000, callback: hideMessage, callbackScope: this });
                timedCongratulationsRead = this.time.addEvent({ delay: 3000, callback: turnCongratulationsTrue, callbackScope: this });

                
                // lettertallyText.setText('Letters remaining: ' + lettertally);
                
                if(letterbox.name=='letterbox1'){
                    letter1.setAlpha(0)
                    letter2.setAlpha(1)
                    currentLetter = 'letterbox2'
                    isLetter1Delivered = true
                } else if (letterbox.name=='letterbox2'){
                    letter2.setAlpha(0)
                    letter3.setAlpha(1)
                    currentLetter = 'letterbox3'
                    isLetter2Delivered = true
                } else if (letterbox.name=='letterbox3'){
                    letter3.setAlpha(0)
                    message.setText('TASK COMPLETE')
                    isLetter3Delivered = true
                }
    
            } else {
                if(congratulationsMessageRead == true){
                    message.setText("OOPS! That's " + letterbox.name)
                }
                
                timedHideMessage = this.time.addEvent({ delay: 2000, callback: hideMessage, callbackScope: this });

                this.tweens.add({
                    targets: letterbox, 
                    duration: 200, 
                    scaleX: 0.65, 
                    scaleY: 0.65, 
                    yoyo: true, 
                });
                this.tweens.add({
                    targets: player, // on the player 
                    duration: 200, // for 200ms 
                    scaleX: 1.05, 
                    scaleY: 1.05,
                    yoyo: true, // at the end, go back to original scale 
                });




            }
            
                letterbox.body.enable = false
                // this enables the letterboxes once the player has moved away


                setTimeout(() => {
                    letterbox.body.enable = true
                    if(letterbox.name=='letterbox1' && isLetter1Delivered == true){
                        console.log("LETTER 1 DELIVERED")
                    } else if (letterbox.name=='letterbox2' && isLetter2Delivered == true){
                        console.log("LETTER 2 DELIVERED")
                    } else if (letterbox.name=='letterbox3' && isLetter3Delivered == true){
                        console.log("LETTER 3 DELIVERED")
                    }
                }, 500);
                        
    }

    function hideMessage(){
        message.setText('')
    }


    function turnCongratulationsTrue()
        {congratulationsMessageRead = true}
    