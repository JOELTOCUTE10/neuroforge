/*
 * Input fixes for sequence activities.
 * These overrides preserve the five-stage adaptive challenge settings.
 */
function seqRound(){
  const n=Math.min(10,3+Math.floor((level-1)/2)+Math.floor((round-1)/2)+challengeStage);
  const active=D,exposure=Math.max(220,460-challengeStage*35-Math.floor((level-1)/2)*12);
  active.seq=Array.from({length:n},()=>rint(0,8));active.sel=[];active.ready=false;
  $('#game-instructions').textContent='Memorize the highlighted tiles, then repeat the sequence in order.';
  $('#game-stage').innerHTML='<div class="tile-grid">'+Array.from({length:9},(_,i)=>'<button class="tile" disabled data-t="'+i+'" aria-label="Tile '+(i+1)+'"></button>').join('')+'</div>';
  let i=0;
  const flash=()=>{
    if(D!==active)return;
    if(i===n){active.ready=true;$$('[data-t]').forEach(b=>b.disabled=false);$('#game-live-feedback').textContent='Repeat the sequence';return;}
    const b=$('[data-t="'+active.seq[i]+'"]');b.classList.add('lit');
    timer=setTimeout(()=>{if(D!==active)return;b.classList.remove('lit');i++;timer=setTimeout(flash,Math.max(100,180-challengeStage*10));},exposure);
  };
  timer=setTimeout(flash,300);
  $$('[data-t]').forEach(b=>b.addEventListener('click',()=>{
    if(D!==active||!active.ready||active.sel.length>=n)return;
    active.sel.push(Number(b.dataset.t));b.classList.add('selected');
    $('#game-live-feedback').textContent=active.sel.length+' / '+n+' selected';
    setTimeout(()=>{if(D===active)b.classList.remove('selected');},160);
  }));
}
function spatialRound(){
  const n=Math.min(10,3+Math.floor(level/2)+challengeStage),active=D;
  const exposure=Math.max(650,1600-(level-1)*55-challengeStage*120);
  active.seq=Array.from({length:n},()=>DIRS[rint(0,3)]);active.sel=[];active.ready=false;
  $('#game-instructions').textContent='Remember this direction path, then reproduce it with the arrow buttons.';
  $('#game-stage').innerHTML='<div class="instruction"><strong class="spatial-sequence">'+active.seq.join('　')+'</strong></div>';
  timer=setTimeout(()=>{
    if(D!==active)return;active.ready=true;
    $('#game-stage').innerHTML='<div class="choice-row">'+DIRS.map((d,i)=>'<button class="choice-button" data-d="'+i+'" aria-label="Direction '+d+'">'+d+'</button>').join('')+'</div>';
    $$('[data-d]').forEach(b=>b.addEventListener('click',()=>{
      if(D!==active||!active.ready||active.sel.length>=n)return;
      active.sel.push(DIRS[Number(b.dataset.d)]);b.classList.add('selected');
      $('#game-live-feedback').textContent=active.sel.length+' / '+n+' directions';
      setTimeout(()=>{if(D===active)b.classList.remove('selected');},160);
    }));
    $('#game-instructions').textContent='Repeat the direction sequence.';
  },exposure);
}
