import { Testimonial } from '../models/Testimonial.js';

const guardarTestimonial = async (req,res) => {

    // Validar formulario
    const { nombre, correo, mensaje } = req.body;
    const errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje : 'El Nombre esta vacío'});
    }

    if(correo.trim() === '') {
        errores.push({mensaje : 'El Correo esta vacío'});
    }

    if(mensaje.trim() == '') {
        errores.push({mensaje : 'El Mensaje esta vacío'});
    }

    // si hay errores, cargamos la vista otra vez pero pasando los errores
    if(errores.length > 0) {

        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina : 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        // Guardar testimonial en la BBDD

        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            res.redirect('/testimoniales');
        } catch(error){
            console.log(error);
        }
    }
    
};

export {
    guardarTestimonial
}