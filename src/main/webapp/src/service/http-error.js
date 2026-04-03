class HttpError extends Error {
    constructor(status, statusText, message) {
        super(message);
        this.status = status;
        this.statusText = statusText;
        this.name = 'HttpError';
    }
}

export { HttpError };