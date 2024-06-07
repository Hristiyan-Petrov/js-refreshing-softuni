export const validateCube = (req, res, next) => {
    
    // TO DO: Better Error handling
    
    let isValid = true;
    
    if (req.body.name.trim().length < 3) {
        isValid = false;
    } else if (!req.body.imageUrl) {
        isValid = false;
    }

    if (isValid) {
        next();
    }
}