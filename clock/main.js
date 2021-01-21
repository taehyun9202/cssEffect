const hour = document.querySelector('.hour')
const minute = document.querySelector('.minute')
const second = document.querySelector('.second')



setInterval(() => {
    var day = new Date();
    var hh = day.getHours() * 30;
    var mm = day.getMinutes() * 6;
    var ss = day.getSeconds() * 6;

    console.log(day)
    console.log(day.getHours())
    console.log(day.getMinutes())
    console.log(day.getSeconds())
    hour.style.transform = `rotate(${(hh) + (mm/12)}deg)`;
    minute.style.transform = `rotate(${mm}deg)`;
    second.style.transform = `rotate(${ss}deg)`;

}, 1000)


console.log(hour, minute, second)