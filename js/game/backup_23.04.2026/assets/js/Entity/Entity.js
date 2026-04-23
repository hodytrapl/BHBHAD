//класс существ
console.log("entity Loaded")
class Entity{
    constructor(x,y,size,color='blue'){//X,Y координата, size - размер хитбокса,
        this.x=x
        this.y=y
        this.size=size
        this.color=color 
        this.velocityY=0;
        this.isGrounded=false;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    move(dx,boundsWidth, boundsHeight,gravity) {
        //горизонт
        this.x += dx;

        //гравитация
        this.velocityY+=gravity
        this.y += this.velocityY;

        // проверка "земли" (нижняя граница)
        if (this.y + this.size >= boundsHeight) {
            this.y = boundsHeight - this.size;
            this.velocityY = 0;
        }

        // Ограничение по границам x
        this.x = Math.max(0, Math.min(this.x, boundsWidth - this.size));
    }
    onIsGrounded(boundsHeight){
        return this.y+ this.size >= boundsHeight
    }
    
    getY(){
        return this.y
    }
    getX(){
        return this.x
    }
}
console.log("entity Ended")