class MapService {

    constructor() {
        this.backendUrl = './api/map';
        this.JWTToken = localStorage.getItem('jwtToken') || null; // Placeholder for JWT token if needed in the future
        this.fetchOptions = {
            headers: {
                'Authorization': `Bearer ${this.JWTToken}`
            }
        };
    }

    getCurrentPosition() {
        return fetch(`${this.backendUrl}/current_position`, this.fetchOptions)
            .then((response) => response.json())
            .catch(error => {
                console.error('Error fetching current position:', error);
                throw error;
            });
    }

    setCurrentPosition(newCurrentPosition) {
        return fetch(`${this.backendUrl}/${newCurrentPosition.x}/${newCurrentPosition.y}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.JWTToken}`
            },
            body: JSON.stringify(newCurrentPosition)
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error setting current position:', error);
            throw error;
        });
    }

    getMapData(y, x) {
        // TODO: Needs to be ajusted to fetch the correct map data from the tomcat backend, due to issues with the json-server working with :id's.
        console.log(`Fetching map data ...`);
        return fetch(`${this.backendUrl}/${x}/${y}`, this.fetchOptions)
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error fetching map data:', error);
                throw error;
            });
    }
}

const mapService = new MapService();

export { mapService };