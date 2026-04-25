class PointsUI {
    constructor(points=0,points_requiments=100,points_missed=0,color='white'){
        // интерфейс очков
        this.points=points
        this.points_requiments=points_requiments
        this.points_missed=points_missed
        this.color=color
    }

    draw(ctx){//отрисовка текста
        ctx.fillStyle = this.color;
        ctx.font = "48px serif";
        let msg=`[${this.points} \\ ${this.points_requiments}] Missed: ${this.points_missed}`
        ctx.fillText(msg, 10, 50);
    }

    // crud

    setPoints(points){
        this.points=points
    }
    getPoints(){
        return this.points
    }
    addPoints(amount){
        this.points+=amount;
    }

    setPointMissed(points_missed){
        this.points_missed=points_missed
    }
    getPointMissed(){
        return this.points_missed
    }
    addPointMissed(amount){
        this.points_missed+=amount;
    }

    setPointsReq(points_requiments){
        this.points_requiments=points_requiments
    }
    getPointsReq(){
        return this.points_requiments
    }
    addPointsReq(amount){
        this.points_requiments+=amount;
    }
}
console.log("PointsUI loaded")