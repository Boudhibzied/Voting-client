const setState = (state) =>{
  return {
    type: 'SET_STATE',
    state
  };
}

const vote = (entry) =>{
  return {
  	meta: {remote: true},
    type: 'VOTE',
    entry
  };
}

const next = () =>{
  return {
    meta: {remote: true},
    type: 'NEXT'
  };
}
export {vote, setState, next}