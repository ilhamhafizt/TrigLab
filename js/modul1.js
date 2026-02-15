// Mobile Menu
document.getElementById('menuBtn').addEventListener('click', () =>{
    document.getElementById('mobileMenu').classList.toggle('hidden');
});

// Eksplorasi
const canvas = document.getElementById('circle');
const ctx = canvas.getContext('2d');
canvas.width = 420;
canvas.height = 420;

const slider = document.getElementById('angleSlider');
const degText = document.getElementById('deg');
const radText = document.getElementById('rad');
const xText = document.getElementById('x');
const yText = document.getElementById('y');

let angle = 30;
let anim = null;
        
function draw(angleDeg){
    ctx.clearRect(0,0,420,420);
    const cx = 210;
    const cy = 210;
    const r = 150;

    // Background Glow
    const grad = ctx.createRadialGradient(cx,cy,20,cx,cy,220);
    grad.addColorStop(0, '#020617');
    grad.addColorStop(1, '#000814');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,420,420);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;

    for(let i=0; i<=420; i+=20){
        ctx.beginPath();
        ctx.moveTo(i,0);
        ctx.lineTo(i,420);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,i);
        ctx.lineTo(420,i);
        ctx.stroke();
    }

    // Axis
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(cx,0);
    ctx.lineTo(cx,420);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,cy);
    ctx.lineTo(420,cy);
    ctx.stroke();

    // Circle
    ctx.beginPath();
    ctx.arc(cx,cy,r,0,Math.PI*2);
    ctx.strokeStyle = '#22D3EE';
    ctx.lineWidth = 2;
    ctx.stroke();

    const rad = angleDeg*Math.PI/180;
    const x = cx + r*Math.cos(rad);
    const y = cy - r*Math.sin(rad);

    // Line
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(x,y);
    ctx.strokeStyle = '#4ADE80';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Point
    ctx.beginPath();
    ctx.arc(x,y,7,0,Math.PI*2);
    ctx.fillStyle = '#4ADE80';
    ctx.fill();

    degText.innerText = angleDeg.toFixed(0);
    radText.innerText = rad.toFixed(3);
    xText.innerText = Math.cos(rad).toFixed(3);
    yText.innerText = Math.sin(rad).toFixed(3);
}
        
// Slider
slider.addEventListener('input', e=>{
    angle = Number(e.target.value);
    draw(angle);
});

// Play
document.getElementById('playBtn').addEventListener('click', ()=>{
    if(anim !== null) return;
    anim = setInterval(()=>{
        angle += 1;
        if(angle > 360) angle = 0;
        slider.value = angle;
        draw(angle);
    }, 30);
});

// Stop
document.getElementById('stopBtn').addEventListener('click', ()=>{
    clearInterval(anim);
    anim = null;
});

draw(angle);