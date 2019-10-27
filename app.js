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
        },
        esProducto: function(datos) {
            
        }
    },
    gestionProducto: {
        agregar: function(clave, objeto) {
            
        },
        eliminar: function(clave, objeto) {
            
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
            var saldo = -1;
            for(i=0; i<clientes.length;i++) {
                if((clientes[i].usuario === usuario) && (clientes[i].pass === clave)){
                    saldo = clientes[i].presupuesto;
                    console.log("El presupuesto de "+ clientes[i].usuario + " es de " + saldo + "€");
                    break;
                }
            }
            return saldo;
        },
        gastoTotal: function(clave, usuario) {
            var gasto = false;
            for(i=0; i<clientes.length;i++) {
                if((clientes[i].usuario === usuario) && (clientes[i].pass === clave)){
                    gasto = clientes[i].gasto;
                    console.log(gasto);
                    break;
                }
            }
            return gasto;
        }
    }
}

var productos = [{
    nombre: "Risketos",
    codigo: "C1",
    stock: 100,
    disponibilidad: true,
    precio: 1
}, {
    nombre: "KitKat",
    codigo: "C2",
    stock: 4,
    disponibilidad: true,
    precio: 2
}, {
    nombre: "Chicles Orbit",
    codigo: "C3",
    stock: 6,
    disponibilidad: true,
    precio: 3
}, {
    nombre: "Pipas Solero",
    codigo: "C4",
    stock: 1,
    disponibilidad: true,
    precio: 4
}, {
    nombre: "Demonios de Fresa",
    codigo: "C5",
    stock: 10,
    disponibilidad: true,
    precio: 5
}];

var clientes = [
    {nombre:"Pedro", usuario:"Jera", pass:"1234", tipo: "", presupuesto:100, gasto:[]},
    {nombre:"Juan", usuario:"Juan", pass:"1234", tipo: "", presupuesto:100, gasto:[]},
    {nombre:"Maria", usuario:"Bari", pass:"1234", tipo: "", presupuesto:100, gasto:[]}
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
maquinaExpendedora.gestionClientes.saldoTotal("1234", "Juan"); // 100

// Testrando Gasto:
maquinaExpendedora.gestionClientes.gastoTotal(); // false
maquinaExpendedora.gestionClientes.gastoTotal("1234", "Bari"); // []