//класс points - очко падает сверху и ты его подбираешь, иначе в миссед
class PointAI{
    constructor(entity,player){
        this.entity=entity
        this.player=player
    }

    logic(){
        if(this.entity.getX()>=this.player.getX() && this.entity.getY()>=this.player.getY()){
            return true;
        }
        return false;
    }
}