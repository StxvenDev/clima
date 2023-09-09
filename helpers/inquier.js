import inquier from 'inquirer';
import readline from 'readline';

import 'colors';

const opciones = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que quieres hacer?\n',
        choices: [
            {
                value : 1,
                name : `${'1'.green}. Buscar ciudad`
            },
            {
                value : 2,
                name : `${'2'.green}. Historial`
            },
            {
                value : 0,
                name : `${'0'.green}. Salir`
            }
        ]
    }
];

const inquierMenu = async() => {
    console.clear();
    console.log('=================================='.green);
    console.log('       Seleccione una opcion      '.white);
    console.log('==================================\n'.green);
    const  {opcion}  = await inquier.prompt(opciones);

    return opcion;
}


const enter = [ 
    {
        type: 'input',
        name: 'key',
        message: `\nPresiona ${'ENTER'.blue} para continuar`
    }
]

const pausa = async() => {
    await inquier.prompt(enter);
}

const leerInput = async(message) => {
    const input = [
        {
            type : 'input',
            name : 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Ingrese algun valor';
                }
                return true;
            }
        }
    ]

    const {desc} = await inquier.prompt(input); 

    return desc;
}

const listadoLugares = async(lugares = [] ) => {


    /* {
        value : '0',
        name : `${'0'.green}. Salir`
    }, */

    const choices = lugares.map((lugar,i)=>{
        return {
            value : lugar.id,
            name : `${`${i+1}`.green} ${lugar.name}`
        }
    })

    const seleccionar = [
        {
            type:'list',
            name:'id',
            message: 'Selecciona una opcion',
            choices
        }
    ]

    const {id} = await inquier.prompt(seleccionar);

    return id;

}

const listadoTareasCompletar = async(tareas = [] ) => {


    /* {
        value : '0',
        name : `${'0'.green}. Salir`
    }, */

    const choices = tareas.map((tarea,i)=>{
        return {
            value : tarea.id,
            name : `${`${i+1}`.green} ${tarea.desc}`,
            checked :  (tarea.completadoEn) ? true : false 
        }
    })

    const borrar = [
        {
            type:'checkbox',
            name:'ids',
            message: 'Selecciona las tareas a completar',
            choices

        }
    ]

    const {ids} = await inquier.prompt(borrar);

    return ids;

}

const confirmar = async ( message ) => {
    const question = [
        {
            type : 'confirm',
            name : 'ok',
            message
        }
    ]

    const {ok} = await inquier.prompt(question);

    return ok;
}

/* module.exports = {
    inquierMenu
} */

export {
    inquierMenu,
    pausa,
    leerInput,
    listadoLugares,
    confirmar,
    listadoTareasCompletar
} 