const Calc = require('../schema/calcSchema')

const AddCalc = async (req, res) => {
    const { Data, Result } = req.body

    try {
        const task = new Calc({ Data, Result })
        await task.save()
        return res.status(201).json({ success: true, msg: 'Calculation added successfully' })
    } catch (err) {
        return res.status(500).send(err)
    }
}

const GetTask = async (req, res) => {
    try {
        const tasks = await Calc.find()
        if (tasks.length > 0) {
            return res.status(200).json({ success: true, msg: 'Fetched successfully', Tasks: tasks })
        }
        return res.status(200).json({ success: false, msg: 'fetch error' })
    } catch (err) {
        return res.status(500).send(err)
    }
}

const Delete = async (req, res) => {

    try {
        const deleted = await Calc.deleteMany()
        if (deleted) {
            return res.status(200).json({ success: true, msg: 'deleted' })
        }
        return res.status(200).json({ success: false, msg: 'delete error' })
    }
    catch (err) {
        return res.status(500).send(err)
    }
}

module.exports = {
    AddCalc,
    GetTask,
    Delete
}
