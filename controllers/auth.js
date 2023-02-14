const { response, request } = require('express');


const login = async (req = request, res = response) => {
    res.json('Bienvenido')
}

module.exports = {
    login
}