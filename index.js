
import { router} from "./app/js/routes.js";

router()

// Evento para cambiar de ruta al cambiar el hash
window.addEventListener("hashchange", router);

// También ejecuta el router al cargar la página
window.addEventListener("load", router);