/* ======================
   DATA: poems + titles + letters
   ====================== */
const poems = [
  "The moon isn’t beautiful\nshe’s just reflecting you,\nand pretending it’s light.",
  "I looked at you,\nand the stars forgot to blink\neven heaven wanted to stare.",
  "You smiled,\nand Paris could retire\nno light could outshine that moment.",
  "You brushed my hand,\nand every butterfly in me\nlearned a new color.",
  "The night is jealous\nbecause I make wishes\non your eyes instead of stars.",
  "If I ever paint love,\nit’ll look like moonlight\ntouching your face\nwhen you’re not looking.",
  "Flowers bloom\njust to understand\nwhat it feels like\nto be seen by you."
];

const poemTitles = [
  "Moonlight Mirror",
  "When Stars Forget",
  "Paris Smile",
  "Butterfly Palette",
  "Night's Jealousy",
  "Painted Light",
  "Bloom to Be Seen"
];

const poemBackgrounds = [
  "#fef6f9", "#f9f7ff", "#fff9f4",
  "#f0f8ff", "#fff0f5", "#fefde7",
  "#e8f5e9"
];

const letters = [
  "Dear dreamer, today the universe smiled at you 💖",
  "A gentle breeze told me secrets only your heart can hear 🌸",
  "You are magic wrapped in soft pastel skies ✨",
  "Even the stars pause to admire your light 🌙",
  "This note smells like love… and maybe a cookie 🍪",
  "Hearts are floating just to greet your smile 💌",
  "A small wish: may your coffee be warm and your heart calm ☕️",
  "Your kindness is a quiet revolution 🌷",
  "If someone looks at you the way the moon looks at the sea, that's love.",
  "Psst… the cosmos wrote this little note just for you 💫"
];

/* ======================
   DOM refs
   ====================== */
const poemsContainer = document.getElementById('poems');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const envelopesContainer = document.getElementById('envelopesContainer');
const envelopes = Array.from(document.querySelectorAll('.envelope'));
const letterPopup = document.getElementById('letterPopup');
const letterContent = document.getElementById('letterContent');
const heartsContainer = document.getElementById('hearts');

const commentName = document.getElementById('commentName');
const commentInput = document.getElementById('commentInput');
const sendBtn = document.getElementById('sendBtn');
const commentsList = document.getElementById('commentsList');

/* ======================
   POEMS: create slides with titles
   ====================== */
function createPoemSlides(){
  poems.forEach((text, i) => {
    const slide = document.createElement('article');
    slide.className = 'poem-slide';
    slide.setAttribute('data-index', i);
    // inner card for tilt & hover
    const card = document.createElement('div');
    card.className = 'poem-card';
    card.style.background = poemBackgrounds[i] || poemBackgrounds[0];

    // title
    const h3 = document.createElement('h3');
    h3.textContent = poemTitles[i] || `Poem ${i+1}`;
    card.appendChild(h3);

    // poem text
    const p = document.createElement('p');
    p.textContent = text;
    card.appendChild(p);

    slide.appendChild(card);
    poemsContainer.appendChild(slide);
  });
}
createPoemSlides();

let slides = document.querySelectorAll('.poem-slide');
let currentIndex = 0;

// set the first active card and center it
function updateActiveSlide(index){
  slides.forEach((s, i) => s.classList.toggle('active', i === index));
  const target = slides[index];
  if(target){
    target.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
    document.body.style.background = poemBackgrounds[index] || poemBackgrounds[0];
  }
}
updateActiveSlide(0);

/* Desktop nav buttons */
prevBtn.addEventListener('click', ()=> {
  currentIndex = Math.max(0, currentIndex-1);
  updateActiveSlide(currentIndex);
});
nextBtn.addEventListener('click', ()=> {
  currentIndex = Math.min(slides.length-1, currentIndex+1);
  updateActiveSlide(currentIndex);
});

/* Keyboard left/right for desktop */
window.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowLeft'){ currentIndex = Math.max(0, currentIndex-1); updateActiveSlide(currentIndex); }
  if(e.key === 'ArrowRight'){ currentIndex = Math.min(slides.length-1, currentIndex+1); updateActiveSlide(currentIndex); }
});

