/* ===== DHL 푸터 시안 A/B 전환 + 시안 B 상자 떨어지기 + 이스터에그(미니게임) ===== */
(function(){
  const root=document.getElementById('ftv');
  if(!root)return;
  const scene=root.querySelector('.ftv-b-scene');
  const btns=root.querySelectorAll('[data-ftv-pick]');

  // 시안 B 장면이 화면에 들어왔는지
  const inView=()=>{const r=scene.getBoundingClientRect();return r.top<innerHeight*0.8&&r.bottom>0;};
  // 상자 떨어지기 처음부터 다시
  function replay(){
    root.classList.remove('is-in');
    void root.offsetWidth;
    if(root.dataset.variant==='b'&&inView())root.classList.add('is-in');
  }

  function setVariant(v){
    root.dataset.variant=v;
    btns.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.ftvPick===v)));
    try{localStorage.setItem('dhlFooterVariant',v);}catch(e){}
    replay();
  }
  btns.forEach(b=>b.addEventListener('click',()=>setVariant(b.dataset.ftvPick)));

  // 스크롤해서 푸터가 보이면 상자가 떨어짐 (한 번)
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting&&root.dataset.variant==='b')root.classList.add('is-in');});
  },{threshold:0.35});
  io.observe(scene);

  // 이스터에그: 기존 index.html의 openGame() 이 있으면 그걸로, 없으면 game.html로 이동
  root.querySelectorAll('[data-ftv-egg]').forEach(b=>b.addEventListener('click',()=>{
    if(typeof window.openGame==='function')window.openGame();
    else location.href='game.html';
  }));

  // 지난번에 고른 시안 기억 (기본 A)
  let v='a';
  try{v=localStorage.getItem('dhlFooterVariant')||'a';}catch(e){}
  setVariant(v==='b'?'b':'a');
})();
