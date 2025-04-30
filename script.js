const packs = [
  {
    name: "Pack Aventure",
    image: "https://via.placeholder.com/100",
    files: ["terrain.png", "skybox.jpg"]
  },
  {
    name: "Pack Futuriste",
    image: "https://via.placeholder.com/100",
    files: ["terrain.png", "hud.css"]
  },
  {
    name: "Pack Médiéval",
    image: "https://via.placeholder.com/100",
    files: ["armor.png", "weapons.png"]
  },
  // Ajoutez d'autres packs ici...
];

const selectedPacks = new Set();
const fileUsage = {};

function createPackElement(pack) {
  const packDiv = document.createElement("div");
  packDiv.className = "pack";
  packDiv.dataset.name = pack.name;

  const img = document.createElement("img");
  img.src = pack.image;
  img.alt = pack.name;

  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => togglePack(pack, packDiv));

  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(` ${pack.name}`));

  packDiv.appendChild(img);
  packDiv.appendChild(label);

  return packDiv;
}

function togglePack(pack, packDiv) {
  if (selectedPacks.has(pack)) {
    selectedPacks.delete(pack);
    pack.files.forEach(file => {
      if (fileUsage[file]) {
        fileUsage[file] = fileUsage[file].filter(p => p !== pack);
        if (fileUsage[file].length === 0) {
          delete fileUsage[file];
        }
      }
    });
  } else {
    selectedPacks.add(pack);
    pack.files.forEach(file => {
      if (!fileUsage[file]) {
        fileUsage[file] = [];
      }
      fileUsage[file].push(pack);
    });
  }
  updateConflicts();
}

function updateConflicts() {
  document.querySelectorAll(".pack").forEach(div => {
    div.classList.remove("incompatible");
  });

  const conflictList = document.getElementById("conflict-list");
  conflictList.innerHTML = "";

  for (const [file, packs] of Object.entries(fileUsage)) {
    if (packs.length > 1) {
      packs.forEach(pack => {
        const packDiv = document.querySelector(`.pack[data-name="${pack.name}"]`);
        if (packDiv) {
          packDiv.classList.add("incompatible");
        }
      });
      const li = document.createElement("li");
      li.textContent = `Conflit sur "${file}" entre : ${packs.map(p => p.name).join(", ")}`;
      conflictList.appendChild(li);
    }
  }
}

function init() {
  const packList = document.getElementById("pack-list");
  packs.forEach(pack => {
    const packElement = createPackElement(pack);
    packList.appendChild(packElement);
  });
}

init();
