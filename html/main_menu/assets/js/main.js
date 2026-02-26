const burger = document.querySelector(".burger")
// document - команда с помощью которой мы заходим в код HTML
// т. е. на страницу
// querySelector - дословный перевод query - запрос
// Selector - искатель
// запрос на выборку, на поиск, конкретного элемента на странице
// т.е. этот метод ищет на странице элемент
// который мы укажем в скобках
// я ищу div с классом burger, поэтому поставила .
burger.addEventListener('click', function () {
    // тут мы пишем нашу реакцию на клик, т.е что 
    // произойдет после клика
    const menu = document.querySelector('header nav')
    if (menu.style.opacity === "1") {
        menu.style.opacity = "0"
        menu.style.visibility = "hidden"
        
        burger.classList.remove('active')
    }
    else {
        menu.style.opacity = "1"  
        menu.style.visibility = "visible" 
        burger.classList.add('active')
    }
})
// на какой элемент надо кликнуть - burger
// ставлю точку
// вызываю метод addEventListener, к-ый следит за всеми событиями
// происходящими на сайте
// в скобках указывается нужное событие - клик на бургер меню
const sublink = document.querySelectorAll('.sub-link')
sublink.forEach(arrow => {
    const arrowimg = arrow.querySelector('img')
    arrow.addEventListener('click', function(e) {
        const parent = this.parentNode
        const submenu = parent.querySelector('.sub-menu')
        if (!(submenu.style.opacity === "1")) {
        arrowimg.style.transform = "rotate(180deg)"
        submenu.style.opacity = "1"
        submenu.style.visibility = "visible"
        submenu.style.display="block"
        submenu.style.display="flex"
        
        } 
        else {
            arrowimg.style.transform = "rotate(0deg)"
            submenu.style.opacity = "0"
            submenu.style.visibility = "hidden"
            submenu.style.display="none"
        }
        e.preventDefault()
    })
})

function closeALLMenus(){
    const menus=document.querySelectorAll(".sub-menu")
    menus.forEach(m=>{
        m.style.display="none"
        m.style.opacity = "0"
        m.style.visibility="hidden"
    })
    const arrows=document.querySelectorAll('sub-link img')
    arrows.forEach(a=>{
        a.style.transform="rotate(0deg)"
    })

}

document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
        closeALLMenus()
    }
})

document.addEventListener('click',function(e){
    if(!e.target.closest('.menu-item')){
        closeALLMenus()
    }
})