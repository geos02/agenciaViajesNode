import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimonial.js';

const paginaInicio = async (req, res) => {

    // Consultar 3 viajes del Modelo Viajes y pasarlos a la Vista
    // Consultar 3 testimoniales del Modelo Testimoniales y pasarlos a la vista
    // Lo hacemos con Promise.all() porque mejora la performance, ejecuta los dos promises a la vez y en lugar de 1 detras de otro

    const promiseDB = [];

    promiseDB.push( Viaje.findAll({limit : 3}) );
    promiseDB.push( Testimonial.findAll({limit:3}) );

    try {
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina : 'Inicio',
            clase : 'home', 
            viajes : resultado[0],
            testimoniales : resultado[1]
        });
    } catch (error) {
        console.log(error);
    }

    
}

const paginaNosotros = (req,res) => {
    res.render('nosotros', {
        pagina : 'Nosotros'
    });
}

const paginaViajes = async (req,res) => {
    // Consultar BBDD
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina : 'Próximos Viajes',
        viajes
    })
}

const paginaTestimoniales = async (req,res) => {

    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina : 'Testimoniales',
            testimoniales
        })
    } catch (error) {
        console.log(error);
    }

}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where : { slug } });
        res.render('viaje', {
            pagina : 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}