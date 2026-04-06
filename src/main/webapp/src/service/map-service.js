import { HttpError } from './http-error.js';

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

    /**
     * Centralized response handler that validates HTTP status and propagates error information.
     * @param {Response} response - The fetch response object.
     * @returns {Promise<any>} - Parsed JSON response.
     * @throws {HttpError} - Custom error with status, statusText, and message.
     */
    handleResponse(response) {
        if (!response.ok) {
            const error = new HttpError(
                response.status,
                response.statusText || `HTTP ${response.status}`,
                `Request failed with status ${response.status}`
            );
            throw error;
        }
        return response.json();
    }

    getCurrentPosition() {
        return fetch(`${this.backendUrl}/current_position`, this.fetchOptions)
            .then((response) => this.handleResponse(response))
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
        .then((response) => this.handleResponse(response))
        .catch((error) => {
            console.error('Error setting current position:', error);
            throw error;
        });
    }

    getMapData(y, x) {
        console.log(`Fetching map data ...`);
        return fetch(`${this.backendUrl}/${x}/${y}`, this.fetchOptions)
            .then((response) => this.handleResponse(response))
            .catch((error) => {
                console.error('Error fetching map data:', error);
                throw error;
            });
    }
}

const mapService = new MapService();

export { mapService };