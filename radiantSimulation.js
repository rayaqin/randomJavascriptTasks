const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const toggleCyclesLabel = document.getElementById("toggle_cycles_label");
const toggleCyclesCheckbox = document.getElementById("toggle_cycles");
toggleCyclesCheckbox.addEventListener("change", toggleCycles);

const toggleRadiantLabel = document.getElementById("toggle_radiant_label");
const toggleRadiantCheckbox = document.getElementById("toggle_radiant");
toggleRadiantCheckbox.addEventListener("change", handleRadiantToggle);

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", reset);


const cycleCountElement = document.getElementById("data_cycleCount");
const averageElement = document.getElementById("data_average");

const speedSlider = document.getElementById("speed_slider");
const noiseSlider = document.getElementById("noise_slider");
const attitudeSlider = document.getElementById("attitude_slider");
const quantitySlider = document.getElementById("quantity_slider");

speedSlider.addEventListener("input", handleSpeedSliderChange);
noiseSlider.addEventListener("input", handleNoiseSliderChange);
attitudeSlider.addEventListener("input", handleAttitudeSliderChange);
quantitySlider.addEventListener("input", handleQuantitySliderChange);

let currentInterval = null;
let runSpeed = parseFloat(speedSlider.value);
let noise = parseFloat(noiseSlider.value);
let attitudeStability = parseFloat(attitudeSlider.value);
let quantity = parseFloat(quantitySlider.value);

function handleSpeedSliderChange(event) {
  runSpeed = parseFloat(event.target.value);
  currentInterval && restartCycleWithNewSpeed();
}

function handleNoiseSliderChange(event) {
  noise = parseFloat(event.target.value);
}

function handleAttitudeSliderChange(event) {
  attitudeStability = parseFloat(event.target.value);
}

function handleQuantitySliderChange(event) {
  quantity = parseFloat(event.target.value);
  reset();
}



let cycleCount = 0;

const getNeighbourIds = (x, y, rowLength, columnLength) => {
  const possibleStepsAroundEntity = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];
  return possibleStepsAroundEntity.map(step => {
    let neighbourX = x + step[0];
    let neighbourY = y + step[1];
    if (neighbourX >= 0 && neighbourX < rowLength && neighbourY >= 0 && neighbourY < columnLength) {
      return `${neighbourX}_${neighbourY}`;
    }
  }).filter(Boolean);
};

let entityMatrix = [];
let entityMap = {};

const setDefaultEntities = () => {
  entityMatrix = new Array(quantity).fill(null).map((_, i) => new Array(quantity).fill(null).map((_, j) => ({
    id: `${i}_${j}`,
    matrixPosition: [i, j],
    width: canvas.width / quantity,
    height: canvas.height / quantity,
    status: "idle",
    attitude: 0.5,
    x: i * (canvas.width / quantity),
    y: j * (canvas.height / quantity),
    neighbourIds: getNeighbourIds(i, j, quantity, quantity),
  })));

  entityMap = entityMatrix.reduce((acc, row) => {
    row.forEach(entity => {
      acc[entity.id] = entity;
    });
    return acc;
  }, {});
};

const statusToColorMap = {
  "idle": "grey",
  "positive": "#2ca82c",
  "negative": "#a11f1f",
};

const executeOneCycle = () => {
  entityMatrix.forEach(row => row.forEach(entity => {
    if (entity.radiant) {
      return entity;
    }
    let newAttitude = getNewAttitude(entity);
    const accidentalCircumstance = Math.random() < noise;
    const fiftyFifty = Math.random() < 0.5 ? "positive" : "negative";
    const normalEnvironmentResult = Math.random() < newAttitude ? "positive" : "negative";
    const newStatus = accidentalCircumstance ? fiftyFifty : normalEnvironmentResult;

    entity.attitude = newAttitude;
    entity.status = newStatus;
  }));

  cycleCount++;
  if (cycleCount % 10 === 0) {
    cycleCountElement.innerHTML = cycleCount;
    const averageAttitude = entityMatrix.reduce((acc, row) => acc + row.reduce((acc, entity) => acc + entity.attitude, 0), 0) / (entityMatrix.length * entityMatrix[0].length);
    averageElement.innerHTML = averageAttitude.toFixed(3);
  }
  displayEntities();
};

const getNewAttitude = (entity) => {
  let newAttitude = entity.attitude;
  for (let neighbourId of entity.neighbourIds) {

    let neighbour = entityMap[neighbourId];
    if (neighbour?.status !== "idle") {
      newAttitude += neighbour.radiant ? 0.2 : neighbour.status === "positive" ? 0.05 : -0.05;
    }
  }

  return Math.min(Math.max(newAttitude, 0.3 - attitudeStability), 0.7 + attitudeStability);

};


const displayEntities = () => {
  for (let i = 0; i < entityMatrix.length; i++) {
    for (let j = 0; j < entityMatrix[i].length; j++) {
      let currentEntity = entityMatrix[i][j];
      ctx.fillStyle = currentEntity.radiant ? 'lightgreen' : statusToColorMap[currentEntity.status];
      ctx.fillRect(currentEntity.x - 1, currentEntity.y - 1, currentEntity.width - 1, currentEntity.height - 1);
      if (entityMatrix.length <= 16) {
        ctx.fillStyle = "white";
        ctx.fillText(currentEntity.attitude.toFixed(2), currentEntity.x + 5, currentEntity.y + 15);
      }
    }
  }
};

const makeEntityRadiant = (x, y) => {
  let entity = entityMatrix[x][y];
  entity.attitude = 1;
  entity.status = "positive";
  entity.radiant = true;
  displayEntities(entityMatrix);
};

const resetEntityToDefault = (x, y) => {
  let entity = entityMatrix[x][y];
  entity.attitude = 0.5;
  entity.status = "idle";
  entity.radiant = false;
  displayEntities(entityMatrix);
};

function toggleCycles() {
  if (currentInterval) {
    toggleCyclesLabel.innerHTML = "Run";
    clearInterval(currentInterval);
    currentInterval = null;
  } else {
    toggleCyclesLabel.innerHTML = "Stop";
    currentInterval = setInterval(() => {
      executeOneCycle();
    }, 1020 - runSpeed);
  }
};

const restartCycleWithNewSpeed = () => {
  clearInterval(currentInterval);
  currentInterval = setInterval(() => {
    executeOneCycle();
  }, 1020 - runSpeed);
};

function reset() {
  currentInterval && clearInterval(currentInterval);
  currentInterval = null;
  toggleCyclesCheckbox.checked = false;
  cycleCount = 0;
  cycleCountElement.innerHTML = cycleCount;
  averageElement.innerHTML = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setDefaultEntities();
  handleRadiantToggle();
  displayEntities();
};

function handleRadiantToggle() {
  let middle = Math.floor(quantity / 2);
  if (toggleRadiantCheckbox.checked) {
    toggleRadiantLabel.innerHTML = "Remove Radiant";
    makeEntityRadiant(middle, middle);
  } else {
    toggleRadiantLabel.innerHTML = "Add Radiant";
    resetEntityToDefault(middle, middle);
  }
}




setDefaultEntities();
displayEntities();
