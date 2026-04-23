class WinUI{
    constructor(color="white"){
        this.color=color
    }

    draw(ctx, boundsWidth,boundsHeight){
        ctx.fillStyle = this.color;
        ctx.font = "48px serif";
        let msg=`You Win!`
        const textWidth = ctx.measureText(msg).width;
        const x = (boundsWidth - textWidth) / 2;
        const y = boundsHeight / 2;
        ctx.fillText(msg, x, y);
    }
}