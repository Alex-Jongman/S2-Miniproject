class BackendService {

    constructor() {
        this.backendUrl = 'http://localhost:3000';
    }

    getCurrentPosition() {
        return fetch(`${this.backendUrl}/current_position`)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching current position:', error);
                throw error;
            });
    }

    setCurrentPosition(newCurrentPosition) {
        return fetch(`${this.backendUrl}/current_position`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCurrentPosition)
        })
        .then(response => response.json())
        .catch(error => {
            console.error('Error setting current position:', error);
            throw error;
        });
    }

    getMapData(y, x) {
        // TODO: Needs to be ajusted to fetch the correct map data from the tomcat backend, due to issues with the json-server working with :id's.
        console.log(`Fetching map data ...`);
        return fetch(`${this.backendUrl}/map`)
            .then(response => response.json())
            .then(mapData => {
                console.log('Map data received:', mapData);
                return mapData[y][x];
            })
            .catch(error => {
                console.error('Error fetching map data:', error);
                throw error;
            });
    }
}

const backendService = new BackendService();

export { backendService };