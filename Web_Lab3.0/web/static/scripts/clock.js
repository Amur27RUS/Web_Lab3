beginTime();
function beginTime() {
    let container = document.getElementById("time-container");
    changeTime(container);
    setInterval(()=>changeTime(container), 12000)
}
//ДИНАМИЧЕСКИЕ ЧАСЫ НА СТАРТОВОЙ СТРАНИЦЕ
function changeTime(container) {
    let date = new Date();
    let hours = date.getHours();
    hours = hours<10 ? "0"+hours : hours;
    let minutes = date.getMinutes();
    minutes = minutes<10 ? "0"+minutes : minutes;
    let seconds = date.getSeconds();
    seconds = seconds<10 ? "0"+seconds : seconds;
    container.innerHTML = `<h3>${hours}:${minutes}:${seconds}</h3>`
}