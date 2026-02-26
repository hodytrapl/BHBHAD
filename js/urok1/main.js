let capacity = prompt("Enter capacity water tank:","")
let procent_leaks = 0.1
let days=0;
for(let i=0; i<capacity; i+=capacity*procent_leaks){
    days++;
    //debug
    console.log(capacity-i + " - осталось количества воды");
}

console.log(days + " дедлайна, до истечения кол-ва воды")

days=0;
while(capacity>10){
    capacity=capacity*0.9;
    days++;
}

console.log(days + " дедлайна, до истечения кол-ва воды")