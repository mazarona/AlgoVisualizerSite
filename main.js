var arrSize = 50;
var maxRange = 100;

var arr = [];
var elements = [];
var arrayAcess = 0;
var comparsions = 0;
var speed = 0;

var disblay = document.querySelector(".disblay");
var numberOfComparisons = document.querySelector(".number-of-comparisons");
var numberOfArrayAccess = document.querySelector(".number-of-array-access");
var speedSlider = document.querySelector(".speed input");
var disblayWidth = disblay.clientWidth;
var disblayHeight = disblay.clientHeight;
speed = speedSlider.value;

// 1) Populate the array with random numbers
for (var i = 0; i < arrSize; i++) {
  arr.push(Math.floor(Math.random() * maxRange) + 1);
}
// 2) create the css div elements
createElements();
/*** Event listeners ***/
var selectionSortBtn = document.querySelector(".selection-sort");
selectionSortBtn.addEventListener("click", selection_sort);
var selectionSortBtn = document.querySelector(".bubble-sort");
selectionSortBtn.addEventListener("click", bubble_sort);

window.addEventListener("resize", () => {
  disblayWidth = disblay.clientWidth;
  disblayHeight = disblay.clientHeight;
  updateState();
});

speedSlider.oninput = function () {
  speed = this.value;
};

/*** Functions ***/
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function createElements() {
  for (var i = 0; i < arrSize; i++) {
    elements.push(document.createElement("div"));
    elements[i].classList.add("child");
    disblay.appendChild(elements[i]);
  }
}

function updateState() {
  for (var i = 0; i < arrSize; i++) {
    elements[i].style.height =
      ((arr[i] / maxRange) * disblayHeight).toString() + "px";
    elements[i].style.width = (disblayWidth / arrSize).toString() + "px";
    elements[i].style.left = ((disblayWidth / arrSize) * i).toString() + "px";
  }
}

//selection_sort
async function selection_sort() {
  speed = speedSlider.value;
  shuffleArray(arr);
  updateState();
  arrayAcess = 0;
  comparsions = 0;
  var temp;
  for (var i = 0; i < arrSize - 1; i++) {
    elements[i].style.backgroundColor = "green";
    for (var k = i + 1; k < arrSize; k++) {
      elements[k].style.backgroundColor = "red";
      await waitforme(100 - speed);
      if (arr[k] < arr[i]) {
        temp = arr[i];
        arr[i] = arr[k];
        arr[k] = temp;

        elements[i].style.height =
          ((arr[i] / maxRange) * disblayHeight).toString() + "px";
        elements[k].style.height =
          ((arr[k] / maxRange) * disblayHeight).toString() + "px";
        arrayAcess += 4;
        numberOfArrayAccess.textContent =
          "Number Of Array Access: " + arrayAcess.toString();
      }
      comparsions++;
      numberOfComparisons.textContent =
        "Number Of Comparisons: " + comparsions.toString();
      elements[k].style.backgroundColor = "white";
    }
  }
  for (var i = 0; i < arrSize; i++) {
    elements[i].style.backgroundColor = "white";
  }
  for (var i = 0; i < arrSize; i++) {
    elements[i].style.backgroundColor = "green";
    await waitforme(100 - speed);
  }
}

async function bubble_sort() {
  speed = speedSlider.value;
  shuffleArray(arr);
  updateState();
  arrayAcess = 0;
  comparsions = 0;
  var temp;
  for (var i = 0; i < arrSize - 1; i++) {
    for (var k = 0; k < arrSize - 1 - i; k++) {
      elements[k].style.backgroundColor = "red";
      await waitforme(100 - speed);
      if (arr[k] > arr[k + 1]) {
        temp = arr[k + 1];
        arr[k + 1] = arr[k];
        arr[k] = temp;
        elements[k].style.height =
          ((arr[k] / maxRange) * disblayHeight).toString() + "px";
        elements[k + 1].style.height =
          ((arr[k + 1] / maxRange) * disblayHeight).toString() + "px";
        arrayAcess += 4;
        numberOfArrayAccess.textContent =
          "Number Of Array Access: " + arrayAcess.toString();
      }
      comparsions++;
      numberOfComparisons.textContent =
        "Number Of Comparisons: " + comparsions.toString();
      elements[k].style.backgroundColor = "white";
    }
    elements[arrSize - 1 - i].style.backgroundColor = "green";
  }
  for (var i = 0; i < arrSize; i++) {
    elements[i].style.backgroundColor = "white";
    //    elements[i].style.opacity = "50%";
  }
  for (var i = 0; i < arrSize; i++) {
    elements[i].style.backgroundColor = "green";
    await waitforme(100 - speed);
  }
}

function waitforme(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
