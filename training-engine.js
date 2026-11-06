(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.NeuroForgeProgression=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const STAGE_COUNT=5,MAX_LEVEL=10,LEVEL_UP=88,LEVEL_DOWN=50,STAGE_UP=85,STAGE_DOWN=55;
  const clamp=(value,min,max)=>Math.max(min,Math.min(max,Number(value)||min));
  const levelOf=row=>clamp(Math.round(Number(row?.level)||1),1,MAX_LEVEL);
  const stageOf=row=>clamp(Math.round(Number(row?.metrics?.challengeStage??row?.challengeStage??0)||0),0,STAGE_COUNT-1);
  const mean=rows=>rows.length?rows.reduce((sum,row)=>sum+clamp(row.accuracy,0,100),0)/rows.length:0;
  function trailing(rows,predicate){const result=[];for(let i=rows.length-1;i>=0;i--){if(!predicate(rows[i]))break;result.unshift(rows[i]);}return result;}
  function getProgression(input){
    const rows=(Array.isArray(input)?input:[]).filter(row=>row&&Number.isFinite(Number(row.accuracy))).slice().sort((a,b)=>(Number(a.completedAt)||0)-(Number(b.completedAt)||0));
    if(!rows.length)return {level:1,stage:0,change:'start',avgAccuracy:null,sessionsAtLevel:0,sessionsAtStage:0,reason:'Start at Level 1 · Stage 1/5. Each activity adapts independently as you practice.'};
    const latest=rows[rows.length-1],currentLevel=levelOf(latest),currentStage=stageOf(latest);
    const levelRows=trailing(rows,row=>levelOf(row)===currentLevel).slice(-3),levelAverage=mean(levelRows);
    if(levelRows.length>=3&&levelRows.every(row=>stageOf(row)===STAGE_COUNT-1)&&levelAverage>=LEVEL_UP&&currentLevel<MAX_LEVEL)return {level:currentLevel+1,stage:0,change:'level-up',avgAccuracy:Math.round(levelAverage),sessionsAtLevel:levelRows.length,sessionsAtStage:0,reason:'Your last three sessions at this level averaged '+Math.round(levelAverage)+'%. The next level is ready.'};
    if(levelRows.length>=3&&levelAverage<LEVEL_DOWN&&currentLevel>1)return {level:currentLevel-1,stage:0,change:'level-down',avgAccuracy:Math.round(levelAverage),sessionsAtLevel:levelRows.length,sessionsAtStage:0,reason:'Your last three sessions averaged '+Math.round(levelAverage)+'%. The next level is reduced to keep practice manageable.'};
    const stageRows=trailing(rows,row=>levelOf(row)===currentLevel&&stageOf(row)===currentStage).slice(-2),stageAverage=mean(stageRows);
    if(stageRows.length>=2&&stageAverage>=STAGE_UP&&currentStage<STAGE_COUNT-1)return {level:currentLevel,stage:currentStage+1,change:'stage-up',avgAccuracy:Math.round(stageAverage),sessionsAtLevel:levelRows.length,sessionsAtStage:stageRows.length,reason:'Your last two sessions at this stage averaged '+Math.round(stageAverage)+'%. The activity becomes slightly more demanding next time.'};
    if(stageRows.length>=2&&stageAverage<STAGE_DOWN&&currentStage>0)return {level:currentLevel,stage:currentStage-1,change:'stage-down',avgAccuracy:Math.round(stageAverage),sessionsAtLevel:levelRows.length,sessionsAtStage:stageRows.length,reason:'Your last two sessions averaged '+Math.round(stageAverage)+'%. One challenge stage eases next time.'};
    const average=stageRows.length?Math.round(stageAverage):Math.round(levelAverage);
    let reason='Your recent results are in the practice range. Keep this challenge steady for now.';
    if(stageRows.length<2)reason='Complete one more session at this stage to calibrate its next adjustment.';
    else if(stageAverage<STAGE_DOWN&&currentStage===0)reason='This is already the easiest stage at this level. The challenge will stay here while you build consistency.';
    else if(stageAverage>=STAGE_UP&&currentStage===STAGE_COUNT-1)reason='You reached the final stage. One more strong session at this level can qualify you for the next level.';
    return {level:currentLevel,stage:currentStage,change:'steady',avgAccuracy:Number.isFinite(average)?average:null,sessionsAtLevel:levelRows.length,sessionsAtStage:stageRows.length,reason};
  }
  return {STAGE_COUNT,MAX_LEVEL,LEVEL_UP,LEVEL_DOWN,STAGE_UP,STAGE_DOWN,getProgression};
});
