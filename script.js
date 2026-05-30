'use strict';

// ===== キャラクターデータ =====
const characters = [
  {
    id: 'nacchan',
    name: 'なっちゃん',
    emoji: '👧',
    tag: '主人公',
    color: '#f0a0b8',
    desc: 'お話の国の主人公。好奇心旺盛でいつも元気いっぱい。ふしぎなことが大すきで、みんなをぐいぐい引っ張っていくリーダー的存在。'
  },
  {
    id: 'kyabetsu',
    name: 'キャベツちゃん',
    emoji: '🐱',
    tag: 'みどりいろのねこ',
    color: '#7bbf6a',
    desc: 'みどりいろがトレードマークのふしぎなねこ。なまえのとおりキャベツが好きらしい。おっとりしていてマイペースだけど、じつはいちばん鋭い感覚を持っている。'
  },
  {
    id: 'nene',
    name: 'ねね',
    emoji: '🐱',
    tag: 'ふわふわのなかま',
    color: '#b48fd8',
    desc: 'ふわふわでかわいいねね。のんびり屋さんだけど、何か大切なものを守るときには誰よりも勇気が出る。'
  },
  {
    id: 'mii',
    name: 'みー',
    emoji: '🐾',
    tag: 'すばしこいなかま',
    color: '#e8834f',
    desc: 'とってもすばしこくて、どこにでも現れる。小さいけれど、いつも誰かのそばにいて元気をくれる存在。'
  },
  {
    id: 'kurochan',
    name: 'くろちゃん',
    emoji: '🐈‍⬛',
    tag: 'くろいなかま',
    color: '#555577',
    desc: '真っ黒でかっこいいくろちゃん。夜になると特別な力が目覚めるらしい。ミステリアスだけどやさしい心の持ち主。'
  },
  {
    id: 'hachichan',
    name: 'はちちゃん',
    emoji: '🐝',
    tag: 'みつばちのなかま',
    color: '#f5d76e',
    desc: 'ブーンブーンと飛び回るみつばちのはちちゃん。がんばり屋さんで、みんなのためにいつも働いている。あまい秘密の場所を知っている。'
  },
  {
    id: 'buchan',
    name: 'ぶーちゃん',
    emoji: '🐷',
    tag: 'まるまるなかま',
    color: '#f0a0b8',
    desc: 'まるまるしてかわいいぶーちゃん。食べることが大すきで、おなかがいっぱいになると最高の笑顔を見せてくれる。'
  },
  {
    id: 'buhio',
    name: 'ぶひお',
    emoji: '🐗',
    image: 'img/buhio.png',
    tag: 'にんにく大好きな豚の男の子',
    color: '#a0724a',
    desc: 'ぶひおはちょっと荒削りだけど、情に厚いタイプ。困っている人を見ると放っておけない。ぶひぶひ言いながら助けてくれる。にんにくが大すきで、いつもにんにくを持ち歩いている。'
  },
  {
    id: 'shirotan',
    name: 'しろたん（ボフ）',
    emoji: '🤍',
    tag: 'ふわもこのなかま',
    color: '#d8eef8',
    desc: 'ふわっとしてまっしろなしろたん。別名「ボフ」とも呼ばれる。抱きしめるとほわーっとした気持ちになれる、お話の国のいやし担当。'
  },
];

// ===== ページ切り替え =====
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');

  const btn = document.querySelector(`.nav-btn[data-page="${pageId}"]`);
  if (btn) btn.classList.add('active');

  window.scrollTo(0, 0);
}

// ===== キャラクターカード生成 =====
function buildCards() {
  const grid = document.getElementById('card-grid');
  characters.forEach(c => {
    const card = document.createElement('div');
    card.className = 'char-card';
    card.style.setProperty('--card-color', c.color);
    card.innerHTML = `
      <span class="char-emoji">${c.emoji}</span>
      <div class="char-name">${c.name}</div>
      <div class="char-tag">${c.tag}</div>
    `;
    card.addEventListener('click', () => openModal(c));
    grid.appendChild(card);
  });
}

// ===== モーダル =====
function openModal(c) {
  const emojiEl = document.getElementById('modal-emoji');
  if (c.image) {
    emojiEl.innerHTML = `<img src="${c.image}" alt="${c.name}" class="modal-char-img">`;
  } else {
    emojiEl.textContent = c.emoji;
  }
  document.getElementById('modal-name').textContent  = c.name;
  document.getElementById('modal-tag').textContent   = c.tag;
  document.getElementById('modal-desc').textContent  = c.desc;
  document.getElementById('modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  document.body.style.overflow = '';
}

// ===== イベント登録 =====
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => showPage(btn.dataset.page));
});

document.querySelectorAll('.menu-card[data-page]').forEach(card => {
  card.addEventListener('click', () => showPage(card.dataset.page));
});

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ===== 初期化 =====
buildCards();
