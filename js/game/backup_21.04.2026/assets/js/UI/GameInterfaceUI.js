console.log("GameInterface loaded")
class GameInterafaceUI {
    constructor(points=0,points_requiments=100,points_missed=0,color='white'){
        this.points=points
        this.points_requiments=points_requiments
        this.points_missed=points_missed
        this.color=color
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.font = "48px serif";
        let msg=`[${this.points} \\ ${this.points_requiments}] Missed: ${this.points_missed}`
        ctx.fillText(msg, 10, 50);
    }

    setPoints(points){
        this.points=points
    }
    setPointMissed(points_missed){
        this.points_missed=points_missed
    }
}
console.log("GameInterface ended")