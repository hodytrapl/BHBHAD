console.log("init Loaded")
$(document).ready(async function() {
    //создаем канвас
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    //settings - загрузка настроек управление(пользователь сам решает какие бинды ставить)
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

    //инициализация
    let settings, methods, player, init_another_entity, pointAI, pointsUI, winUI;
    let entites=[];
    let pointAIEntities=[];
    let hideEntity = false; 
    let spawnTimeout = 0; // отслеживает тайм-аут
    const spawnInterval = 60;

    async function initObjects() {
        // Загружаем настройки только один раз
        if (!settings) {
            settings = await loadSettings();
        }
        methods= new Methods()
        // Пересоздаем объекты
        player = new Entity(canvas.width/2 -50, canvas.height -25, 50);
        controller = new Controller(player, settings.binds);
        entites=[];
        pointAIEntities=[];
        pointsUI = new PointsUI(0,10,0);
        winUI = new WinUI();
    }

    //инициализация объектов и изменение окна под канвас
    window.addEventListener('resize', resizeCanvas);
    await initObjects();
    resizeCanvas();
    
    //отрисовка объектов в канвасе
    function draw() {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw(ctx);

        if(pointsUI.getPoints()<pointsUI.getPointsReq()){
            if(spawnTimeout<=0){
                const newEntity = new Entity(methods.randomInt((canvas.width)-20), -100, 20,'red');
                entites.push(newEntity)
                const newPointAI = new PointAI(newEntity, player);
                pointAIEntities.push(newPointAI);
                spawnTimeout = spawnInterval;
            }else{
                spawnTimeout--;
            }
            
        }

        for(let entity of entites){
            entity.draw(ctx);
            entity.move(0,canvas.width, canvas.height,0.02);
            if (entity.y > canvas.height + 20) {
                entities.splice(entities.indexOf(entity), 1);
            }
        }

        for (let ai of pointAIEntities) {
            if (ai.logic(pointsUI, canvas.height)) {
                hideEntity = true;
                break; 
            }
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