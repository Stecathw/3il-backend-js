"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = exports.validateIdParam = void 0;
const validateIdParam = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send('ID parameter is missing');
    }
    if (isNaN(parseInt(id))) {
        return res.status(400).send('ID parameter must be a number');
    }
    next();
};
exports.validateIdParam = validateIdParam;
const validateBody = (req, res, next) => {
    // Check if the request body is empty
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send('Request body cannot be empty');
    }
    // Check if the required fields are present in the request body
    const { firstname, lastname, genreId } = req.body;
    if (!firstname || !lastname || !genreId) {
        return res.status(400).send('Missing required fields in request body');
    }
    // Check if genreId is a number
    if (typeof genreId !== 'number') {
        return res.status(400).send('genreId must be a number');
    }
    // Check if firstname and lastname are string and do not exceed a length of 30
    if (typeof firstname !== 'string') { // || firstname.length > 30 -> règles métiers à mettre dans service
        return res.status(400).send('Invalid firstname');
    }
    if (typeof lastname !== 'string') { // || lastname.length > 30
        return res.status(400).send('Invalid lastname');
    }
    next();
};
exports.validateBody = validateBody;
