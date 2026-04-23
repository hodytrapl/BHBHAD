console.log("init Loaded")
$(document).ready(async function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    //settings - загрузка
    async function loadSettings() {
        const response = await fetch('./assets/settings/settings.json');
        return await response.json();
    }

    // Подгонка размеров канваса под окно
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initObjects();
    }

    let settings,methods, player, init_another_entity, pointAI, pointsUI, winUI;
    let hideEntity = false; 

    async function initObjects() {
        // Загружаем настройки только один раз
        if (!settings) {
            settings = await loadSettings();
        }
        methods= new Methods()
        // Пересоздаем объекты
        player = new Entity(canvas.width/2 -50, canvas.height -25, 50);
        init_another_entity = new Entity(methods.randomInt((canvas.width)-20), -100, 20,'red');
        pointAI = new PointAI(init_another_entity,player);
        controller = new Controller(player, settings.binds);
        pointsUI = new PointsUI(0,10,0);
        winUI = new WinUI();
    }

    window.addEventListener('resize', resizeCanvas);
    await initObjects();
    resizeCanvas();
                
    function draw() {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw(ctx);

        if(pointAI.logic(pointsUI,canvas.height)){
            hideEntity=true;
        }
        if(!hideEntity){
            init_another_entity.draw(ctx);
            init_another_entity.move(0,canvas.width, canvas.height,0.02);
        }
        

        pointsUI.draw(ctx);     
        if(pointsUI.getPoints()>=pointsUI.getPointsReq()){
            winUI.draw(ctx,canvas.width,canvas.height);  
        }
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