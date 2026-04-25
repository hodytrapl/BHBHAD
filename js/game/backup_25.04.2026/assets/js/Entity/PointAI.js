//класс points - очко падает сверху и ты его подбираешь, иначе в миссед
class PointAI{
    constructor(entity,player){//интеллект точек, берем энтити у которой будет интелект и игрока
        this.entity=entity
        this.player=player
        this.isWorked = false;
    }

    logic(PointsUI,boundsHeight){//простая логика
        /* условия, если хитбокс игрока(координаты) одинаковы, добавляем очко
        иначе добавляем в пропуск */

        if(this.checkCollision()){
            if (!this.isWorked&&!this.checkIsFloor(boundsHeight)) {
                // Поднимаем очко
                this.isWorked = true;
                this.entity.setColor("lime")
                PointsUI.addPoints(1)
                return true
            }else if(this.checkIsFloor(boundsHeight)){
                if (!this.isWorked) {
                    this.isWorked = true;
                    this.entity.setColor("black");
                    PointsUI.addPointMissed(1);
                    return true
                }
            }
        }
        return false;
    }

    checkCollision() {
        const entityX = this.entity.getX();
        const entityY = this.entity.getY();

        const playerX = this.player.getX();
        const playerY = this.player.getY();
        const size = this.entity.size;

        // Проверка столкновения по bounding box
        const collideX = entityX < playerX + this.player.size &&
                         entityX + size > playerX;
        const collideY = entityY < playerY + this.player.size &&
                         entityY + size > playerY;
        return collideX && collideY;
    }
    checkIsFloor(boundsHeight){
        const entityY = this.entity.getY();
        return entityY+this.entity.size>=boundsHeight
    }
}
console.log("PointAI loaded")