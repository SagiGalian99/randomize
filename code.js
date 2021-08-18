canvas = document.getElementById("canvas")
ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

var Ids = ["one","two","three","four","five","six","seven","eight","nine","ten"]
let howManyTextBoxAvailble = 1;
function btnAdd(){
    if (howManyTextBoxAvailble < 10){
        howManyTextBoxAvailble++;
        for (let i = 1; i <= howManyTextBoxAvailble; i++){
            document.getElementById(Ids[i - 1]).style.display = 'block';
        }
    }
}
function btnDistract(){
    if (howManyTextBoxAvailble > 1){
        howManyTextBoxAvailble--;
        document.getElementById(Ids[howManyTextBoxAvailble - 1]).style.display = 'none';
    }
}

var values = [];
class button{
    constructor(x, y, w, h, color, afterColor, text){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.color = color;
        this.colorOriginal = color;
        this.afterColor = afterColor;
        this.clicked = false;
        this.finished = false;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "black"
        ctx.font = "60px Arial";
        ctx.fillText(this.text, this.x + 50, this.y + 60);    
    }
    onClick(xm, ym){
        if(xm > this.x && xm < this.x + this.w){
            if(ym > this.y && ym < this.y + this.h){
                if(this.text == "Roll"){
                    drawCanavas();
                    this.clicked = true;
                    values = [];
                    for(let i = 0; i < howManyTextBoxAvailble; i++){
                        values.push(document.getElementById(Ids[i]).value)
                    }
                    rotateCanvas()
                }        
            }
        }
    }
}

const mouse = {
    x : undefined,
    y : undefined,
}

ctx.beginPath();
ctx.moveTo(500, 0);
ctx.lineTo(500, 500);
ctx.closePath();
ctx.stroke();

colors = ["blue","red","green","yellow","cyan","purple","orange","pink"];
canvasRectsForRoll = [];
function drawCanavas(){
    canvasRectsForRoll = [];
    xh = 0;
    yh = 0;
    wh = 500;
    hh = 500 / howManyTextBoxAvailble;
    for (let i = 0; i < howManyTextBoxAvailble; i++){
        canvasRectsForRoll.push(new button(xh, yh, wh, hh, colors[Math.floor(Math.random() * colors.length)], "",document.getElementById(Ids[i]).value))
        yh += hh;
    }
}  
var onetime = true;
function rotateCanvas(){
    if (onetime){
        xhh = 0;
        whh = 500;
        hhh = 500;
        for (let i = 0; i < canvasRectsForRoll.length; i++){
            canvasRectsForRoll[i].y = 0;
            canvasRectsForRoll[i].h = hhh;
        }
    }
} 
function reset(){
    vel = 10;
    frames = 0;
    front = 0;
    untilWhenRolette = Math.random() * 400 + 100;
}
reset()
btnRoll = new button(canvas.width - 250, canvas.height - 450, 200, 100, "rgba(200,40,40)", "blue", "Roll")
function main(){
    if(btnRoll.finished == false){
        if(btnRoll.clicked){
            frames++;
        }
        if (frames % vel == 0){
            if (front < canvasRectsForRoll.length - 1){
                ctx.clearRect(0,0,500,500);
                front++;
            }
            else{
                ctx.clearRect(0,0,500,500);
                front = 0;
            }
        }
    }
    
    //ctx.clearRect(0,0,500,500);
    btnRoll.draw();
    if (btnRoll.clicked == false){
        //for(let i = 0; i < canvasRectsForRoll.length; i++){
           // canvasRectsForRoll[i].draw()
        //}
    }
    if (frames >= untilWhenRolette){
        btnRoll.clicked = false;
        btnRoll.finished = true;
    }
    if(btnRoll.clicked  && frames < untilWhenRolette){
        canvasRectsForRoll[front].draw();
    }
    if (frames >= untilWhenRolette){
        canvasRectsForRoll[front].draw()
    }
    requestAnimationFrame(main);
}
main();

// ------------------> events listeneres
window.addEventListener("mousemove", function(e){
    var rect = canvas.getBoundingClientRect();
    
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top

})
window.addEventListener("mousedown", function(e){
    btnRoll.onClick(mouse.x, mouse.y);
    if(btnRoll.clicked){
        reset();
        drawCanavas();
        rotateCanvas();
        btnRoll.finished = false;
    }
})