'use strict';

// ===== キャラクターデータ =====
const characters = [
  {
    id: 'nacchan',
    name: 'なっちゃん',
    emoji: '👧',
    tag: 'しゅじんこう',
    color: '#f0a0b8',
    desc: 'お話の国のしゅじんこう。いつも元気いっぱいで、ふしぎなことがだいすき。みんなをぐいぐい引っぱっていくリーダーな子。'
  },
  {
    id: 'kyabetsu',
    name: 'キャベツちゃん',
    emoji: '🐱',
    tag: 'みどりいろのねこ',
    color: '#7bbf6a',
    desc: 'みどりいろがトレードマークのふしぎなねこ。なまえのとおりキャベツがすきらしい。おっとりしていてマイペースだけど、じつはいちばんするどいかんかくをもっている。'
  },
  {
    id: 'nene',
    name: 'ねね',
    emoji: '🐱',
    tag: 'ふわふわのなかま',
    color: '#b48fd8',
    desc: 'ふわふわでかわいいねね。のんびりやさんだけど、何か大切なものをまもるときにはだれよりもゆうきが出る。'
  },
  {
    id: 'mii',
    name: 'みー',
    emoji: '🐾',
    tag: 'すばしこいなかま',
    color: '#e8834f',
    desc: 'とってもすばしこくて、どこにでもあらわれる。小さいけれど、いつもだれかのそばにいて元気をくれるなかま。'
  },
  {
    id: 'kurochan',
    name: 'くろちゃん',
    emoji: '🐈‍⬛',
    tag: 'くろいなかま',
    color: '#555577',
    desc: 'まっ黒でかっこいいくろちゃん。夜になるととくべつな力がめざめるらしい。ミステリアスだけどやさしい心のもちぬし。'
  },
  {
    id: 'hachichan',
    name: 'はちちゃん',
    emoji: '🐝',
    tag: 'みつばちのなかま',
    color: '#f5d76e',
    desc: 'ブーンブーンととびまわるみつばちのはちちゃん。がんばりやさんで、みんなのためにいつもはたらいている。あまいひみつのばしょを知っている。'
  },
  {
    id: 'buchan',
    name: 'ぶーちゃん',
    emoji: '🐷',
    tag: 'まるまるなかま',
    color: '#f0a0b8',
    desc: 'まるまるしてかわいいぶーちゃん。食べることが大すきで、おなかがいっぱいになるとさいこうのえがおを見せてくれる。'
  },
  {
    id: 'buhio',
    name: 'ぶひお',
    emoji: '🐗',
    image: 'img/buhio.png',
    tag: 'にんにくだいすきなぶたのおとこのこ',
    color: '#a0724a',
    desc: 'ぶひおはちょっとがさつだけど、こころがやさしいタイプ。こまっている人を見るとほうっておけない。ぶひぶひ言いながらたすけてくれる。にんにくがだいすきで、いつもにんにくをもちあるいている。'
  },
  {
    id: 'shirotan',
    name: 'しろたん（ボフ）',
    emoji: '🤍',
    tag: 'ふわもこのなかま',
    color: '#d8eef8',
    desc: 'ふわっとしてまっしろなしろたん。べつの名前「ボフ」ともよばれる。だきしめるとほわーっとしたきもちになれる、お話の国のいやしたんとう。'
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
