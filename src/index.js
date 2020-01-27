import { createStore } from "redux";

const lightDiv = document.getElementsByClassName("light")[0];
const switchButton = document.getElementById("switch-btn");

const counterHeadings = document.getElementsByTagName("h1")[0];
const plusButton = document.getElementById("plus-btn");
const minusButton = document.getElementById("minus-btn");

const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// 액션 생성 함수
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increment = diff => ({ type: INCREMENT, diff });
const decrement = diff => ({ type: DECREMENT, diff });

// 초깃값
const initialState = {
  light: false,
  counter: 0
};

// 리듀서
// state가 없다면 초기 state값 가져오기
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, // 불변성 유지
        light: !state.light // light값 반전!
      };
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + action.diff
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - action.diff
      };
    default:
      return state;
  }
};

const store = createStore(reducer); // 스토어가 리듀서를 실행시킴.

const render = () => {
  const state = store.getState(); // 현재 state값 가져오기.
  const { light, counter } = state;

  if (light) {
    // 만약 light가 true면 켜지게!
    lightDiv.style.background = "green";
    switchButton.innerText = "끄기";
  } else {
    // light가 false면 꺼짐!
    lightDiv.style.background = "gray";
    switchButton.innerText = "켜기";
  }
  counterHeadings.innerText = counter;
};

render(); // render함수 실행

// store 구독하기! state가 변할 때마다 render함수 실행
store.subscribe(render);

// 디스패치 연동!
// 액션 함수를 실행시켜 액션을 발생시킴.
// 발생한 액션은 리듀서에 의해 분기되어 상태값 변경
switchButton.onclick = () => {
  store.dispatch(toggleSwitch());
};

plusButton.onclick = () => {
  store.dispatch(increment(5));
};

minusButton.onclick = () => {
  store.dispatch(decrement(5));
};
