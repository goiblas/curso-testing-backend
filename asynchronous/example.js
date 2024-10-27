async function obtenerDatos() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Datos recibidos");
        }, 2000);
    });
}

async function procesarDatos() {
    console.log("Solicitando datos...");

    const datos = await obtenerDatos();

    console.log(datos);
}

procesarDatos();
console.log("Este mensaje se muestra mientras esperamos los datos...");
