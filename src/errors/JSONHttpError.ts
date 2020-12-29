import HttpError from "./HttpError";

interface JSONResponse {
    status: number;
    message: string;
}

class JSONHttpError extends HttpError {
    constructor(status: number, message: string) {
        super(status, message);
    }

    jsonify(): JSONResponse {
        return {
            status: this.status,
            message: this.message
        };
    }
}

export default JSONHttpError;