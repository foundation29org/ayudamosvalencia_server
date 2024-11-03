const Need = require('../models/need');

const createNeed = async (req, res) => {
    try {
        // Extraer los datos del body de la petición
        const { needs, otherNeeds, location, timestamp } = req.body;

        if ((!needs && !otherNeeds) || !location || !location.lat || !location.lng) {
            return res.status(400).json({
                success: false,
                message: 'Faltan datos requeridos'
            });
        }


        // Crear nueva instancia del modelo
        const newNeed = new Need({
            needs,
            otherNeeds,
            location: {
                lat: location.lat,
                lng: location.lng
            },
            timestamp: timestamp || new Date()
        });

        // Guardar en la base de datos
        await newNeed.save();

        // Responder con éxito
        res.status(201).json({
            success: true,
            data: newNeed,
            message: 'Necesidad registrada correctamente'
        });

    } catch (error) {
        console.error('Error al crear necesidad:', error);
        res.status(500).json({
            success: false,
            message: 'Error al procesar la solicitud',
            error: error.message
        });
    }
};

const getAllNeedsComplete = async (req, res) => {
    try {
        // Obtener todas las necesidades
        // Puedes añadir .sort({ timestamp: -1 }) si quieres ordenar por fecha descendente
        const needs = await Need.find({});

        res.status(200).json({
            success: true,
            data: needs,
            count: needs.length
        });

    } catch (error) {
        console.error('Error al obtener necesidades:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las necesidades',
            error: error.message
        });
    }
};

const getAllNeedsForHeatmap = async (req, res) => {
    try {
        const needs = await Need.find({});
        
        // Transformamos los datos antes de enviarlos
        const sanitizedNeeds = needs.map(need => ({
            needs: need.needs,
            location: need.location,
            timestamp: need.timestamp,
            _id: need._id,
            status: need.status,
            otherNeeds: need.otherNeeds ? '[Contenido privado]' : ''
        }));

        res.status(200).json({
            success: true,
            data: sanitizedNeeds,
            count: needs.length
        });

    } catch (error) {
        console.error('Error al obtener necesidades:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las necesidades',
            error: error.message
        });
    }
};

const deleteNeed = async (req, res) => {
    try {
        const { needId } = req.params;

        if (!needId) {
            return res.status(400).json({
                success: false,
                message: 'ID de necesidad no proporcionado'
            });
        }

        const deletedNeed = await Need.findByIdAndRemove(needId);

        if (!deletedNeed) {
            return res.status(404).json({
                success: false,
                message: 'Necesidad no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Necesidad eliminada correctamente'
        });

    } catch (error) {
        console.error('Error al eliminar necesidad:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la necesidad',
            error: error.message
        });
    }
};

//change status
const updateStatus = async (req, res) => {
    try {
        const { needId } = req.params;
        const { status } = req.body;

        if (!needId || !status) {
            return res.status(400).json({
                success: false,
                message: 'ID de necesidad y/o estado no proporcionado'
            });
        }

        const updatedNeed = await Need.findByIdAndUpdate(needId, { status }, { new: true });

        if (!updatedNeed) {
            return res.status(404).json({
                success: false,
                message: 'Necesidad no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedNeed,
            message: 'Estado actualizado correctamente'
        });

    } catch (error) {
        console.error('Error al actualizar estado de necesidad:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el estado de la necesidad',
            error: error.message
        });
    }
}

module.exports = {
    createNeed,
    getAllNeedsComplete,
    getAllNeedsForHeatmap,
    deleteNeed,
    updateStatus
}; 