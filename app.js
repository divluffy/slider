const left = document.querySelector(".left");
const right = document.querySelector(".right");
const insde_cards = document.querySelector(".insde_cards");
const point = document.querySelectorAll(".point");
const points = document.querySelector(".points");

let client = insde_cards.offsetWidth,
  current = 0,
  widthAll = client,
  end = insde_cards.childElementCount * widthAll;

window.addEventListener("resize", () => {
  client = insde_cards.offsetWidth;
  widthAll = client;
  current = -client;
});

let timer = setInterval(rightFun, 5000);

insde_cards.addEventListener("mouseenter", () => {
  clearInterval(timer);
  timer = false;
});

insde_cards.addEventListener("mouseout", () => {
  timer = setInterval(rightFun, 5000);
});

right.addEventListener("click", rightFun);

function rightFun() {
  if (current < end - widthAll) {
    current += client;
    insde_cards.style.transform = `translateX(-${current}px)`;
    points.querySelector(".active").classList.remove("active");
    point[current / widthAll].classList.add("active");
  }
  if (current === end - widthAll) {
    current = -widthAll;
  }
}

left.addEventListener("click", leftFun);
function leftFun() {
  if (current > 0) {
    current -= client;
    insde_cards.style.transform = `translateX(-${current}px)`;
    points.querySelector(".active").classList.remove("active");
    point[current / widthAll].classList.add("active");
  }
}

point.forEach((cell) => {
  cell.addEventListener("click", () => {
    let num = cell.getAttribute("data-point");
    current = num * widthAll - widthAll;
    insde_cards.style.transform = `translateX(-${current}px)`;
    points.querySelector(".active").classList.remove("active");
    cell.classList.add("active");
  });
});
