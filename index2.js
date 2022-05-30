const selectNode = document.getElementById("select");
const startButtonNode = document.getElementById("start");
const deskNode = document.getElementById("desk");
const WOLF = "wolf";
const RABBIT = "rabbit";
const HOUSE = "house";
const BARRIER = "barrier";

const initialCharacters = [RABBIT, HOUSE];
const rules = {
  5: {
    txt: "5x5",
    wolfs: 3,
    barriers: 2,
  },
  7: {
    txt: "7x7",
    wolfs: 4,
    barriers: 3,
  },
  10: {
    txt: "10x10",
    wolfs: 5,
    barriers: 4,
  },
};

let selectedValue = selectNode.value;

selectNode.addEventListener("change", e => {
  selectedValue = e.target.value;
});

startButtonNode.addEventListener("click", e => {
  console.log("START", selectedValue);
  startGame();
});

function startGame() {
  const currentCharacters = [
    ...initialCharacters,
    ...Array.from(
      { length: rules[selectedValue].wolfs },
      (_, i) => WOLF + (i + 1)
    ),
    ...Array.from(
      { length: rules[selectedValue].barriers },
      (_, i) => BARRIER + (i + 1)
    ),
  ];

  const charactersPositions = generateCharactersPositions(currentCharacters);
  generateDesk();
  const { rabbitNode, wolfsNodes } = generateCharacters(charactersPositions);
  const barriersPositions = Object.keys(charactersPositions)
    .filter(character => character.replace(/[0-9]/g, "") === BARRIER)
    .map(character => charactersPositions[character]);

  document.addEventListener("keydown", e => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      const rabbitPosition = changeRabbitPosition(
        charactersPositions[RABBIT],
        barriersPositions,
        e.key
      );

      if (rabbitPosition) {
        charactersPositions[RABBIT] = rabbitPosition;
        rabbitNode.style.top = rabbitPosition.top + "px";
        rabbitNode.style.left = rabbitPosition.left + "px";
      }
    }
  });
}

function changeRabbitPosition(rabbitPosition, barrierPositions, direction) {
  const nextRabbitPosition = { ...rabbitPosition };
  let canChangePosition = true;

  if (direction === "ArrowLeft") {
    nextRabbitPosition.left =
      rabbitPosition.left - 50 < 0
        ? (selectedValue - 1) * 50
        : rabbitPosition.left - 50;
  } else if (direction === "ArrowRight") {
    nextRabbitPosition.left =
      rabbitPosition.left + 50 > (selectedValue - 1) * 50
        ? 0
        : rabbitPosition.left + 50;
  } else if (direction === "ArrowUp") {
    nextRabbitPosition.top =
      rabbitPosition.top - 50 < 0
        ? (selectedValue - 1) * 50
        : rabbitPosition.top - 50;
  } else if (direction === "ArrowDown") {
    nextRabbitPosition.top =
      rabbitPosition.top + 50 > (selectedValue - 1) * 50
        ? 0
        : rabbitPosition.top + 50;
  }

  for (const barrierPosition of barrierPositions) {
    if (
      nextRabbitPosition.left === barrierPosition.left &&
      nextRabbitPosition.top === barrierPosition.top
    ) {
      canChangePosition = false;
      break;
    }
  }

  return canChangePosition ? nextRabbitPosition : null;
}

function generateCharactersPositions(currentCharacters) {
  const charactersPositions = {};

  let i = 0;
  do {
    let isUnique = true;
    let currentCharacter = {};
    currentCharacter.left = getRandomNumber(selectedValue) * 50;
    currentCharacter.top = getRandomNumber(selectedValue) * 50;
    for (let character of Object.values(charactersPositions)) {
      if (
        character.top === currentCharacter.top &&
        character.left === currentCharacter.left
      ) {
        console.log("REGENERATE");
        isUnique = false;
        break;
      }
    }
    if (isUnique) {
      charactersPositions[currentCharacters[i]] = currentCharacter;
      ++i;
    }
  } while (
    Object.values(charactersPositions).length < currentCharacters.length
  );

  return charactersPositions;
}

function generateDesk() {
  deskNode.innerHTML = "";
  deskNode.style.width = selectedValue * 50 + "px";
  for (let i = 0; i < selectedValue ** 2; i++) {
    createCell();
  }
}

function generateCharacters(charactersPositions) {
  const wolfsNodes = {};
  let rabbitNode = null;

  for (let character of Object.keys(charactersPositions)) {
    const cellNode = createCell(character.replace(/[0-9]/g, ""));
    cellNode.style.left = charactersPositions[character].left + "px";
    cellNode.style.top = charactersPositions[character].top + "px";
    if (character === RABBIT) {
      rabbitNode = cellNode;
    } else if (character.replace(/[0-9]/g, "") === WOLF) {
      wolfsNodes[character] = cellNode;
    }
  }

  return { rabbitNode, wolfsNodes };
}

function createCell(element = "") {
  const cellNode = document.createElement("div");
  const classList = element ? ["cell", element] : ["cell"];

  cellNode.classList.add(...classList);
  deskNode.appendChild(cellNode);

  if (element) {
    if (element === RABBIT) {
      cellNode.id = element;
    }
    // for characters
    return cellNode;
  }
}

function getRandomNumber(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}
