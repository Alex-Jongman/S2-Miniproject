import { mapService } from "../../service/map-service.js";

export class Navigation {

    constructor() {
        this.currentPosition = null;
        this.mapData = null;
    }

    /**
     * Handles HTTP errors by redirecting to appropriate error pages based on status code.
     * @param {Error} error - The error object containing status information.
     * @returns {boolean} - Returns true if error was handled (redirected), false otherwise.
     */
    handleHttpError(error) {
        if (error?.status === 401) {
            window.location.href = './401.html';
            return true;
        } else if (error?.status === 403) {
            window.location.href = './403.html';
            return true;
        } else {
            window.location.href = './error.html';
            return true;
        }
    }

    getCurrentPosition() {
        return mapService.getCurrentPosition()
            .then(position => {
                this.currentPosition = position;
            })
            .catch(error => {
                console.error('Error fetching starting position:', error);
                this.handleHttpError(error);
            });
    }

    getMapDataForCurrentPosition() {
        try {
            if (!this.currentPosition) {
                throw new Error('Current position is not set. Cannot fetch map data.');
            }
            mapService.getMapData(this.currentPosition.y, this.currentPosition.x)
                .then(mapData => {
                    this.mapData = mapData;
                    this.render();
                })
                .catch(error => {
                    console.error('Error fetching map data for current position:', error);
                    this.handleHttpError(error);
                });
        } catch (error) {
            console.error('Error in getMapDataForCurrentPosition:', error);
            this.handleHttpError(error);
        }
    }

    initElements() {
        this.northWestButton = document.querySelector('#north-west');
        this.northButton = document.querySelector('#north');
        this.northEastButton = document.querySelector('#north-east');
        this.westButton = document.querySelector('#west');
        this.centerButton = document.querySelector('#center');
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
        this.centerButton.addEventListener('click', () => this.interact());
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
        this.centerButton.removeEventListener('click', () => this.interact());
        this.eastButton.removeEventListener('click', () => this.navigate(0, 1));
        this.southWestButton.removeEventListener('click', () => this.navigate(1, -1));
        this.southButton.removeEventListener('click', () => this.navigate(1, 0));
        this.southEastButton.removeEventListener('click', () => this.navigate(1, 1));
    }

    init() {
        this.initElements();
        this.getCurrentPosition()
            .then(() => {
                this.getMapDataForCurrentPosition();
            })
            .catch(error => {
                console.error('Error initializing navigation:', error);
                this.handleHttpError(error);
            });
    }

    navigate(deltaY, deltaX) {
        const newX = this.currentPosition.x + deltaX;
        const newY = this.currentPosition.y + deltaY;

        // Update the current position
        this.currentPosition = { x: newX, y: newY };
        
        // send new position to the backend to update the current position
        mapService.setCurrentPosition(this.currentPosition)
            .then((newPosition) => {
                this.getMapDataForCurrentPosition();
            })
            .catch(error => {
                console.error('Error setting current position:', error);
                this.handleHttpError(error);
            });
    }

    interact() {
        let message = `Interacting with the environment at (${this.currentPosition.x}, ${this.currentPosition.y})...`;
        
        if (this.currentPosition.x == 2 && this.currentPosition.y == 1) {
            message = "Papier hier!!!";
        }
        if (this.currentPosition.x == 4 && this.currentPosition.y == 1) {
            message = "Het is hier een gekkenhuis, mijn code werkt niet meer, help!!!";
        }
        if (this.currentPosition.x == 2 && this.currentPosition.y == 2) {
            message = "Yuppie, een vlucht met de Pagode !";
        }
        alert(message);
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
        // The center button should be enabled depending on the metadata interactable property.
        this.centerButton.disabled = !this.mapData.metadata.interactable;
        this.eastButton.disabled = !this.mapData.deelmatrix[1][2];
        this.southWestButton.disabled = !this.mapData.deelmatrix[2][0];
        this.southButton.disabled = !this.mapData.deelmatrix[2][1];
        this.southEastButton.disabled = !this.mapData.deelmatrix[2][2];
    }
}