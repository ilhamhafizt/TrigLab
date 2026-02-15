// Mobile Menu
document.getElementById('menuBtn').addEventListener('click', () =>{
    document.getElementById('mobileMenu').classList.toggle('hidden');
});

// Eksplorasi
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

const amp = document.getElementById('amp');
const period = document.getElementById('period');
const shift = document.getElementById('shift');
const funcType = document.getElementById('funcType');

const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');

let animation;
let phase = 0;
let isPlaying = false;
let currentX = 0;

function drawGrid() {
    ctx.strokeStyle = 'rgba(0,255,255,0.1)';
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(0,255,255,0.3)'
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
}

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    ctx.beginPath();
    ctx.strokeStyle = 'cyan';
    ctx.lineWidth = 2;

    const A = parseFloat(amp.value);
    const B = parseFloat(period.value);
    const C = parseFloat(shift.value);

    for (let x = 0; x < canvas.width; x++) {
        let angle = (x / canvas.width) * 4 * Math.PI;
        let y;

        if (funcType.value === 'sin') {
            y = A * Math.sin(B * angle + C + phase);
        } else if (funcType.value === 'cos') {
            y = A * Math.cos(B * angle + C + phase);
        } else {
            y = A * Math.tan(B * angle + C + phase);
            if (Math.abs(y) > 10) continue;
        }
                
        let canvasY = canvas.height / 2 - y * 40;

        if (x === 0) ctx.moveTo(x, canvasY);
        else ctx.lineTo(x, canvasY);
    } 

    ctx.stroke();

    currentX = phase % (4 * Math.PI);
            
    let yValue;
    if (funcType.value === 'sin')
        yValue = A * Math.sin(B * currentX + C);
    else if (funcType.value === 'cos')
        yValue = A * Math.cos(B * currentX + C);
    else
        yValue = A * Math.tan(B * currentX + C);

    let px = (currentX / (4 * Math.PI)) * canvas.width;
    let py = canvas.height / 2 - yValue * 40;

    ctx.beginPath();
    ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fillStyle = 'cyan';
    ctx.fill();

    document.getElementById('infoX').innerText = currentX.toFixed(2);
    document.getElementById('infoY').innerText = yValue.toFixed(2);
    document.getElementById('infoPeriod').innerText = 
    (2 * Math.PI / B).toFixed(2);
    document.getElementById('infoEq').innerText = `y = ${A}${funcType.value}(${B}x + ${C})`;
}

function animate() {
    if(!isPlaying) return;
    phase += 0.05;
    drawGraph();
    animation = requestAnimationFrame(animate);
}

playBtn.onclick = () => {
    if (!isPlaying) {
        isPlaying = true;
        animate();
    }
};

stopBtn.onclick = () => {
    isPlaying = false;
    cancelAnimationFrame(animation);
};

amp.oninput = drawGraph;
period.oninput = drawGraph;
shift.oninput = drawGraph;
funcType.onchange = drawGraph;

drawGraph();