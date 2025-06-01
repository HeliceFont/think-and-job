import React, { useState } from 'react';
import { Briefcase, Users, DollarSign, Clock, LayoutGrid, Search, MessageSquare, User, Mail, Phone, Building, MessageSquareText, CheckCircle, Quote } from 'lucide-react';
import { HeaderText } from './ui/HeaderText';
import Magnet from './ui/Magnet';

import Aurora from './ui/Aurora';
import TrueFocus from './ui/TrueFocus';
import mujer1 from '../assets/mujer1.png';
import mujer2 from '../assets/mujer2.png';
import hombre from '../assets/hombre.png';
import ScrollVelocity from './ui/ScrollVelocity';

// // Define custom Tailwind CSS colors for the application
// const colors = {
//     'thinkjob-dark-green': '#105A63',
//     'thinkjob-yellow-orange': '#FFB203',
//     'thinkjob-light-bluish-white': '#FAFEFF',
//     'thinkjob-light-green': '#5CDFA9',
// };


export const LandingMain = () => {
    // Main App component for the landing page

    // Añade esta línea para definir velocity
    const [velocity] = useState(100);

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        needs: '',
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send this data to a backend server.
        // For this example, we'll just log it to the console.
        console.log('Formulario enviado:', formData);
        alert('¡Gracias por tu solicitud! Un asesor de Think&Job te contactará pronto.');
        setFormData({
            name: '',
            company: '',
            email: '',
            phone: '',
            needs: '',
        }); // Clear form after submission
    };


    return (
        <div>
            {/*  Main container with light bluish white background and Sora font */}
            <div className="font-sora bg-teal-100 text-gray-800 mt-6">
                {/* Hero Section */}
                <section id="home" className="relative text-white py-0 px-6 md:py-32 overflow-hidden">
                    {/* Contenedor del efecto Aurora con altura controlada */}
                    <div className="absolute inset-0 w-full">
                        <Aurora
                            colorStops={[
                                "#105A63",  // Verde teal oscuro
                                "#5CDFA9",  // Verde menta claro
                                "#105A63"   // Verde teal oscuro
                            ]}
                            blend={0.6}
                            amplitude={0.8}
                            speed={0.5}
                            height="100%"
                            maxHeight="600px"
                        />
                    </div>

                    {/* Ajusta el espaciado y la estructura del contenido */}
                    <div className="container mx-auto flex flex-col md:flex-row items-start justify-between z-20 relative px-0">
                        <div className="w-full md:w-1/2 flex flex-col items-start justify-start mb-10 md:mb-0 pt-16 md:pt-0 px-0">
                            <div className="w-full max-w-fit"> {/* Cambiado aquí */}
                                <TrueFocus
                                    sentence="Think & Job"
                                    manualMode={false}
                                    blurAmount={3}
                                    borderColor="#FFB900"
                                    glowColor="rgba(92, 223, 169, 0.6)"
                                    animationDuration={1}
                                    pauseBetweenAnimations={1}
                                    className="text-left text-teal-950 font-bold leading-tight 
                                        [text-shadow:_1px_1px_0_rgb(92_223_169),_-1px_-1px_0_rgb(92_223_169),_1px_-1px_0_rgb(92_223_169),_-1px_1px_0_rgb(92_223_169)]"
                                />
                            </div>
                            <div className="flex flex-col mt-12 mb-6  md:items-start"> {/* Contenedor añadido */}
                                <HeaderText
                                    texts={['RRHH Automatizado', 'Tu Equipo de RRHH Externalizado', 'Gestión de Nóminas Sin Errores', 'Planificación de Turnos Inteligente', ' Productividad en tu Empresa', 'Formación de Empleados Centralizada', ' Ahorro de Costes en RRHH Real', 'Firma Digital de Documentos', ' Contratación Simplificada', 'Flexibilidad Laboral Garantizada', ' Contratación Simplificada', 'Gestión de Personal Eficiente']}
                                    mainClassName="px-2 font-bold sm:px-2 md:px-3 bg-[#FFB900] text-teal-950 overflow-hidden py-0.5 sm:py-1 md:py-2 rounded-lg inline-flex w-fit"
                                    staggerFrom={"last"}
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "-120%" }}
                                    staggerDuration={0.025}
                                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1 whitespace-nowrap" // Añadido whitespace-nowrap
                                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                    rotationInterval={4000}
                                />
                            </div>
                            <h2 className="text-2xl text-teal-950 md:text-5xl font-extrabold leading-tight mb-6 text-left">
                                El punto de encuentro entre la eficiencia empresarial y el talento profesional
                            </h2>
                            <p className="text-lg text-left  text-teal-950 font-semibold md:text-xl mb-8 pr-8 opacity-90">
                                Una plataforma para gestionar, contratar y crecer. <br /> En THINK&JOB disponemos de un grupo de expertos con una gran formación y amplia experiencia en el ámbito de los Recursos Humanos.
                            </p>
                            {/* <a href="#contact" className="inline-block bg-[#FFB203] text-[#105A63] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105">
                                Solicitar información
                            </a> */}
                            <Magnet
                                padding={50}
                                disabled={false}
                                magnetStrength={2}
                                innerClassName="bg-amber-400 font-bold p-4 rounded-sm text-teal-950"
                            >
                                <a href="#contact">
                                    <p >Solicitar información!</p>
                                </a>
                            </Magnet>
                            <p className="mt-6 text-lg text-left text-gray-700">
                                ¿Buscas empleo? <a href="#workers" className="text-teal-950 hover:underline font-semibold">Inscríbete en nuestra bolsa de trabajo</a>
                            </p>
                        </div>
                        {/* Columna derecha - Imágenes */}
                        <div className="w-full md:w-1/2 relative h-[100px] sm:h-[400px] md:h-[500px] mt-0 md:mt-0">
                            {/* Segunda mujer */}
                            <div className="absolute left-0 bottom-0 w-32 sm:w-40 md:w-48 lg:w-64 z-20 transform hover:scale-105 transition-duration-300 [mask-image:linear-gradient(to_top,transparent,black_50%)]">
                                <img
                                    src={mujer2}
                                    alt="Profesional mujer 2"
                                    className="w-full h-auto filter brightness-90 object-cover"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/300x400/105A63/FAFEFF?text=Imagen+no+disponible";
                                    }}
                                />
                            </div>

                            {/* Primera mujer */}
                            <div className="absolute right-0 bottom-0 w-32 sm:w-40 md:w-48 lg:w-64 z-10 transform hover:scale-105 transition-duration-300 [mask-image:linear-gradient(to_top,transparent,black_50%)]">
                                <img
                                    src={mujer1}
                                    alt="Profesional mujer 1"
                                    className="w-full h-auto filter brightness-90"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/300x400/105A63/FAFEFF?text=Imagen+no+disponible";
                                    }}
                                />
                            </div>

                            {/* Hombre central */}
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-48 sm:w-52 md:w-58 lg:w-96 z-0 transform hover:scale-105 transition-duration-300 translate-y-4 [mask-image:linear-gradient(to_top,transparent,black_50%)]">
                                <img
                                    src={hombre}
                                    alt="Profesional hombre"
                                    className="w-full h-auto filter brightness-100"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/300x400/105A63/FAFEFF?text=Imagen+no+disponible";
                                    }}
                                />
                            </div>


                        </div>
                    </div>
                </section>
                <div className='overflow-hidden relative z-10'>
                <ScrollVelocity
                    texts={['- RRHH en esencia 4.0 - RRHH en esencia 4.0 - RRHH en esencia 4.0 - RRHH en esencia 4.0 - RRHH en esencia 4.0 - RRHH en esencia 4.0 - RRHH en esencia 4.0 - RRHH en esencia 4.0 - RRHH en esencia 4.0 - RRHH en esencia 4.0 - RRHH en esencia 4.0 - RRHH en esencia 4.0 ', 'Think&Job  Think&Job  Think&Job  Think&Job  Think&Job  Think&Job  Think&Job  Think&Job Think&Job  Think&Job  Think&Job  Think&Job  Think&Job  Think&Job  Think&Job  Think&Job ']}
                    velocity={velocity}
                    className="custom-scroll-text   font-thin"
                />
                </div>

                {/* Companies Section */}
                <section id="companies" className="py-16 px-6 md:py-24 bg-thinkjob-light-bluish-white">
                    <div className="container mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-thinkjob-dark-green text-center mb-12">
                            Somos especialistas en personas
                        </h2>
                        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
                            Nuestro objetivo es generar un impacto positivo tanto en las personas como en tu  equipo  de  trabajo.  Ofrecemos  profesionalidad  y  compromiso  con  plena dedicación en el sector cuidando lo que más importa, el bienestar de tu equipo.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Benefit Card 1 */}
                            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                                <Briefcase className="text-thinkjob-yellow-orange mb-4" size={48} />
                                <h3 className="text-xl font-semibold text-thinkjob-dark-green mb-3">Gestión 360° de empleados</h3>
                                <p className="text-gray-600">
                                    Altas de trabajadores, elaboración de contratos (con firma digital), cálculo de nóminas, planificación de turnos, coordinación de formación y más. Nos ocupamos de todo el ciclo de vida del empleado.
                                </p>
                            </div>
                            {/* Benefit Card 2 */}
                            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                                <DollarSign className="text-thinkjob-yellow-orange mb-4" size={48} />
                                <h3 className="text-xl font-semibold text-thinkjob-dark-green mb-3">Tarifa plana por empleado</h3>
                                <p className="text-gray-600">
                                    Simplificamos tu presupuesto con una cuota fija por trabajador gestionado, sin costes sorpresa ni sobrecargos en periodos de alta actividad.
                                </p>
                            </div>
                            {/* Benefit Card 3 */}
                            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                                <Users className="text-thinkjob-yellow-orange mb-4" size={48} />
                                <h3 className="text-xl font-semibold text-thinkjob-dark-green mb-3">Sin necesidad de personal extra</h3>
                                <p className="text-gray-600">
                                    Olvídate de contratar refuerzos temporales de RRHH en temporada alta; nuestro servicio integral absorbe los picos de trabajo, cubriendo tus necesidades puntuales sin aumentar tu plantilla interna.
                                </p>
                            </div>
                            {/* Benefit Card 4 */}
                            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                                <LayoutGrid className="text-thinkjob-yellow-orange mb-4" size={48} />
                                <h3 className="text-xl font-semibold text-thinkjob-dark-green mb-3">Plataforma unificada y comunicación interna</h3>
                                <p className="text-gray-600">
                                    Toda la información de RRHH está centralizada en un solo sistema accesible 24/7, con datos siempre actualizados. Empleadores y empleados pueden comunicarse fácilmente mediante herramientas integradas, mejorando la coordinación y la productividad.
                                </p>
                            </div>
                            {/* Benefit Card 5 */}
                            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                                <Search className="text-thinkjob-yellow-orange mb-4" size={48} />
                                <h3 className="text-xl font-semibold text-thinkjob-dark-green mb-3">Bolsa de talento a tu disposición</h3>
                                <p className="text-gray-600">
                                    ¿Necesitas incorporar personal? Dispondrás de acceso preferente a nuestra bolsa de empleo con candidatos evaluados. Cubre vacantes de forma ágil y encuentra trabajadores cualificados.
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            {/* <a href="#contact" className="inline-block bg-thinkjob-yellow-orange bg-amber-400 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105">
                                Contáctanos
                            </a> */}
                            <Magnet
                                padding={50}
                                disabled={false}
                                magnetStrength={2}
                                innerClassName="bg-amber-400 font-bold p-4 rounded-sm text-teal-950"
                            >
                                <a href="#contact">
                                    <p >Contáctanos</p>
                                </a>
                            </Magnet>

                        </div>
                    </div>
                </section>

                {/* Workers Section */}
                <section id="workers" className="py-16 px-6 md:py-24 bg-thinkjob-dark-green text-teal-950">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
                            Trabajadores: Únete a nuestra bolsa de empleo
                        </h2>
                        <p className="text-lg opacity-90 max-w-3xl mx-auto mb-12">
                            Think&Job también piensa en los profesionales. Si estás buscando trabajo, te ofrecemos una manera sencilla de conectar con las mejores empresas. Inscríbete gratis en nuestra bolsa de empleo y sube tu currículum una sola vez; las empresas clientes de Think&Job podrán ver tu perfil y contar contigo para futuras oportunidades laborales.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Worker Benefit 1 */}
                            <div className="bg-thinkjob-dark-green/70 p-8 rounded-xl shadow-lg flex flex-col items-center text-center border border-thinkjob-light-green transform hover:scale-105 transition-transform duration-300">
                                <MessageSquare className="text-thinkjob-light-green mb-4" size={48} />
                                <h3 className="text-xl font-semibold mb-3">Visibilidad ante grandes empresas</h3>
                                <p className="text-gray-700">
                                    Tu CV estará accesible para numerosas compañías de primer nivel que usan Think&Job, aumentando tus posibilidades de ser contactado para un empleo.
                                </p>
                            </div>
                            {/* Worker Benefit 2 */}
                            <div className="bg-thinkjob-dark-green/70 p-8 rounded-xl shadow-lg flex flex-col items-center text-center border border-thinkjob-light-green transform hover:scale-105 transition-transform duration-300">
                                <CheckCircle className="text-thinkjob-light-green mb-4" size={48} />
                                <h3 className="text-xl font-semibold mb-3">Candidatura fácil y centralizada</h3>
                                <p className="text-gray-700">
                                    Evita rellenar mil formularios. Con un solo registro podrás postular a múltiples ofertas y gestionar toda tu documentación en la misma plataforma.
                                </p>
                            </div>
                            {/* Worker Benefit 3 */}
                            <div className="bg-thinkjob-dark-green/70 p-8 rounded-xl shadow-lg flex flex-col items-center text-center border border-thinkjob-light-green transform hover:scale-105 transition-transform duration-300">
                                <DollarSign className="text-thinkjob-light-green mb-4" size={48} />
                                <h3 className="text-xl font-semibold mb-3">Sin coste para ti</h3>
                                <p className="text-gray-700">
                                    Apuntarte a la bolsa de empleo de Think&Job es completamente gratuito. Nosotros te conectamos con oportunidades que encajen con tu perfil.
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            {/* <a href="#contact" className="inline-block bg-amber-400 text-thinkjob-dark-green font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105">
                                Inscribirse ahora
                            </a> */}

                            <Magnet
                                padding={50}
                                disabled={false}
                                magnetStrength={2}
                                innerClassName="bg-amber-400 p-4  rounded-sm text-teal-950 font-bold"
                            >
                                <a href="#contact">
                                    Inscribirse ahora
                                </a>
                            </Magnet>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-16 px-6 md:py-24 bg-thinkjob-light-bluish-white">
                    <div className="container mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-thinkjob-dark-green text-center mb-12">
                            Testimonios de clientes satisfechos
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {/* Testimonial 1 */}
                            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                                <Quote className="text-thinkjob-light-green mb-4" size={32} />
                                <p className="text-gray-700 italic mb-4">
                                    "Gracias a Think&Job hemos podido externalizar la gestión de nuestro personal de forma integral. En menos de un mes notamos la diferencia: ahora dedicamos mucho menos tiempo a trámites de nóminas y contratos, ahorrando costes en RRHH, y sin tener que contratar personal extra en épocas punta. El equipo de Think&Job se encarga de todo con gran profesionalidad."
                                </p>
                                <div className="flex items-center mt-4">
                                    <img
                                        src="https://placehold.co/60x60/5CDFA9/105A63?text=AL"
                                        alt="Avatar Ana López"
                                        className="w-12 h-12 rounded-full mr-4 border-2 border-thinkjob-yellow-orange"
                                    />
                                    <div>
                                        <p className="font-semibold text-thinkjob-dark-green">Ana López</p>
                                        <p className="text-sm text-gray-500">Directora de RRHH, FashionRetail S.A.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Testimonial 2 */}
                            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                                <Quote className="text-thinkjob-light-green mb-4" size={32} />
                                <p className="text-gray-700 italic mb-4">
                                    "La plataforma de Think&Job ha mejorado la comunicación con nuestros empleados. Podemos gestionar los turnos y las formaciones de manera transparente y todos usan la misma herramienta, lo que ha aumentado la productividad del equipo y la satisfacción general. Para nosotros, Think&Job se ha vuelto indispensable en el día a día."
                                </p>
                                <div className="flex items-center mt-4">
                                    <img
                                        src="https://placehold.co/60x60/5CDFA9/105A63?text=JM"
                                        alt="Avatar Jorge Martínez"
                                        className="w-12 h-12 rounded-full mr-4 border-2 border-thinkjob-yellow-orange"
                                    />
                                    <div>
                                        <p className="font-semibold text-thinkjob-dark-green">Jorge Martínez</p>
                                        <p className="text-sm text-gray-500">Gerente de Operaciones, TechServicios</p>
                                    </div>
                                </div>
                            </div>
                            {/* Testimonial 3 */}
                            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                                <Quote className="text-thinkjob-light-green mb-4" size={32} />
                                <p className="text-gray-700 italic mb-4">
                                    "Antes invertíamos horas en papeleo y cálculos de nómina; ahora Think&Job lo hace todo por nosotros, cumpliendo con la normativa y sin errores. Su modelo de tarifa plana nos permite planificar mejor el presupuesto, y su equipo de especialistas en RRHH es como una extensión de nuestra empresa. ¡La tranquilidad que nos aporta no tiene precio!"
                                </p>
                                <div className="flex items-center mt-4">
                                    <img
                                        src="https://placehold.co/60x60/5CDFA9/105A63?text=LG"
                                        alt="Avatar Lucía Gómez"
                                        className="w-12 h-12 rounded-full mr-4 border-2 border-thinkjob-yellow-orange"
                                    />
                                    <div>
                                        <p className="font-semibold text-thinkjob-dark-green">Lucía Gómez</p>
                                        <p className="text-sm text-gray-500">CEO, Hoteles Sol</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Companies Logos */}
                        <div className="text-center mt-16">
                            <h3 className="text-2xl font-bold text-thinkjob-dark-green mb-8">Empresas que confían en Think&Job:</h3>
                            <div className="flex flex-wrap justify-center items-center gap-8">
                                {/* Placeholder logos */}
                                {/* <img src="#" alt="FashionRetail S.A. Logo" className="h-16 w-auto object-contain rounded-lg shadow-md p-2" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x80/FAFEFF/105A63?text=Logo"; }} />
                                <img src="#" alt="TechServicios Logo" className="h-16 w-auto object-contain rounded-lg shadow-md p-2" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x80/FAFEFF/105A63?text=Logo"; }} />
                                <img src="#" alt="Hoteles Sol Logo" className="h-16 w-auto object-contain rounded-lg shadow-md p-2" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x80/FAFEFF/105A63?text=Logo"; }} />
                                <img src="#" alt="AgroMarket S.L. Logo" className="h-16 w-auto object-contain rounded-lg shadow-md p-2" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x80/FAFEFF/105A63?text=Logo"; }} />
                                <img src="#" alt="TransLogix Logo" className="h-16 w-auto object-contain rounded-lg shadow-md p-2" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x80/FAFEFF/105A63?text=Logo"; }} /> */}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-16 px-6 md:py-24 bg-thinkjob-dark-green text-teal-950">
                    <div className="container mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
                            Contáctanos
                        </h2>
                        <p className="text-lg opacity-90 text-center max-w-3xl mx-auto mb-12">
                            ¿Listo para transformar la gestión de tu personal? Cuéntanos las necesidades de tu empresa y te propondremos una solución a medida. Rellena el siguiente formulario y un asesor de Think&Job te contactará en menos de 24 horas:
                        </p>

                        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg text-gray-800">
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre (y apellidos)
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-thinkjob-yellow-orange focus:border-thinkjob-yellow-orange sm:text-sm"
                                        placeholder="Tu nombre completo"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                    Empresa
                                </label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-thinkjob-yellow-orange focus:border-thinkjob-yellow-orange sm:text-sm"
                                        placeholder="Nombre de tu empresa"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Correo electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-thinkjob-yellow-orange focus:border-thinkjob-yellow-orange sm:text-sm"
                                        placeholder="tu.correo@ejemplo.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Teléfono
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-thinkjob-yellow-orange focus:border-thinkjob-yellow-orange sm:text-sm"
                                        placeholder="Ej: +34 600 123 456"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="needs" className="block text-sm font-medium text-gray-700 mb-2">
                                    Necesidades de personal: ¿Qué tipo de puestos o cuántos trabajadores necesitas?
                                </label>
                                <div className="relative">
                                    <MessageSquareText className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <textarea
                                        id="needs"
                                        name="needs"
                                        value={formData.needs}
                                        onChange={handleChange}
                                        rows="4"
                                        className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-thinkjob-yellow-orange focus:border-thinkjob-yellow-orange sm:text-sm"
                                        placeholder="Describe brevemente tus necesidades..."
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <div className="text-center">
                                {/* <button
                                    type="submit"
                                    className="inline-block bg-amber-400 text-thinkjob-dark-green font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
                                >
                                    Enviar solicitud
                                </button> */}
                                <Magnet
                                    padding={50}
                                    disabled={false}
                                    magnetStrength={2}
                                    innerClassName="bg-amber-400 font-bold p-4 rounded-sm text-teal-950 inline-block bg-amber-400 text-thinkjob-dark-green font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 "
                                >
                                    <button
                                        type="submit"
                                    >
                                        Enviar solicitud
                                    </button>
                                </Magnet>
                            </div>
                            <p className="text-center text-gray-600 text-sm mt-4">
                                Nota: Tus datos estarán protegidos según la normativa GDPR. Tras enviarnos tu solicitud, un especialista de Think&Job te contactará para analizar cómo podemos ayudarte.
                            </p>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    )
}
