"use strict";
// CHỌN CÁC YẾU TỐ CHO DOM GÁN VÀO ĐỂ THAY ĐỔI KHI CẦN
const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");
const diceEL = document.querySelector(".dice");
const btNew = document.querySelector(".btn--new");
const btRoll = document.querySelector(".btn--roll");
const btHold = document.querySelector(".btn--hold");
const current0EL = document.querySelector("#current--0");
const current1EL = document.querySelector("#current--1");
const cd0 = document.querySelector(".player--0");
const cd1 = document.querySelector(".player--1");
//thiết lập trạng thái trò chơi

// thiết lập điều kiện
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add("hidden");
  cd0.classList.remove("player--winner");
  cd1.classList.remove("player--winner");
  cd0.classList.add("player--active");
  cd1.classList.remove("player--active");
};
init();
//
btRoll.addEventListener("click", function () {
  //tạo ra viên xúc xắ ngẫu nhiên
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    // hiển thị lên màn
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;
    // đúng chuyển sang ngươi choi tieeps theo
    let switchPlayer = function () {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      cd0.classList.toggle("player--active");
      activePlayer = activePlayer === 0 ? 1 : 0;
      cd1.classList.toggle("player--active");
    };
    if (dice !== 1) {
      //cộng số điểm hiện tại vào score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
      // chuyển sang người chơi tiếp theo
    }
  }
});
btHold.addEventListener("click", function () {
  // cộng điểm hiện tại vào điểm người chới đang hoạt động
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // kiểm tra lớn hơn 100
    if (scores[activePlayer] >= 20) {
      //finish game
      playing = false;
      diceEL.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // chuyển sang ngươi tiếp chơi tiếp theo
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      cd0.classList.toggle("player--active");
      activePlayer = activePlayer === 0 ? 1 : 0;
      cd1.classList.toggle("player--active");
    }
  }
});
/*
btNew.addEventListener("click", function () {
  if (scores[0] >= 20) {
    cd0.classList.remove("player--winner");
    cd0.classList.add("player--active");
    playing = true;
  } else if (scores[0] < 20 && scores[1] < 20) {
    cd0.classList.add("player--active");
    cd1.classList.remove("player--active");
  } else {
    cd0.classList.add("player--active");
    cd1.classList.remove("player--winner");
    playing = true;
    activePlayer = 0;
  }
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  diceEL.classList.add("hidden");
});
*/
btNew.addEventListener("click", init);
