const { response } = require('../helpers')
const transferModel = require('../models/transfer')

module.exports = {
    getTransfer: async function(req, res) {
        try {
            const result = await transferModel.getTransfer()
            res.status(200).send({
                data: result
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    getHistoryUser: async function(req, res) {
        try {
            const { id } = req.params
            let { order, page } = req.query
            if(!page) {
                page = 1
            } else {
                parseInt(page)
            }
            const offset = (2 * page) - 2
            const result = await transferModel.getHistoryUser(id, order, offset)
            response(res, 200, result)
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    postTransfer: async function(req, res) {
        try {
            const { id } = req.params
            const setData = req.body
            if(id === setData.id_receiver) {
                res.sendStatus(403)
            }
            setData.id_sender = parseInt(id)
            const result = await transferModel.postTransfer(parseInt(setData.id_receiver), setData)
            res.status(201).send({
                message: 'Success created a transfer',
                data: result
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    editTransfer: async function(req, res) {
        try {
            const { id } = req.params
            const setData = req.body
            const result = await transferModel.editTransfer(id, setData)
            res.status(201).send({
                message: 'Success edited a transfer',
                data: result.affectedRows
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    deleteTransfer: async function(req, res) {
        try {
            const { id } = req.params
            await transferModel.deleteTransfer(id)
            res.status(200).send({
                message: 'Success delete a log transfer'
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }
}