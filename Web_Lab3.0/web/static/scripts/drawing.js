let canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
canvas.addEventListener("click", handleCanvasClick);
let xCanvas = document.getElementById("canvas-form:xCanvas");
let yCanvas = document.getElementById("canvas-form:yCanvas");
let counter;
let RErr = document.getElementById("RErr");
let table = document.getElementById("table-form:result-table").childNodes[3];
var radius;
let ii = 0;

let rCheck = false;

function onRChange(event) {
    clearCanvas();
    radius = Number(event.target.value);
    localStorage.setItem("R", radius);
    drawAxis();
    drawFigures(radius);
    drawPointsFromTable();
}

function handleSubmit() {
    clearCanvas();
    drawAxis();
    drawFigures(radius);
    drawResize();
    setrCheckTRUE();
}

function setrCheckTRUE() {
    rCheck = true;
}

function handleCanvasClick(event) {
    // if (rCheck) {
    let i = 25;
    let color;
    let obj = event.target;
    let x = Number(((event.pageX - window.pageXOffset - obj.getBoundingClientRect().x - obj.width / 2) / i).toFixed(2));
    let y = Number((-(event.pageY - window.pageYOffset - obj.getBoundingClientRect().y - obj.height / 2) / i).toFixed(2));
    let r = localStorage.getItem("R");
    if (r === null) {

    }else{
        if (((x <= 0 && y >= 0 && x >= -r && y <= r / 2) || (x >= 0 && y <= 0
            && x * x + y * y <= r / 2 * r / 2) ||
            (x >= 0 && y >= 0 && y <= (r - x * 2)))) {
            color = "lime";
            xCanvas.value = x;
            yCanvas.value = y;
            drawDot(x, y, color);
            checkCanvas();
        } else {
            color = "red";
            xCanvas.value = x;
            yCanvas.value = y;
            drawDot(x, y, color);
            checkCanvas();
        }

    }

    // }
}
function drawResize() {
    table = document.getElementById("table-form:result-table").childNodes[3];
    counter = 0;
    drawStep();
}

function drawStep() {
    console.log(counter);
    if (counter < table.children.length){
        let row = table.children[counter];
        if(!row.children[0].innerText) return;
        let x = Number(row.children[0].innerText);
        let y = Number(row.children[1].innerText);
        xCanvas.value = x;
        yCanvas.value = y;
        counter++;
    }
}

function drawDot(x, y, color) {
    let i = 25;
    context.fillStyle = color;
    context.beginPath();
    context.arc(canvas.width/2+x*i,canvas.height/2-y*i,2,0,Math.PI*2, true);
    context.fill();
}

function isPointInArea(x,y,r) {
    return (((x <= 0 && y >= 0 && x >= -r && y <= r / 2) || (x >= 0 && y <= 0
        && x * x + y * y <= r / 2 * r / 2) ||
        (x >= 0 && y >= 0 && y <= (r - x * 2))));
}

