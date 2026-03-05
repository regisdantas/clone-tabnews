function status(request, response) {
    response.status(200).json({"message": "OK"});
}

export default status;
