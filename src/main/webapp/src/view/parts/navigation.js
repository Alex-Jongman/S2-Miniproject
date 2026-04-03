import { mapService } from "../../service/map-service.js";

export class Navigation {

    constructor() {
        this.currentPosition = null;
        this.mapData = null;
    }

    updateData() {
        // initialize the location by fetching the current position and then the corresponding map data
        mapService.getCurrentPosition()
            .then(position => {
                this.currentPosition = position;
            })
            .then(() => {
                // currentPosition is now set, we can fetch the map data for that position
                mapService.getMapData(this.currentPosition.y, this.currentPosition.x)
                    .then((mapData) => {
                        // mapData is now available, we can store it in this instance and render the view
                        this.mapData = mapData;
                        this.render();
                    })
                    .catch(error => {
                        console.error('Error fetching map data:', error);
                    });
            })
            .catch(error => {
                console.error('Error initializing location:', error);
            });
    }

    initElements() {
        this.northWestButton = document.querySelector('#north-west');
        this.northButton = document.querySelector('#north');
        this.northEastButton = document.querySelector('#north-east');
        this.westButton = document.querySelector('#west');
        this.eastButton = document.querySelector('#east');
        this.southWestButton = document.querySelector('#south-west');
        this.southButton = document.querySelector('#south');
        this.southEastButton = document.querySelector('#south-east');

        this.titleElement = document.querySelector('.location-title');
        this.imageElement = document.querySelector('#location-image');

        this.addEventListeners();
    }

    addEventListeners() {
        this.northWestButton.addEventListener('click', () => this.navigate(-1, -1));
        this.northButton.addEventListener('click', () => this.navigate(-1, 0));
        this.northEastButton.addEventListener('click', () => this.navigate(-1, 1));
        this.westButton.addEventListener('click', () => this.navigate(0, -1));
        this.eastButton.addEventListener('click', () => this.navigate(0, 1));
        this.southWestButton.addEventListener('click', () => this.navigate(1, -1));
        this.southButton.addEventListener('click', () => this.navigate(1, 0));
        this.southEastButton.addEventListener('click', () => this.navigate(1, 1));
    }

    removeEventListeners() {
        this.northWestButton.removeEventListener('click', () => this.navigate(-1, -1));
        this.northButton.removeEventListener('click', () => this.navigate(-1, 0));
        this.northEastButton.removeEventListener('click', () => this.navigate(-1, 1));
        this.westButton.removeEventListener('click', () => this.navigate(0, -1));
        this.eastButton.removeEventListener('click', () => this.navigate(0, 1));
        this.southWestButton.removeEventListener('click', () => this.navigate(1, -1));
        this.southButton.removeEventListener('click', () => this.navigate(1, 0));
        this.southEastButton.removeEventListener('click', () => this.navigate(1, 1));
    }

    init() {
        this.initElements();
        this.updateData();
    }

    navigate(deltaY, deltaX) {
        const newX = this.currentPosition.x + deltaX;
        const newY = this.currentPosition.y + deltaY;

        // Update the current position
        this.currentPosition = { x: newX, y: newY };
        
        // send new position to the backend to update the current position
        mapService.setCurrentPosition(this.currentPosition)
            .then((newPosition) => {
                this.updateData(); // After successfully updating the position, fetch the new map data and render the view
            })
            .catch(error => {
                console.error('Error setting current position:', error);
            });
    }

    render() {
        // Debugging info
        console.log(`Rendering location at (${this.currentPosition.x}, ${this.currentPosition.y}) with map data:`, this.mapData);
        console.log(`Mapdata type: ${typeof this.mapData}, keys: ${Object.keys(this.mapData)}`);
        console.log(`Mapdata metadata:`, this.mapData.metadata);

        // Update the Title
        this.titleElement.textContent = `${this.mapData.metadata.name} (${this.currentPosition.x}, ${this.currentPosition.y})`;

        // Update the Image
        this.imageElement.setAttribute('src', `./images/${this.mapData.metadata.photo}`);
        this.imageElement.setAttribute('alt', `Location at (${this.currentPosition.x}, ${this.currentPosition.y})`);

        // Enable/Disable Navigation Buttons
        this.northWestButton.disabled = !this.mapData.deelmatrix[0][0];
        this.northButton.disabled = !this.mapData.deelmatrix[0][1];
        this.northEastButton.disabled = !this.mapData.deelmatrix[0][2];
        this.westButton.disabled = !this.mapData.deelmatrix[1][0];
        this.eastButton.disabled = !this.mapData.deelmatrix[1][2];
        this.southWestButton.disabled = !this.mapData.deelmatrix[2][0];
        this.southButton.disabled = !this.mapData.deelmatrix[2][1];
        this.southEastButton.disabled = !this.mapData.deelmatrix[2][2];
    }
}