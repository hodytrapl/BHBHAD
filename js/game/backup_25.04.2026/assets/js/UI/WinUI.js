class WinUI{
    constructor(color="white"){//окно выигрыша
        this.color=color
    }

    draw(ctx, boundsWidth,boundsHeight){//орисовка по центру экрана
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, boundsWidth, boundsHeight);
        ctx.fillStyle = this.color;
        ctx.font = "48px serif";
        let msg=`You Win!`
        const textWidth = ctx.measureText(msg).width;
        const x = (boundsWidth - textWidth) / 2;
        const y = boundsHeight / 2;
        ctx.fillText(msg, x, y);
    }
}
console.log("WinUI loaded")