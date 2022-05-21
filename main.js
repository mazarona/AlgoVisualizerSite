import "./style.css";

var arr = [];
var originalArray = [];
var arrSize = 100;
var maxRange = 100;
var parentDiv = document.querySelector(".root");
var parentWidth = parentDiv.clientWidth;
var parentHeight = parentDiv.clientHeight;
var elements = [];
var numberOfSwaps = document.querySelector(".number-of-swaps");
var arrayAcess = 0;
var comparsions = 0;
for (var i = 0; i < arrSize; i++) {
  originalArray.push(Math.floor(Math.random() * maxRange) + 1);
  arr.push(originalArray[i]);
  elements.push(document.createElement("div"));
  elements[i].classList.add("child");
  elements[i].style.height =
    ((arr[i] / maxRange) * parentHeight).toString() + "px";
  elements[i].style.width = (parentWidth / arrSize).toString() + "px";
  elements[i].style.left = ((parentWidth / arrSize) * i).toString() + "px";
  parentDiv.appendChild(elements[i]);
}
selection_sort();

//selection_sort
async function selection_sort() {
  var temp;
  for (var i = 0; i < arrSize - 1; i++) {
    elements[i].style.backgroundColor = "green";
    for (var k = i + 1; k < arrSize; k++) {
      elements[k].style.backgroundColor = "red";
      await waitforme(1);
      comparsions++;
      if (arr[k] < arr[i]) {
        temp = arr[i];
        arr[i] = arr[k];
        arr[k] = temp;
        elements[i].style.height =
          ((arr[i] / maxRange) * parentHeight).toString() + "px";
        elements[k].style.height =
          ((arr[k] / maxRange) * parentHeight).toString() + "px";
        arrayAcess += 4;
        numberOfSwaps.textContent = arrayAcess.toString();
      }
      elements[k].style.backgroundColor = "white";
    }
  }
}
function waitforme(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

window.addEventListener("resize", () => {
  parentWidth = parentDiv.clientWidth;
  parentHeight = parentDiv.clientHeight;
  for (var i = 0; i < arrSize; i++) {
    elements[i].style.height =
      ((arr[i] / maxRange) * parentHeight).toString() + "px";
    elements[i].style.width = (parentWidth / arrSize).toString() + "px";
    elements[i].style.left = ((parentWidth / arrSize) * i).toString() + "px";
  }
});
