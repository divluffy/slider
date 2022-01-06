const left = document.querySelector(".left");
const right = document.querySelector(".right");
const bowlCards = document.querySelector(".insde_cards");
const points = document.querySelector(".points");
const slider = document.querySelector(".slider");

let client = bowlCards.offsetWidth,
  current = 0,
  widthAll = client,
  countSLiders = bowlCards.childElementCount,
  end = countSLiders * widthAll,
  timer;

for (let i = 0; i < countSLiders; i++) {
  let div = document.createElement("div");
  div.classList.add("point");
  if (i === 0) {
    div.classList.add("active");
  }
  div.setAttribute("data-point", i + 1);
  points.appendChild(div);
}

const point = document.querySelectorAll(".point");

window.addEventListener("resize", () => {
  client = bowlCards.offsetWidth;
  widthAll = client;
  current = -client;
});

const autoMove = () => {
  timer = setInterval( nextSlide, 3000);
};

autoMove();

slider.addEventListener("mouseleave", autoMove);
slider.addEventListener("mouseenter", () => {
  clearInterval(timer);
});

right.addEventListener("click", nextSlide);
left.addEventListener("click", prevSLide);

function nextSlide() {
  if (current < end - widthAll) {
    current += client;
    bowlCards.style.transition = 'transform 0.8s ease-in-out';
  } else {
    current = 0;
    bowlCards.style.transition = 'none';
  }

  bowlCards.style.transform = `translateX(-${current}px)`;
  points.querySelector(".active").classList.remove("active");
  point[current / widthAll].classList.add("active");
}

function prevSLide() {
  if (current > 0) {
    current -= client;
  } else {
    current = end - widthAll;
  }

  bowlCards.style.transform = `translateX(-${current}px)`;
  points.querySelector(".active").classList.remove("active");
  point[current / widthAll].classList.add("active");
}

point.forEach((cell) => {
  cell.addEventListener("click", () => {
    let num = cell.getAttribute("data-point");
    current = num * widthAll - widthAll;
    bowlCards.style.transform = `translateX(-${current}px)`;
    points.querySelector(".active").classList.remove("active");
    cell.classList.add("active");
  });
});