/* Touch swipe left/right for poems (for mobile) */
let xStart = null;
poemsContainer.addEventListener('touchstart', e => xStart = e.touches[0].clientX, false);
poemsContainer.addEventListener('touchend', e => {
  if(!xStart) return;
  const xEnd = e.changedTouches[0].clientX;
  const diff = xStart - xEnd;
  if(diff > 50 && currentIndex < slides.length-1){ currentIndex++; updateActiveSlide(currentIndex); }
  else if(diff < -50 && currentIndex > 0){ currentIndex--; updateActiveSlide(currentIndex); }
  xStart = null;
}, false);

window.addEventListener('resize', ()=> { slides = document.querySelectorAll('.poem-slide'); updateActiveSlide(currentIndex); });

/* reveal on scroll (extra) */
function revealPoemOnScroll(){
  slides.forEach(slide => {
    const rect = slide.getBoundingClientRect();
    if(rect.top < window.innerHeight * 0.9){
      slide.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealPoemOnScroll);
window.addEventListener('load', revealPoemOnScroll);

/* ======================
   LETTERS: envelope layout + interactions
   ====================== */
function layoutEnvelopes(){
  envelopes.forEach((env, i) => {
    const zoneWidth = envelopesContainer.clientWidth;
    const randLeft = 20 + Math.random() * (zoneWidth - 80);
    env.style.left = `${randLeft}px`;
    const dur = 9 + Math.random() * 6;
    const delay = Math.random() * -10;
    env.style.animation = `floatEnvelope ${dur}s linear ${delay}s infinite`;
  });
}
layoutEnvelopes();
window.addEventListener('resize', layoutEnvelopes);

function createHeart(x,y){
  const h = document.createElement('div');
  h.className = 'heart';
  h.style.left = `${x}px`;
  h.style.top = `${y}px`;
  heartsContainer.appendChild(h);
  setTimeout(()=> h.remove(), 1800);
}

envelopes.forEach(env => {
  env.addEventListener('click', () => {
    const letter = letters[Math.floor(Math.random() * letters.length)];
    letterContent.textContent = letter;
    letterPopup.classList.add('show');
    letterPopup.setAttribute('aria-hidden', 'false');

    const popupRect = letterPopup.getBoundingClientRect();
    for(let i=0;i<6;i++){
      const x = popupRect.left + 20 + Math.random() * (popupRect.width - 40);
      const y = popupRect.top + 20 + Math.random() * 60;
      createHeart(x, y);
    }
  });
});

letterPopup.addEventListener('click', ()=> {
  letterPopup.classList.remove('show');
  letterPopup.setAttribute('aria-hidden', 'true');
});

/* ======================
   COMMENTS: localStorage persistence
   ====================== */
const STORAGE_KEY = 'sovae_comments_v1';

function loadComments(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) return [];
  try{ return JSON.parse(raw) } catch(e){ return [] }
}

function saveComments(arr){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

function renderComments(){
  commentsList.innerHTML = '';
  const comments = loadComments();
  if(!comments.length){
    commentsList.innerHTML = `<div class="comment-item" style="opacity:.8">No comments yet — be the first to leave some love 💌</div>`;
    return;
  }
  comments.slice().reverse().forEach(c => {
    const item = document.createElement('div');
    item.className = 'comment-item';
    const meta = document.createElement('div');
    meta.className = 'comment-meta';
    const name = c.name ? `${escapeHtml(c.name)} • ` : '';
    const time = new Date(c.ts).toLocaleString();
    meta.textContent = `${name}${time}`;
    const body = document.createElement('div');
    body.textContent = c.text;
    item.appendChild(meta);
    item.appendChild(body);
    commentsList.appendChild(item);
  });
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

sendBtn.addEventListener('click', () => {
  const text = commentInput.value.trim();
  if(!text) return;
  const name = commentName.value.trim();
  const comments = loadComments();
  comments.push({ name: name || '', text, ts: Date.now() });
  saveComments(comments);
  renderComments();
  commentInput.value = '';
  commentName.value = '';
  sendBtn.textContent = 'Sent ✅';
  sendBtn.classList.add('sent');
  setTimeout(()=> { sendBtn.textContent = 'Send'; sendBtn.classList.remove('sent'); }, 1400);
});

renderComments();

/* re-query slides after DOM created */
slides = document.querySelectorAll('.poem-slide');