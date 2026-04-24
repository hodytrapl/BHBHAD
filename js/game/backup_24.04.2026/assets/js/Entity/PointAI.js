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
        if(this.entity.getX()>=this.player.getX() && this.entity.getY()>=this.player.getY() && !this.isWorked){
            PointsUI.addPoints(1)
            this.isWorked=true
            return true;
        }
        if(this.entity.getY()+ this.entity.size>=boundsHeight && !this.isWorked){
            PointsUI.addPointMissed(1)
            this.isWorked=true
            return true;
        }
        return false;
    }
}