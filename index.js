const selectNode = document.getElementById("select");
const startButtonNode = document.getElementById("start");
const deskNode = document.getElementById("desk");
const characters = ["wolf", "rabbit", "house", "barrier"];

let selectValue = select.value;

selectNode.addEventListener("change", e => {
  selectValue = e.target.value;
});

startButtonNode.addEventListener("click", e => {
  console.log("START", selectValue);
  startGame();
});

function startGame() {
  deskNode.innerHTML = "";
  const charactersPositions = {
    wolf: {
      top: 0,
      left: 0,
    },
    rabbit: {
      top: 0,
      left: 0,
    },
    house: {
      top: 0,
      left: 0,
    },
    barrier: {
      top: 0,
      left: 0,
    },
  };

  deskNode.style.width = selectValue * 50 + "px";

  for (let i = 0; i < selectValue ** 2; i++) {
    createCell();
  }
  for (let index = 0; index < characters.length; index++) {
    const element = characters[index];
    const cellNode = createCell(element);

    charactersPositions[element].top = getRandomNumber(selectValue) * 50;
    charactersPositions[element].left = getRandomNumber(selectValue) * 50;

    if (index !== 0) {
      let newArr = characters.slice(0, index + 1);
      console.log(newArr, element);

      for (let j = newArr.length - 2; j >= 0; j--) {
        console.log(j, element, index);
        //  do {
        //    charactersPositions[element].top = getRandomNumber(selectValue) * 50;
        //   charactersPositions[element].left = getRandomNumber(selectValue) * 50;
        // } while (
        //   charactersPositions[characters[j]].top ===
        //      charactersPositions[characters[index]].top &&
        //    charactersPositions[characters[j]].left ===
        //     charactersPositions[characters[index]].left
        // );
      }
    }

    cellNode.style.left = charactersPositions[element].left + "px";
    cellNode.style.top = charactersPositions[element].top + "px";
  }

  console.log(charactersPositions);
}

function createCell(element = "") {
  const cellNode = document.createElement("div");
  const classList = element ? ["cell", element] : ["cell"];

  cellNode.classList.add(...classList);
  deskNode.appendChild(cellNode);

  if (element) {
    // for characters
    return cellNode;
  }
}

function getRandomNumber(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

// const leftPos = getRandomNumber(selectValue) * 50;
// const topPos = getRandomNumber(selectValue) * 50;
// cellNode.style.left = leftPos + "px";
// cellNode.style.top = topPos + "px";