//ОТРИСОВКА ОСЕЙ ГРАФИКА ПРИ ВХОДЕ НА СТРАНИЦУ
function drawAxis() {

    clearCanvas();

    //ОСИ
    context.beginPath();
    context.font = "10px Verdana";
    context.moveTo(150, 0); context.lineTo(150, 300);
    context.moveTo(150, 0); context.lineTo(145, 15);
    context.moveTo(150, 0); context.lineTo(155, 15);
    context.fillText("Y", 160, 10);
    context.moveTo(0, 150); context.lineTo(300, 150);
    context.moveTo(300, 150); context.lineTo(285, 145);
    context.moveTo(300, 150); context.lineTo(285, 155);
    context.fillText("X", 290, 135);

    // деления Y
    context.moveTo(145, 25); context.lineTo(155, 25); context.fillText("5", 160, 25);
    context.moveTo(145, 50); context.lineTo(155, 50); context.fillText("4", 160, 50);
    context.moveTo(145, 75); context.lineTo(155, 75); context.fillText("3", 160, 75);
    context.moveTo(145, 100); context.lineTo(155, 100); context.fillText("2", 160, 100);
    context.moveTo(145, 125); context.lineTo(155, 125); context.fillText("1", 160, 125);

    context.moveTo(145, 175); context.lineTo(155, 175); context.fillText("-1", 130, 180);
    context.moveTo(145, 200); context.lineTo(155, 200); context.fillText("-2", 130, 200);
    context.moveTo(145, 225); context.lineTo(155, 225); context.fillText("-3", 130, 225);
    context.moveTo(145, 250); context.lineTo(155, 250); context.fillText("-4", 130, 250);
    context.moveTo(145, 275); context.lineTo(155, 275); context.fillText("-5", 130, 275);

    // деления X
    context.moveTo(25, 145); context.lineTo(25, 155); context.fillText("-5", 25, 170);
    context.moveTo(50, 145); context.lineTo(50, 155); context.fillText("-4", 50, 170);
    context.moveTo(75, 145); context.lineTo(75, 155); context.fillText("-3", 75, 170);
    context.moveTo(100, 145); context.lineTo(100, 155); context.fillText("-2", 100, 170);
    context.moveTo(125, 145); context.lineTo(125, 155); context.fillText("-1", 125, 170);

    context.moveTo(175, 145); context.lineTo(175, 155); context.fillText("1", 175, 170);
    context.moveTo(200, 145); context.lineTo(200, 155); context.fillText("2", 200, 170);
    context.moveTo(225, 145); context.lineTo(225, 155); context.fillText("3", 225, 170);
    context.moveTo(250, 145); context.lineTo(250, 155); context.fillText("4", 250, 170);
    context.moveTo(275, 145); context.lineTo(275, 155); context.fillText("5", 275, 170);

    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.stroke();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

//ОТРИСОВКА ФИГУР НА ГРАФИКЕ, ЕСЛИ ВВЕДЁН R
function drawFigures(radius) {

    let rPix = radius * 25;
    let r2Pix = rPix / 2;

    if (radius >= 1 && radius <= 4) {

        context.clearRect(0, 0, canvas.width, canvas.height);

        //ПРЯМОУГОЛЬНИК
        context.beginPath();
        context.rect(150 - rPix, 150 - r2Pix, rPix, r2Pix);
        context.closePath();
        context.strokeStyle = "blue";
        context.fillStyle = "blue";
        context.fill();
        context.stroke();

        //СЕКТОР
        context.beginPath();
        context.moveTo(150, 150);
        context.arc(150, 150, r2Pix, (5 * Math.PI) / 2, 2 * Math.PI, true);
        context.closePath();
        context.strokeStyle = "blue";
        context.fillStyle = "blue";
        context.fill();
        context.stroke();

        //ТРЕУГОЛЬНИК
        context.beginPath();
        context.moveTo(150, 150);
        context.lineTo(150, 150 - rPix);
        context.lineTo(150 + r2Pix, 150);
        context.lineTo(150, 150);
        context.closePath();
        context.strokeStyle = "blue";
        context.fillStyle = "blue";
        context.fill();
        context.stroke();

        //ОСИ
        context.beginPath();
        context.font = "10px Verdana";
        context.moveTo(150, 0);
        context.lineTo(150, 300);
        context.moveTo(150, 0);
        context.lineTo(145, 15);
        context.moveTo(150, 0);
        context.lineTo(155, 15);
        context.fillText("Y", 160, 10);
        context.moveTo(0, 150);
        context.lineTo(300, 150);
        context.moveTo(300, 150);
        context.lineTo(285, 145);
        context.moveTo(300, 150);
        context.lineTo(285, 155);
        context.fillText("X", 290, 135);

        context.moveTo(145, 25); context.lineTo(155, 25); context.fillText("5", 160, 25);
        context.moveTo(145, 50); context.lineTo(155, 50); context.fillText("4", 160, 50);
        context.moveTo(145, 75); context.lineTo(155, 75); context.fillText("3", 160, 75);
        context.moveTo(145, 100); context.lineTo(155, 100); context.fillText("2", 160, 100);
        context.moveTo(145, 125); context.lineTo(155, 125); context.fillText("1", 160, 125);

        context.moveTo(145, 175); context.lineTo(155, 175); context.fillText("-1", 130, 180);
        context.moveTo(145, 200); context.lineTo(155, 200); context.fillText("-2", 130, 200);
        context.moveTo(145, 225); context.lineTo(155, 225); context.fillText("-3", 130, 225);
        context.moveTo(145, 250); context.lineTo(155, 250); context.fillText("-4", 130, 250);
        context.moveTo(145, 275); context.lineTo(155, 275); context.fillText("-5", 130, 275);

        // деления X
        context.moveTo(25, 145); context.lineTo(25, 155); context.fillText("-5", 25, 170);
        context.moveTo(50, 145); context.lineTo(50, 155); context.fillText("-4", 50, 170);
        context.moveTo(75, 145); context.lineTo(75, 155); context.fillText("-3", 75, 170);
        context.moveTo(100, 145); context.lineTo(100, 155); context.fillText("-2", 100, 170);
        context.moveTo(125, 145); context.lineTo(125, 155); context.fillText("-1", 125, 170);

        context.moveTo(175, 145); context.lineTo(175, 155); context.fillText("1", 175, 170);
        context.moveTo(200, 145); context.lineTo(200, 155); context.fillText("2", 200, 170);
        context.moveTo(225, 145); context.lineTo(225, 155); context.fillText("3", 225, 170);
        context.moveTo(250, 145); context.lineTo(250, 155); context.fillText("4", 250, 170);
        context.moveTo(275, 145); context.lineTo(275, 155); context.fillText("5", 275, 170);

        context.closePath();
        context.strokeStyle = "black";
        context.fillStyle = "black";
        context.stroke();


        //ЕСЛИ R ОЧИЩЕН, ТО УБИРАЮТСЯ И ФИГУРЫ
    }else if(radius === ""){
        context.clearRect(0, 0, canvas.width, canvas.height);

        //ПРЯМОУГОЛЬНИК
        context.beginPath();
        context.rect(150 - r2Pix, 150 - rPix, r2Pix, rPix);
        context.closePath();
        context.strokeStyle = "blue";
        context.fillStyle = "blue";
        context.fill();
        context.stroke();

        //СЕКТОР
        context.beginPath();
        context.moveTo(150, 150);
        context.arc(150, 150, r2Pix, (5 * Math.PI) / 2, 2 * Math.PI, true);
        context.closePath();
        context.strokeStyle = "blue";
        context.fillStyle = "blue";
        context.fill();
        context.stroke();

        //ТРЕУГОЛЬНИК
        context.beginPath();
        context.moveTo(150, 150);
        context.lineTo(150, 150 - r2Pix);
        context.lineTo(150 + r2Pix, 150);
        context.lineTo(150, 150);
        context.closePath();
        context.strokeStyle = "blue";
        context.fillStyle = "blue";
        context.fill();
        context.stroke();

        //ОСИ
        context.beginPath();
        context.font = "10px Verdana";
        context.moveTo(150, 0);
        context.lineTo(150, 300);
        context.moveTo(150, 0);
        context.lineTo(145, 15);
        context.moveTo(150, 0);
        context.lineTo(155, 15);
        context.fillText("Y", 160, 10);
        context.moveTo(0, 150);
        context.lineTo(300, 150);
        context.moveTo(300, 150);
        context.lineTo(285, 145);
        context.moveTo(300, 150);
        context.lineTo(285, 155);
        context.fillText("X", 290, 135);

        context.moveTo(145, 25); context.lineTo(155, 25); context.fillText("5", 160, 25);
        context.moveTo(145, 50); context.lineTo(155, 50); context.fillText("4", 160, 50);
        context.moveTo(145, 75); context.lineTo(155, 75); context.fillText("3", 160, 75);
        context.moveTo(145, 100); context.lineTo(155, 100); context.fillText("2", 160, 100);
        context.moveTo(145, 125); context.lineTo(155, 125); context.fillText("1", 160, 125);

        context.moveTo(145, 175); context.lineTo(155, 175); context.fillText("-1", 130, 180);
        context.moveTo(145, 200); context.lineTo(155, 200); context.fillText("-2", 130, 200);
        context.moveTo(145, 225); context.lineTo(155, 225); context.fillText("-3", 130, 225);
        context.moveTo(145, 250); context.lineTo(155, 250); context.fillText("-4", 130, 250);
        context.moveTo(145, 275); context.lineTo(155, 275); context.fillText("-5", 130, 275);

        // деления X
        context.moveTo(25, 145); context.lineTo(25, 155); context.fillText("-5", 25, 170);
        context.moveTo(50, 145); context.lineTo(50, 155); context.fillText("-4", 50, 170);
        context.moveTo(75, 145); context.lineTo(75, 155); context.fillText("-3", 75, 170);
        context.moveTo(100, 145); context.lineTo(100, 155); context.fillText("-2", 100, 170);
        context.moveTo(125, 145); context.lineTo(125, 155); context.fillText("-1", 125, 170);

        context.moveTo(175, 145); context.lineTo(175, 155); context.fillText("1", 175, 170);
        context.moveTo(200, 145); context.lineTo(200, 155); context.fillText("2", 200, 170);
        context.moveTo(225, 145); context.lineTo(225, 155); context.fillText("3", 225, 170);
        context.moveTo(250, 145); context.lineTo(250, 155); context.fillText("4", 250, 170);
        context.moveTo(275, 145); context.lineTo(275, 155); context.fillText("5", 275, 170);

        context.closePath();
        context.strokeStyle = "black";
        context.fillStyle = "black";
        context.stroke();

    }
}

//ОТРИСОВКА ТОЧЕК С ТАБЛИЦЫ
function drawPointsFromTable() {
    let table = document.getElementById("table-form:result-table").childNodes[3];
    for (let row of table.children) {
        ii += 1;
    }

    if (ii >= 1) {
        for (let row of table.children) {
            let x = Number(row.children[0].innerText);
            let y = Number(row.children[1].innerText);
            let ch = row.children[3].innerText;
            if ((ii >=1 && x !== 0 && y !== 0) || (ii>1)){
                if (Number(localStorage.getItem("R")) > 0 && Number(localStorage.getItem("R")) < 4) {
                    let r = localStorage.getItem("R");
                    drawDot(x, y, (((x <= 0 && y >= 0 && x >= -r && y <= r / 2) ||
                        (x >= 0 && y <= 0 && x * x + y * y <= r / 2 * r / 2) ||
                        (x >= 0 && y >= 0 && y <= (r - x * 2)))) ? "lime" : "red")
                } else {
                    drawDot(x, y, (((x <= 0 && y >= 0 && x >= -r && y <= r / 2) ||
                        (x >= 0 && y <= 0 && x * x + y * y <= r / 2 * r / 2) ||
                        (x >= 0 && y >= 0 && y <= (r - x * 2)))) ? "lime" : "red")
                }
            }

        }
    }
    ii = 0;
}


drawAxis();
drawResize();
drawFigures(localStorage.getItem("R"));
drawPointsFromTable();
// localStorage.clear();