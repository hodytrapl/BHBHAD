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
    let spawnTimeout = 0; // отслеживает тайм-аут
    let gameRunning=true;
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
    async function draw() {
        
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
        }

        for (let i = pointAIEntities.length - 1; i >= 0; i--) {
            const ai = pointAIEntities[i];
            if (ai.logic(pointsUI, canvas.height)) {
                await methods.sleep(100)
                pointAIEntities.splice(i, 1);
                entites.splice(i, 1);
                break;
            }
        }
        

        pointsUI.draw(ctx);     
        if(pointsUI.getPoints()>=pointsUI.getPointsReq()){
            winUI.draw(ctx,canvas.width,canvas.height);
            gameRunning=false;
        }
    }
    // Основной цикл
    function gameLoop() {
        if(!gameRunning)return;
        controller.update(canvas.width, canvas.height);
        draw();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
console.log("init Loaded")