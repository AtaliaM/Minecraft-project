function createMap() {

    const mapContainer = document.querySelector(".map-container");
    /////creating the matrix and assigning classes to the tile divs/////
    ///will be inside a makeScreen(). this function will be called also when clicking on the reset button///
    const matrix = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 4, 4, 4, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 3, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0],
        [2, 2, 2, 1, 1, 1, 1, 3, 1, 1, 2, 2, 1, 4, 4, 4, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],


    ];

    let tileId = 1;
    for (let rows = 0; rows < matrix.length; rows++) {

        for (let cols = 0; cols < matrix[rows].length; cols++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.setAttribute("id", String(tileId));

            if (matrix[rows][cols] === 0) {
                tile.classList.add("sky");
            }
            else if (matrix[rows][cols] === 1) {
                tile.classList.add("dirt");
            }
            else if (matrix[rows][cols] === 2) {
                tile.classList.add("rocks");
            }
            else if (matrix[rows][cols] === 3) {
                tile.classList.add("wood");
            }
            else if (matrix[rows][cols] === 4) {
                tile.classList.add("leaves");
            }

            mapContainer.appendChild(tile);
            tileId++;
        }
    }
}

createMap();
// document.body.appendChild(mapContainer);
