function startGame() {

    const mapContainer = document.querySelector(".map-container");
    const currentTile = document.querySelector(".curr-tile"); //inventory tile
    const tools = { "pickaxe": ["rocks"], "shovel": ["dirt"], "axe": ["wood", "leaves"], };
    const pickaxe = document.querySelector(".pickaxe img");
    const shovel = document.querySelector(".shovel img");
    const axe = document.querySelector(".axe img");
    let currentTool;
    let previousTool;
    
    
    if (currentTile.classList[1]) {
        currentTile.classList.remove(currentTile.classList[1]);    
    }
    
    function createMap() {
        mapContainer.innerHTML = "";
        /////creating the matrix and assigning classes to the tile divs/////
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

    //////Pick Tile from Map//////
    document.querySelectorAll('.tile').forEach(item => { //event listeners with "pickTileFromMap()" to all tiles but the sky tiles
        if (item.classList[1] !== "sky") {
            item.addEventListener('click', pickTileFromMap);
        }
    });

    function pickTileFromMap(event) {
        if (currentTool) { // if a tool has been chosen
            if (event.currentTarget.classList[1] !== "sky" && (tools[currentTool.classList[0]][0] === event.currentTarget.classList[1])
                || tools[currentTool.classList[0]][1] === event.currentTarget.classList[1]) {
                // if the clicked tile's [1] class isn't sky && if the theme class in the clicked tile is identical to the tools object value
                console.log("in if");
                if (currentTile.classList.length > 1) {
                    currentTile.classList.remove(currentTile.classList[1]);
                }
                currentTool.style.border = "5px solid blue";
                currentTile.classList.add(event.currentTarget.classList[1]); //adding the selected tile class to the inventory
                event.currentTarget.classList.remove(event.currentTarget.classList[1]); //removing theme-class and adding class 'sky' to the selected tile from map
                event.currentTarget.classList.add("sky");
                event.currentTarget.addEventListener("click", addTileToMap);//now we can add tiles from the inventory to this spot as well
                currentTile.style.border = "5px solid grey"; //returning the currTile border color to usual in case it was pushed
            }
            else {
                currentTool.style.border = "5px solid red";
            }
        }

    }


    ////Pick Tile from Inventory & Add tile from inventory to map////
    currentTile.addEventListener("click", pickTileFromInventory);

    document.querySelectorAll('.tile').forEach(item => { //event listeners with "pickTileFromInventory()" to all sky tiles
        if (item.classList[1] === "sky") {
            item.addEventListener('click', addTileToMap);
        }
    });

    let currentTileClicked = 0; //determines if the user clicked on the inventory tile

    function pickTileFromInventory(event) {
        if (event.currentTarget.classList.length > 1) { //if the inventory isn't empty
            currentTool.style.border = "5px solid grey";
            currentTile.style.border = "5px solid blue";
            currentTileClicked = 1; //now we can add the tile to the map
            currentTool = ""; //initializing the current tool so we won't pick another tile from map instead of adding
        }
        else {
            currentTile.style.border = "5px solid red";
        }
    }

    ///Add Tile to Map///

    function addTileToMap(event) {
        if (currentTile.classList.length > 1 && currentTileClicked && event.currentTarget.classList[1] === "sky") {
            event.currentTarget.classList.remove(event.currentTarget.classList[1]);
            event.currentTarget.classList.add(currentTile.classList[1]);
            currentTile.classList.remove(currentTile.classList[1]);
            event.currentTarget.removeEventListener("click", addTileToMap); //removing the eventlistener of adding tile to this spot
            event.currentTarget.addEventListener("click", pickTileFromMap); //adding eventlistener of picking tile from this spot
            currentTile.style.border = "5px solid grey";
            currentTileClicked = 0;
        }
    }


    /////Pick Tool//////

    function pickTool(event) {
        currentTile.style.border = "5px solid grey";
        if (previousTool) { //changing the previous tool border back to grey when choosing a new tool
            previousTool.style.border = "5px solid grey";
        }
        currentTool = event.currentTarget;
        previousTool = currentTool;
        currentTool.style.border = "5px solid blue";
        console.log(currentTool);
    }

    pickaxe.addEventListener("click", pickTool);
    shovel.addEventListener("click", pickTool);
    axe.addEventListener("click", pickTool);

}

startGame();

////RESET BUTTON/////
const resetButton = document.querySelector("button");
resetButton.addEventListener("click", startGame);
