const { Router } = require('express');
const { DoctorModel } = require('../model/doctor.model');

const doctorRouter = Router();

doctorRouter.get('/', async (req, res) => {
    try {
        res.send({ result: 'all doctors' });
    } catch (error) {
        console.log(error);
    }
})

doctorRouter.post('/appointments', async (req, res) => {
    try {
        const { name, image, specialization, experience, location, date, slots, fee } = req.body;
        const appointment = new DoctorModel({ name, image, specialization, experience, location, date, slots, fee });
        await appointment.save();
        res.send({ result: 'Appointment saved successfully' });
    } catch (error) {
        console.log(error);
    }
})


doctorRouter.get('/appointments', async (req, res) => {
    try {
        const { filter, sort, search } = req.query;
        console.log(filter, sort, search);

        const aggregation = [
            {
                '$match': {
                    'name': {
                        '$regex': search?search:''
                    }
                }
            },
        ];

        if (filter) {
            aggregation.push({
                '$match': {
                    'specialization': filter
                }
            })
        }
        if (sort) {
            aggregation.push({
                '$sort': {
                    'date': +sort
                }
            })
        }

        const allAppointments = await DoctorModel.aggregate(aggregation);
        res.send({ allAppointments });
    } catch (error) {
        console.log(error);
    }
})


doctorRouter.delete('/appointments/:id', async (req, res) => {
    try {
        const id=req.params.id;
        await DoctorModel.findByIdAndDelete(id);
        
        res.send({ result: 'Data deleted.' });
    } catch (error) {
        console.log(error);
    }
})

doctorRouter.put('/appointments/:id', async (req, res) => {
    try {
        const id=req.params.id;
        await DoctorModel.findByIdAndUpdate(id, {...req.body})
        
        res.send({ result: 'successfully update' });
    } catch (error) {
        console.log(error);
    }
})

module.exports = { doctorRouter };