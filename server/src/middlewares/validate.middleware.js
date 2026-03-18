export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        return res.status(400).json({
            message: "Validation error",
            errors: error.issues.map(issue => ({
                field: issue.path[0],
                message: issue.message
            }))
        })
        
    }
}