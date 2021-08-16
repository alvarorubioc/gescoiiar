
# GesCOIIAR

Hola! Esta será el frontend de nuestro portal de gestión para colegiados e ingenieros industriales por creado en **node y gulp**. 

Este Kit incluye un motor de plantillas HTML, el preprocesador SASS y un servidor local y muchas cosas más. El Kit nos ayuda a trabajar más cómodamente, nos automatiza tareas para la maquetación.

Hay 3 tipos de ficheros y carpetas:

- Los ficheros que están sueltos en la raíz del repositorio, como gulpfile.js, package.json... Son la configuración del proyecto y no necesitamos modificarlos.
- La carpeta `dev/`: son los ficheros de nuestra página web, como HTML, CSS, JS y en la cual trabajaremos para maquetar.
- Las carpetas `public/` y `dist/`, son generadas automáticamente cuando arrancamos el proyecto. El Kit lee los ficheros que hay dentro de `dev/`, los procesa y los genera dentro de `public/` y `dist/`, la cual contiene es un archivo comprimido en .zip para su distribución.


Instalación
---------------

### Requerimientos

`GesCOIIAR` solo requiere estas dependencias:

- [Node.js](https://nodejs.org/)
- [Gulp.js](https://gulpjs.com/)

### Cómo empezar

Clona o descarga este repositorio `$ git clone https://github.com/alvarorubioc/gescoiiar`.

### Setup

Para empezar a usar todas las herramientas necesitas instalar Node.js.

```sh
$ npm install
```

### Tareas de Gulp disponibles

`GesCOIIAR` está preparado para el desarollo de la plantilla para WordPress:

- `$ gulp` : Escucha todos los cambios en la carpeta dev o los archivos php, recarga el navegador cuando haces cambios y compila todo lo necesario.
- `$ gulp html` : compila los html alojados en la carpeta dev/html/partials en la carpeta /public.
- `$ gulp javascript` : compila los js en dev/js a assets/js
- `$ gulp sass` : compila los estilos de sass en el root = styles.css y styles.css.map
- `$ gulp icons` : compila los svg a en dev/icons a un sprite en assstes/icons
- `$ gulp build` : crea un .zip excluyendo la carpeta dev, node_modules, .git, etc, para la distribución de la plantilla

> **NOTA:** Es posible que tengas que configurar la ruta de BrowerSync en el archivo: gulpfile.js.

```// Browser Sync proxy direction
const proxySync = 'localhost:8888/' + themeName;
```

### Pasos para arrancar el proyecto:

Una vez hemos instalado las dependencias, vamos a arrancar el proyecto. **El proyecto hay que arrancarlo cada vez que te pongas a programar.** Para ello ejecuta el comando:

```bash
gulp
```

Este comando:

- **Abre una ventana de tu navegador y muestra tu página web**.
- También **observa** todos los ficheros que hay dentro de la carpeta `dev/`, para que cada vez que modifiques un fichero **refresca tu página en el navegador**.
- También **procesa los ficheros** HTML, SASS / CSS y JS y los **genera y guarda en la carpeta `public/`**. Por ejemplo:
   - Convierte los ficheros SASS en CSS.
   - Combina los diferentes ficheros de HTML y los agrupa en uno o varios ficheros HTML.

Después de ejecutar `gulp` ya puedes empezar a editar todos los ficheros que están dentro de la carpeta `dev/` y programar cómodamente.


## Estructura de carpetas

La estructura de carpetas tiene esta pinta:

```
dev
 ├─ html // los ficheros de esta carpeta se copian en public/api/
 |  └─ partials
 ├─ icons
 |  └─ sprite-icons
 ├─ js 
 ├─ scss
 |  ├─ components
 |  ├─ core
 |  ├─ modules
 |  ├─ navigation
 |  ├─ site
 |  ├─ nomalize.scss
 |  └─ main.scss
 ├─ img
 |  
 public
 ├─ assets
 |  ├─ icons
 |  ├─ js
 |  ├─ img
 |  └─ styles
 └─ *.html
```