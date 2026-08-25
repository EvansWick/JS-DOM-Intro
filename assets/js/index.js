const btn = document.querySelector("#btn");
let i = 0;

const clickHandler = function (event) {
  console.log("hi", ++i);
};

btn.onclick = clickHandler;

function loginHandler(event) {
  console.log("click me");
  //   alert("Success!");
}
const btnLog = document.querySelector("#log");
btnLog.addEventListener("mouseenter", loginHandler);
btnLog.addEventListener("click", loginHandler);
// btnLog.removeEventListener("click", loginHandler);

