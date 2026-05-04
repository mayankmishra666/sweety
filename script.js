// ---------- Build galleries ----------
const herGrid = document.getElementById('herGrid');
const togetherGrid = document.getElementById('togetherGrid');

for (let i = 1; i <= 10; i++) {
  herGrid.insertAdjacentHTML('beforeend',
    `<div class="card"><img src="assets/her${i}.jpg" alt="Her ${i}" loading="lazy" /></div>`);
}
for (let i = 1; i <= 5; i++) {
  togetherGrid.insertAdjacentHTML('beforeend',
    `<div class="card"><img src="assets/together${i}.jpg" alt="Together ${i}" loading="lazy" /></div>`);
}

// ---------- Lightbox ----------
const lb = document.createElement('div');
lb.className = 'lightbox';
lb.innerHTML = '<button class="close">&times;</button><img src="" alt="">';
document.body.appendChild(lb);
const lbImg = lb.querySelector('img');

document.querySelectorAll('.card img').forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lb.classList.add('show');
  });
});
lb.addEventListener('click', e => {
  if (e.target === lb || e.target.classList.contains('close')) lb.classList.remove('show');
});

// ---------- Music ----------
const audio = document.getElementById('bgMusic');
const btn = document.getElementById('musicBtn');
audio.volume = 0.5;

function toggleMusic() {
  if (audio.paused) {
    audio.play().then(() => btn.classList.add('playing')).catch(()=>{});
  } else {
    audio.pause();
    btn.classList.remove('playing');
  }
}
btn.addEventListener('click', toggleMusic);

// Try autoplay; if blocked, play on first interaction
window.addEventListener('load', () => {
  audio.play().then(() => btn.classList.add('playing')).catch(() => {
    const start = () => { toggleMusic(); window.removeEventListener('click', start); };
    window.addEventListener('click', start, { once:true });
  });
});

// ---------- Floating hearts ----------
const heartsBox = document.getElementById('hearts');
const emojis = ['💖','💕','🌸','✨','💗','🎀'];
setInterval(() => {
  const h = document.createElement('span');
  h.className = 'heart';
  h.textContent = emojis[Math.floor(Math.random()*emojis.length)];
  h.style.left = Math.random()*100 + 'vw';
  h.style.fontSize = (16 + Math.random()*22) + 'px';
  h.style.animationDuration = (6 + Math.random()*6) + 's';
  heartsBox.appendChild(h);
  setTimeout(()=>h.remove(), 12000);
}, 350);
