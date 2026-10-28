/* ==========================================================================
   CONFIGURACIÓN DEL SITIO — Gimnasio Campestre Los Arrayanes
   Esta es la única parte del sitio que normalmente hay que editar en JS.
   Edita solo lo que está entre comillas; no borres comas ni llaves.
   ========================================================================== */
window.GCA_CONFIG = {

  /* --- Contacto ---------------------------------------------------------- */
  whatsapp: '573138512776',              // formato internacional, sin + ni espacios
  whatsappVisible: '313 851 2776',
  correo: 'info@gimnasiocampestrelosarrayanesedu.com',
  instagram: 'https://www.instagram.com/gimnasio_campestrelosarrayanes/?hl=es',

  /* --- Mensajes prellenados de WhatsApp --------------------------------- */
  mensajes: {
    general: 'Hola, quiero información sobre admisiones en el Gimnasio Campestre Los Arrayanes',
    visita: 'Hola, quiero agendar una visita al Gimnasio Campestre Los Arrayanes'
  },

  /* --- Ubicación (coordenadas tomadas del mapa oficial) ------------------ */
  comoLlegar: 'https://www.google.com/maps/dir/?api=1&destination=4.745362,-73.970282',

  /* --- Videos ------------------------------------------------------------
     PENDIENTE: pegar aquí el enlace de cada video.
     Acepta enlaces de YouTube, Vimeo o un archivo .mp4 subido al hosting.
     Mientras esté vacío ('') se muestra "Video próximamente".             */
  videos: {
    recorrido: '',        // PENDIENTE: video del recorrido por las instalaciones
    servicioSocial: ''    // PENDIENTE: video de Servicio Social
  },

  /* --- Colecciones de fotos curadas --------------------------------------
     Cada colección es una lista de ids de foto (ver img/_mapa-fotos.txt
     para saber qué foto original corresponde a cada id).
     Si una colección está vacía o no existe, se usa la carpeta completa
     con el mismo nombre (p. ej. "preescolar").                            */
  colecciones: {
    // Festival Bilingüe usa fotos con mención del festival; Granja Escolar no tiene carpeta propia (PENDIENTE).
    // Agrega aquí ids de fotos que correspondan, p. ej. ['salidas-12', 'salidas-13'].
    'festival-bilingue': ['secundaria-media-26', 'secundaria-media-27', 'secundaria-media-28', 'secundaria-media-34'],
    'deportes': ['musica-deportes-01', 'musica-deportes-02', 'musica-deportes-03', 'musica-deportes-04', 'musica-deportes-05', 'musica-deportes-06', 'musica-deportes-07', 'musica-deportes-12'],
    'granja-escolar': []
  },

  /* --- Descripción (alt) base de cada galería ---------------------------- */
  alt: {
    'instalaciones': 'Instalaciones del Gimnasio Campestre Los Arrayanes en La Calera',
    'preescolar': 'Estudiantes de Preescolar del GCA aprendiendo y jugando',
    'primaria': 'Estudiantes de Primaria del GCA en una actividad de aprendizaje',
    'secundaria-media': 'Estudiantes de Secundaria y Media del GCA',
    'secundaria': 'Estudiantes de Secundaria del GCA',
    'media': 'Estudiantes de Media del GCA',
    'steam-robotica': 'Escuela de STEAM y Robótica del After Class Club',
    'musica-deportes': 'Escuelas deportivas del After Class Club',
    'deportes': 'Estudiantes del GCA practicando voleibol y fútbol en el After Class Club',
    'muestra-cultural': 'Muestra cultural del GCA',
    'play-and-play': 'Festival Play and Play del GCA',
    'servicio-social': 'Estudiantes del GCA en Servicio Social',
    'mun': 'Estudiantes del GCA en el Modelo de Naciones Unidas',
    'salidas-pedagogicas': 'Salida pedagógica de estudiantes del GCA',
    'festival-bilingue': 'Festival Bilingüe del GCA',
    'granja-escolar': 'Granja Escolar del GCA'
  }
};
