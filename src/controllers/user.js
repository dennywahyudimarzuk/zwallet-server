const bcrypt = require('bcrypt')
const userModels = require('../models/user')
const { checkUser } = require('../models/auth')
const { response } = require('../helpers')

module.exports = {
    searchAll: async function(req, res) {
        try {
            const { id } = req.token
            const result = await userModels.searchAll(id)
            response(res, 200, result)
        } catch (error) {
            response(res, 500, { message: error.message})
        }
    },
    searchOneById: async function(req, res) {
        try {
            const { id } = req.params
            const token_id = req.token.id
            const result = await userModels.searchOneById(id, token_id)
            response(res, 200, result)
        } catch (error) {
            response(res, 500, { message: error.message })
        }
    },
    searchByName: async function(req, res) {
        try {
            const { q } = req.query
            const { id } = req.params
            const result = await userModels.searchByName(id, q)
            response(res, 200, result)
        } catch (error) {
            response(res, 500, { message: error.message })
        }
    },
    getAllUser: async function(req, res) {
        try {
            const result = await userModels.getAllUser()
            response(res, 200, result)
        } catch (error) {
            response(res, 500, { message: error.message })
        }
    },
    editUser: async function(req, res) {
        try {
            const { id } = req.params
            const setData = req.body

            if(req.file) {
                setData.photo = req.file.filename
            }

            if(setData.currPassword && setData.newPassword) {
                const response = await checkUser(req.token)
                const check = bcrypt.compareSync(setData.currPassword, response[0].password)
                if(check) {
                    const salt = bcrypt.genSaltSync(10)
                    const hash = bcrypt.hashSync(setData.newPassword, salt)
                    setData.password = hash
                    delete setData.currPassword
                    delete setData.newPassword
                } else {
                    res.sendStatus(403)
                }
            }

            const result = await userModels.editUser(id, setData)
            if(result.affectedRows) {
                res.sendStatus(201)
            }
            
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    }
}