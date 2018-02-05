const ADD_WEAPON = "addweapon";
const REDUCE_WEAPON = "reduceweapon";

export function counter(state = 0, action) {
  switch (action.type) {
    case ADD_WEAPON:
      return state + 1;
    case REDUCE_WEAPON:
      return state - 1;
    default:
      return 10;
  }
}

export function addWeapon() {
  return { type: ADD_WEAPON };
}

export function reduceWeapon() {
  return { type: REDUCE_WEAPON };
}

export function addWeaponAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(addWeapon());
    }, 2000);
  };
}
