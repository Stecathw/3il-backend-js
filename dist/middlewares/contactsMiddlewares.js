"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = exports.validateIdParam = void 0;
const validateIdParam = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'ID parameter is missing' });
    }
    if (isNaN(parseInt(id))) {
        return res.status(400).json({ message: 'ID parameter must be a number' });
    }
    next();
};
exports.validateIdParam = validateIdParam;
const validateBody = (req, res, next) => {
    // Check if the request body is empty
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Request body cannot be empty' });
    }
    // Check if the required fields are present in the request body
    const { firstname, lastname, genreId } = req.body;
    if (!firstname || !lastname || !genreId) {
        return res.status(400).json({ error: 'Missing required fields in request body' });
    }
    // Check if genreId is a number
    if (typeof genreId !== 'number') {
        return res.status(400).json({ message: 'genreId must be a number' });
    }
    // Check if firstname and lastname are string and do not exceed a length of 30
    if (typeof firstname !== 'string' || firstname.length > 30) {
        return res.status(400).send('Invalid firstname');
    }
    if (typeof lastname !== 'string' || lastname.length > 30) {
        return res.status(400).send('Invalid lastname');
    }
    next();
};
exports.validateBody = validateBody;
// function validateBody(req: Request, res: Response, next: NextFunction) {
//   // Check if the request body is empty
//   if (Object.keys(req.body).length === 0) {
//     return res.status(400).json({ error: 'Request body cannot be empty' });
//   }
//   // Check if the required fields are present in the request body
//   const { firstname, lastname, genreId } = req.body;
//   if (!firstname || !lastname || !genreId) {
//     return res.status(400).json({ error: 'Missing required fields in request body' });
//   }
//   // Check if the ID parameter is a valid number
//   const id = parseInt(req.params.id);
//   if (typeof id !== 'number' || isNaN(id)) {
//     return res.status(400).json({ error: 'Invalid ID parameter' });
//   }
//   // Attach the validated data to the request object for use in the route handler
//   req.ValidatedRequest = {
//     id,
//     firstname,
//     lastname,
//     genreId,
//   };
//   // Call the next middleware function
//   next();
// }
