console.log("init Loaded")
$(document).ready(async function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    //settings - загрузка
    async function loadSettings() {
        const response = await fetch('./assets/settings/settings.json');
        return await response.json();
    }

    const settings = await loadSettings();

    let player = new Entity(100, 800, 50);
    let init_another_entity = new Entity(0, 0, 20,'red');
    let pointAI = new PointAI(init_another_entity,player)
    let controller = new Controller(player, settings.binds);
    let gameInterafaceUI=new GameInterafaceUI(0,10,0)

    // Подгонка размеров канваса под окно
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw();
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
                
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw(ctx);
        init_another_entity.draw(ctx);
        init_another_entity.move(0,canvas.width, canvas.height,0.08);
        gameInterafaceUI.draw(ctx);
        console.log(pointAI.logic())
    }
    // Основной цикл
    function gameLoop() {
        controller.update(canvas.width, canvas.height);
        draw();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
console.log("init Ended")