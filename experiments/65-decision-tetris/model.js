(function (root) {
  'use strict';
  const body = [[1,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]];
  const cap = [[1,0],[2,0],[3,0],[3,1]];
  function at(stage) {
    if (![0,1,2].includes(stage)) throw new RangeError('Stage must be 0, 1 or 2');
    return Object.freeze({stage, pr:147+stage, bodyPresent:stage>0, capPresent:stage===2,
      oldBodyPresent:stage<2, frozen:stage===1, caller:stage===2?'package':'cli',
      pins:stage===2?['CLI uses DaemonClient','External tests use /testing','Old CLI body is absent']:[],
      packageCells:stage===0?[]:stage===1?body:[...body,...cap]});
  }
  function lift(stage) {
    const state=at(stage);
    return Object.freeze({allowed:stage===1, available:state.bodyPresent,
      reason:stage===0?'No staged body yet.':stage===1?
      'The selected CLI route still has its local mechanism body.':
      'The new caller and testing imports need the package; the local mechanism body is gone.',
      pins:state.pins});
  }
  const model={at,lift,body,cap};
  if(typeof module!=='undefined'&&module.exports) module.exports=model;
  else root.BoardModel=model;
})(typeof window!=='undefined'?window:globalThis);
