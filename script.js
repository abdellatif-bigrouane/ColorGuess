//copyrighting footer
const copyright = document.querySelector('.copyright');
copyright.innerHTML = "Created by Abdellatif BIGROUANE | Copyright © " + (new Date()).getFullYear();

//page-load
addEventListener('load', ()=>{
    document.querySelector('.page-load').remove();
});

let rd = 1;
let score = 0;
var interval = 255;

function endGame(){
    if(rd>20)
    {
        document.querySelector('main').style.filter = 'blur(6px)';
        document.querySelector('.end').style.display = 'flex';

        clearInterval(loopMain);
    }
}

//function main 
function main(){
    endGame();

    //random color
    const colorBtn = document.querySelectorAll('.col-4');
    const colorMain = document.getElementById('color');

    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*255);

    interval -= 12;

    colorBtn[0].style.backgroundColor = rgbColor(r,g,b);

    for(var i=1 ; i<8 ; i++){
        var rr = inInterval(r,Math.floor(Math.random()*interval));
        var gg = inInterval(g,Math.floor(Math.random()*interval));
        var bb = inInterval(b,Math.floor(Math.random()*interval));

        for(var j=0 ; j<i ; j++)
        {
            if(colorBtn[j].style.backgroundColor != rgbColor(rr,gg,bb))
            colorBtn[i].style.backgroundColor = rgbColor(rr,gg,bb);  
            else
            {
                rr = inInterval(r,Math.floor(Math.random()*interval));
                gg = inInterval(g,Math.floor(Math.random()*interval));
                bb = inInterval(b,Math.floor(Math.random()*interval));
            }   
        }
    }

    //interval entre 0 et 255
    function inInterval(x,y){
        return (x+y>255) ? x+y-255 : x+y;
    }

    //format rgb(r,g,b)
    function rgbColor(x,y,z){
        return "rgb(" + x + "," + y + "," + z + ")";
    }
    colorMain.style.background = colorBtn[Math.floor(Math.random()*8)].style.backgroundColor;

    //timer
    const time = document.getElementById('time');
    var timer = 5;
    loopTimer = setInterval(() => {
        timer --;
        if(timer==0) 
            timer = 5;
        time.innerHTML =  timer;
    }, 1000);

    //round
    const round = document.getElementById('round');
    round.innerHTML = (rd++) + "/20"; 

    //score 
    function myScore(){
        if(score < 0) 
            score = 0;

        document.getElementById('score').innerHTML = score;
    }

    //click en color
    for(const el of colorBtn){
        el.addEventListener('click',() => {
            if(el.style.backgroundColor == colorMain.style.backgroundColor){
                //score 
                score+=10;
                myScore(); 
                endGame();

                cptLoopMain = 4000;
                clearInterval(loopMain);
                loopMain = setInterval(main, cptLoopMain);
    
                main();
            }else{
                score-=5;
                myScore();
            }
        });
    }
    let cptLoopMain = 5000;
} 

//change color evry 5s
var loopMain;
for(const el of document.querySelectorAll('#startbtn')){
    el.addEventListener('click',() => {
        document.querySelector('main').style.filter = 'none';
        document.querySelector('.end').style.display = 'none';
        document.querySelector('.start').style.display = 'none';

        rd = 1;
        score = 0;
        interval = 255;
        main();
        loopMain = setInterval(main, 5000);
    });
}

main();