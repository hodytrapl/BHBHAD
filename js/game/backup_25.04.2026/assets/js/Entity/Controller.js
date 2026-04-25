//класс который позволяет контролировать кем-то
class Controller{
    constructor(entity,binds){ //конструктор где мы получаем сущность над которой имеем власть и бинды с которыми мы им управляем
        this.entity=entity;
        this.binds = binds;

        //базовые значения (лучше вывести их в отдельный файл настроек игры)
        this.gravity=0.5;
        this.jumpForce=10;
        this.walkSpeed = 5;        // скорость при ходьбе
        this.runSpeed = 10;        // скорость при беге
        this.currentSpeed = 0; // текущая реальная скорость


        //добавляем значения в бинды
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

    //передвигаем объект на определенные кординаты
    update(boundsWidth, boundsHeight) {
        const isRunning=this.keysPressed[this.binds.playerControllerRun];
        this.currentSpeed=0;
        const grounded = this.entity.onIsGrounded(boundsHeight);
        if (this.keysPressed[this.binds.playerControllerRight]) {
            this.currentSpeed = isRunning ? this.runSpeed : this.walkSpeed;
        } else if (this.keysPressed[this.binds.playerControllerLeft]) {
            this.currentSpeed = isRunning ? -this.runSpeed : -this.walkSpeed;
        }      

        if (this.keysPressed[this.binds.playerControllerJump] && grounded) {
            this.entity.velocityY = -this.jumpForce;
        }
        this.entity.move(this.currentSpeed,boundsWidth, boundsHeight,this.gravity);

        //this.data()
    }

    data(){
        console.log(`
            controller:\n
            entity:%o\n
            binds:%o\n
            gravity:%f\n
            jumpForce:%f\n
            walkSpeed:%d\n
            runSpeed:%d\n
            currentSpeed:%f\n
            keysPressed:%o\n
            `
            ,this.entity,this.binds,this.gravity,this.jumpForce,this.walkSpeed,this.runSpeed,
            this.currentSpeed,
            this.keysPressed
        )
    }
    
}
console.log("controller Loaded")