/*
 * Round-input fixes for repeating answers.
 * Sequence Recall and Direction Span require the same button to be usable
 * more than once when a generated sequence contains repeated positions.
 */
function seqRound(){
  const n=Math.min(8,3+Math.floor((level-1)/2)+Math.floor((round-1)/2));
  const active=D;
  active.seq=Array.from({length:n},()=>rint(0,8));
  active.sel=[];
  active.ready=false;
  $('#game-instructions').textContent='Memorize the highlighted tiles, then repeat the sequence in order.';
  $('#game-stage').innerHTML='<div class="tile-grid">'+Array.from({length:9},(_,i)=>'<button class="tile" disabled data-t="'+i+'"></button>').join('')+'</div>';
  let i=0;
  const flash=()=>{
    if(D!==active)return;
    if(i===n){
      active.ready=true;
      $$('[data-t]').forEach(b=>b.disabled=false);
      $('#game-live-feedback').textContent='Repeat the sequence';
      return;
    }
    const b=$('[data-t="'+active.seq[i]+'"]');
    b.classList.add('lit');
    timer=setTimeout(()=>{
      if(D!==active)return;
      b.classList.remove('lit');
      i++;
      timer=setTimeout(flash,180);
    },460);
  };
  timer=setTimeout(flash,300);
  $$('[data-t]').forEach(b=>b.addEventListener('click',()=>{
    if(D!==active||!active.ready||active.sel.length>=n)return;
    active.sel.push(Number(b.dataset.t));
    b.classList.add('selected');
    $('#game-live-feedback').textContent=active.sel.length+' / '+n+' selected';
    setTimeout(()=>{if(D===active)b.classList.remove('selected');},180);
  }));
}
function spatialRound(){
  const n=Math.min(8,3+Math.floor(level/2));
  const active=D;
  active.seq=Array.from({length:n},()=>DIRS[rint(0,3)]);
  active.sel=[];
  active.ready=false;
  $('#game-instructions').textContent='Remember this direction path, then reproduce it with the arrow buttons.';
  $('#game-stage').innerHTML='<div class="instruction"><strong style="font-size:27px;letter-spacing:8px">'+active.seq.join('　')+'</strong></div>';
  timer=setTimeout(()=>{
    if(D!==active)return;
    active.ready=true;
    $('#game-stage').innerHTML='<div class="choice-row">'+DIRS.map((d,i)=>'<button class="choice-button" data-d="'+i+'">'+d+'</button>').join('')+'</div>';
    $$('[data-d]').forEach(b=>b.addEventListener('click',()=>{
      if(D!==active||!active.ready||active.sel.length>=n)return;
      active.sel.push(DIRS[Number(b.dataset.d)]);
      b.classList.add('selected');
      $('#game-live-feedback').textContent=active.sel.length+' / '+n+' directions';
      setTimeout(()=>{if(D===active)b.classList.remove('selected');},180);
    }));
    $('#game-instructions').textContent='Repeat the direction sequence.';
  },1400+level*100);
}