class Build {

    static buildMessage (message, id) {
        return {
            "recipient": {
                "id": id
            },
            "message": {
                "text": message
            }
        }
    }

}

module.exports = {
    Build
}