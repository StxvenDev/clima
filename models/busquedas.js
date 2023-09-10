import fs, { readFileSync } from "fs";

import axios from "axios";

class Busqueda {

    busqueda = [];
    rutaDb = './db/database.json'

    constructor () {
        this.leerDB()
    }

    get paramsMapBox () {
        return {
                'limit' : 10,
                'proximity' : 'ip',
                'language' : 'es',
                'access_token' : process.env.MAPBOX_KEY, 
        }
    }

    async buscarLugares (lugar = '') {

        try {

            const instance = axios.create({
                baseURL : `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params : this.paramsMapBox
            });
    
            const resp = await instance.get();
            return resp.data.features.map(lugar => ({

                id : lugar.id,
                name : lugar.place_name,
                lng : lugar.center[0], 
                lat : lugar.center[1]
                
            }));

        }catch(err){

            return []

        }

    }

/*     get paramsOpenWheather () {
        return {
                'lat' : lat,
                'lon' : lon,
                'lang' : 'es',
                'appid' : process.env.OPENWHEATHER_KEY, 
        }
    }  */

    async climaLugar(lat,lon){

        const paramsOpenWheather = () =>{
            return {
                'lat' : lat,
                'lon' : lon,
                'lang' : 'es',
                'appid' : process.env.OPENWHEATHER_KEY,
                'units' : 'metric'
            }
        } 
        try {
            const intance = axios.create({
                baseURL : 'https://api.openweathermap.org/data/2.5/weather',
                params : paramsOpenWheather()
            });

            const {data} = await intance.get();

            return {
                desc : data.weather[0].description,
                min: data.main.temp_min,
                max: data.main.temp_max,
                temp: data.main.temp,
            };

        } catch (err) {
            console.log(err);
        }
    }

    agregarHistorial(lugar = ''){
        if(this.busqueda.includes(lugar.toLowerCase())) return;
        this.busqueda.unshift(lugar.toLowerCase());

        this.guardarDB();
    }

    guardarDB(){
        const payload = {
            busqueda : this.busqueda
        }
        fs.writeFileSync(this.rutaDb,JSON.stringify(payload));
    }

    leerDB(){
         if(fs.existsSync(this.rutaDb)){  
            const info = readFileSync(this.rutaDb,{
                 encoding : 'utf-8'
             });
             const {busqueda} = JSON.parse(info);
             this.busqueda = busqueda;   
         }
    }
}

    

export {
    Busqueda
}