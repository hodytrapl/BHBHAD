//класс который позволяет контролировать кем-то
console.log("controller Loaded")
class Controller{
    constructor(entity,binds){
        this.entity=entity;
        this.binds = binds;

        this.gravity=0.5;
        this.jumpForce=10;
        this.moveSpeed = 5;
        this.keysPressed={}
        Object.values(this.binds).forEach(key=>{
            this.keysPressed[key]=false 
        })

        // Обработчики событий
        document.addEventListener('keydown', (e) => {
            if (e.code in this.keysPressed) {
                this.keysPressed[e.code] = true;
            }
        });
        document.addEventListener('keyup', (e) => {
            if (e.code in this.keysPressed) {
                this.keysPressed[e.code] = false;
            }
        });
    }

    update(boundsWidth, boundsHeight) {
        let dx = 0;
        if (this.keysPressed[this.binds.playerControllerLeft]) dx -= this.moveSpeed;
        if (this.keysPressed[this.binds.playerControllerRight]) dx += this.moveSpeed;
        if (this.keysPressed[this.binds.playerControllerJump] && this.entity.onIsGrounded(boundsHeight)) {
            this.entity.velocityY = -this.jumpForce;
        }

        this.entity.move(dx,boundsWidth, boundsHeight,this.gravity);
    }
    
}

console.log("controller ended")