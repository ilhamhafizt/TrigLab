// Mobile Menu
document.getElementById('menuBtn').addEventListener('click', () =>{
    document.getElementById('mobileMenu').classList.toggle('hidden');
});

// Eskplorasi
const slider = document.getElementById('angleSlider');
const lhsSelect = document.getElementById('lhsSelect');
const rhsSelect = document.getElementById('rhsSelect');

const lhsText = document.getElementById('lhsValue');
const rhsText = document.getElementById('rhsValue');
const diffText = document.getElementById('diffValue');
const statusText = document.getElementById('statusValue');

const canvas = document.getElementById('identityCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 400;

function computeLHS(x) {
    if (lhsSelect.value === 'sin2cos2')
        return Math.sin(x)**2 + Math.cos(x)**2;
    if (lhsSelect.value === 'tan2plus1')
        return 1 + Math.tan(x)**2;
    if (lhsSelect.value === 'sin2x')
        return Math.sin(2*x);
}

function computeRHS(x) {
    if (rhsSelect.value === '1')
        return 1;
    if (rhsSelect.value === 'sec2')
        return 1 / (Math.cos(x)**2);
    if (rhsSelect.value === '2sincos')
        return 2 * Math.sin(x) * Math.cos(x);
}

function drawVisualization(x) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 120;

    // Lingkaran Satuan
    ctx.strokeStyle = 'cyan';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
    
    // Titik Sudut
    const px = centerX + radius * Math.cos(x);
    const py = centerY - radius * Math.sin(x);

    ctx.beginPath();
    ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fillStyle = 'cyan';
    ctx.fill();

    // Garis Radius
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Garis Proyeksi Sin dan Cos
    ctx.strokeStyle = 'rgba(0,255,255,0.5)';

    // cos (Horizontal)
    ctx.beginPath();
    ctx.moveTo(centerX, py);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Sin (Vertical)
    ctx.beginPath()
    ctx.moveTo(px, centerY);
    ctx.lineTo(px, py);
    ctx.stroke();
}

function updateExperiment() {
    const x = parseFloat(slider.value);

    const lhs = computeLHS(x);
    const rhs = computeRHS(x);
    const diff = Math.abs(lhs - rhs);

    lhsText.innerText = lhs.toFixed(5);
    rhsText.innerText = rhs.toFixed(5)
    diffText.innerText = diff.toExponential(2);

    if (diff < 0.00001) {
        statusText.innerText = 'INI IDENTITAS';
        statusText.className = 'text-cyan-400 font-semibold';
    } else {
        statusText.innerText = 'Bukan Identitas Umum';
        statusText.className = 'text-red-400 font-semibold';
    }

    drawVisualization(x);
}

slider.oninput = updateExperiment;
lhsSelect.onchange = updateExperiment;
rhsSelect.onchange = updateExperiment;

updateExperiment();