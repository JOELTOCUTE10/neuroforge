/* NeuroForge exercise catalog — canonical domains and original activity metadata. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.NeuroForgeCatalog=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const domains=[
    {id:'memory',name:'Memory',description:'Encoding, retaining, and retrieving information.'},
    {id:'attention',name:'Attention',description:'Selecting relevant signals and resisting distraction.'},
    {id:'brain-speed',name:'Brain Speed',description:'Accurate decisions and responses under time pressure.'},
    {id:'people-skills',name:'People Skills',description:'Interpreting communication tone and social context.'},
    {id:'intelligence',name:'Intelligence',description:'Reasoning, rule discovery, and flexible problem solving.'},
    {id:'navigation',name:'Navigation',description:'Spatial orientation, route learning, and mental mapping.'}
  ];
  const rows=[
    ['sequence','Sequence Recall','Memory','▦',3,'Remember a growing sequence of highlighted tiles.','Watch the sequence, then repeat it in order.'],
    ['pattern','Pattern Matrix','Memory','▧',3,'Remember where squares appear, then rebuild the pattern.','Try to remember the overall shape of the pattern.'],
    ['words','Word Recall','Memory','Aa',3,'Study a word list and recognize it among alternatives.','Group related words into small mental clusters.'],
    ['spatial','Direction Span','Navigation','↗',3,'Remember a direction path and reproduce the sequence.','Picture yourself moving along the path.'],
    ['nback','Working Memory N-Back','Memory','2B',3,'Decide whether each symbol matches one shown a few places earlier.','Keep the current memory lag in mind as the symbol stream changes.'],
    ['focus','Focus Grid','Attention','⌕',2,'Find every target symbol while ignoring distractors.','Scan from left to right and top to bottom.'],
    ['search','Visual Search','Attention','⊙',2,'Find the one symbol that differs from the rest.','Compare one feature at a time.'],
    ['stroop','Color Conflict','Attention','◉',2,'Name the ink color, not the word displayed.','Focus on the color of the letters.'],
    ['reaction','Reaction Lab','Brain Speed','ϟ',2,'Respond when a signal appears and avoid anticipating it.','Wait for the green signal.'],
    ['math','Number Sprint','Brain Speed','±',2,'Solve short number problems with adjustable challenge.','Accuracy comes first; speed follows practice.'],
    ['switch','Rule Shift','Intelligence','⇄',3,'Apply a changing classification rule to different symbols.','Read the current rule before choosing.'],
    ['logic','Pattern Logic','Intelligence','∴',3,'Find the next item in a number sequence.','Look for a repeated operation or consistent change.'],
    ['dual','Dual Focus','Attention','◉',3,'Track two symbol-and-color targets in a busy grid.','Hold both target rules in mind as you scan.'],
    ['rotate','Mental Rotation','Navigation','⟳',3,'Recognize a shape after it is rotated.','Compare the relationship between the parts, not their position.'],
    ['tone','Context Signals','People Skills','◎',3,'Identify the communication tone that best fits a fictional conversation and its context.','Read both the situation and the message before choosing.'],
    ['route','Route Map Recall','Navigation','⌖',3,'Study a short path on a grid, then reproduce its locations in order.','Remember the path as a connected route, not a collection of separate squares.']
  ];
  const activities=rows.map(x=>({id:x[0],name:x[1],area:x[2],symbol:x[3],minutes:x[4],description:x[5],tip:x[6]}));
  const byId=Object.fromEntries(activities.map(a=>[a.id,a]));
  const legacyAreas={Spatial:'Navigation',Speed:'Brain Speed',Reasoning:'Intelligence',Flexibility:'Intelligence'};
  function areaForSession(session){return byId[session?.activityId]?.area||legacyAreas[session?.area]||session?.area||'Memory';}
  return {domains,activities,areaForSession};
});
