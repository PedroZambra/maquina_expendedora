//GLOBALES
var maquinaExpendedora = {
    admin: {
        secreto: "ficticiaMola"
    },
    herramientas: {
        esUsuario: function(user) {
            // var existe = clientes.filter(arr => arr.usuario === user);
            // console.log((existe.length>0)?true:false);
            for(var i=0;i<clientes.length;i++) {
                if(clientes[i].usuario === user) {
                    return true;
                }
            }
            return false;
        }
    },
    gestionClientes: {
        agregar: function(clave, objeto) {
            if(clave === maquinaExpendedora.admin.secreto) {
                if(maquinaExpendedora.herramientas.esUsuario(objeto.usuario) === true){
                    console.log("El usuario ya existe");
                } else {
                    if(objeto.nombre && objeto.usuario && objeto.pass && objeto.tipo && objeto.presupuesto){
                        clientes.push(objeto);
                        console.log("Usuario añadido.")
                    } else {
                        console.log("Faltan datos!");
                    }
                }
            } else {
                console.log("ERROR - Contraseña incorrecta!");
            }
        },
        eliminar: function(clave, usuario) {
            if(clave === maquinaExpendedora.admin.secreto) {
                if(maquinaExpendedora.herramientas.esUsuario(usuario) === false){
                    console.log("ERROR - El usuario no existe!");
                } else {
                    clientes = clientes.filter(users => users.usuario != usuario);
                }
            } else {
                console.log("ERROR - Contraseña Erronea!")
            }

        },
        saldoTotal: function(clave, usuario) {
            let entrada = clientes.filter(users => users.usuario === usuario);
            console.log(entrada);
            // if((user.usuario === usuario) && (user.pass === clave)){
            //     console.log("dentro");
            // } else {
            //     console.log(-1);
            // }
        },
        gastoTotal: function(clave, usuario) {
            //Solución aquí
        }
    }
}

var productos = [];

var clientes = [
    {nombre:"Pedro", usuario:"Jera", pass:"1234", tipo: "", presupuesto:100},
    {nombre:"Juan", usuario:"Juan", pass:"1234", tipo: "", presupuesto:100},
    {nombre:"Maria", usuario:"Bari", pass:"1234", tipo: "", presupuesto:100}
];

// console.log(clientes);

//////////////////////////////////////////////////////////////////////////////////////

// Testeando esUsuario:
maquinaExpendedora.herramientas.esUsuario("Juan"); // true
maquinaExpendedora.herramientas.esUsuario("yo mismo"); // false

// Testeando agregar:
maquinaExpendedora.gestionClientes.agregar(); // ERROR - Contraseña Erronea!
maquinaExpendedora.gestionClientes.agregar("hola"); // ERROR - Contraseña Erronea!
maquinaExpendedora.gestionClientes.agregar("ficticiaMola", {
    usuario: "Juan"
}); // ERROR - El usuario ya existe!
maquinaExpendedora.gestionClientes.agregar("ficticiaMola", {
    usuario: "Ulises2",
    presupuesto: 1000
}); // ERROR - Faltan datos! 
maquinaExpendedora.gestionClientes.agregar("ficticiaMola", {
    usuario: "ulises2",
    presupuesto: 1000,
    tipo: "admin",
    pass: "pass2",
    nombre: "Ulises2"
}); // usuario Agregado con exito

// Testeando borrar:
maquinaExpendedora.gestionClientes.eliminar(); // ERROR - Contraseña Erronea!
maquinaExpendedora.gestionClientes.eliminar("ficticiaMola"); // ERROR - El usuario no existe!
maquinaExpendedora.gestionClientes.eliminar("ficticiaMola", "Yo mismo"); // ERROR - El usuario no existe!
maquinaExpendedora.gestionClientes.eliminar("ficticiaMola", "ulises2"); // Usuario Eliminado con exito


// Testeando Saldo:
maquinaExpendedora.gestionClientes.saldoTotal(); // -1
maquinaExpendedora.gestionClientes.saldoTotal("1234", "Juan"); // 1000