exports.blog = (req, res) => {
    console.log('Base route')
    return res.json({
        message: 'This is the base route'
    })
}