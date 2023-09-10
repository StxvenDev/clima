import 'dotenv/config';


import { inquierMenu, leerInput, listadoLugares, pausa } from "./helpers/inquier.js";
import { Busqueda } from "./models/busquedas.js";



const main = async () => {
    let opt;
    const busquedas = new Busqueda();
    do{
        opt = await inquierMenu();
        switch (opt) {
            case 1:
                console.log('Buscar ciudad');

                // Leer ciudad 
                const req = await leerInput('Ciudad : '); 

                //buscar lugares
                const lugares = await busquedas.buscarLugares(req);

                //listar lugares
                const id = await listadoLugares(lugares);
                //extraer info del lugar
                const lugarSel = lugares.find( lugar => lugar.id === id);
                busquedas.agregarHistorial(lugarSel.name);
                const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);
                console.log('\n Informacion del lugar \n');
                console.log('Ciudad: ', lugarSel.name);
                console.log('Latitud: ', lugarSel.lat);
                console.log('Longitud: ', lugarSel.lng);
                console.log('Temperatura: ',clima.temp, 'Celsius');
                console.log('Maxima: ',clima.max,'Celsius');
                console.log('Minima: ',clima.min,'Celsius');
                console.log('Clima: ',clima.desc);
                break;
        
            case 2:
                busquedas.busqueda.forEach((lugar,i)=>{
                    const idx = i+1;
                    console.log( `${idx}. ${lugar}`);
                })
                break;
        }
       
        await pausa();
    }while(opt != 0)

    
}

main();