//GLOBALES
var maquinaExpendedora = {
    admin: {
        secreto: "fictiziaMola"
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
            if(datos){
                var existeProducto = false;
                for(var i=0;i<productos.length;i++) {
                    if(productos[i].codigo === datos.codigo || productos[i].nombre === datos.producto){
                        existeProducto = true;
                        break;
                    }
                }
                return existeProducto;
            } else {
                return -1;
            }
        }
    },
    gestionProducto: {
        agregar: function(clave, objeto) {
            if(maquinaExpendedora.admin.secreto === clave) {
                if(objeto.nombre && objeto.codigo && objeto.precio && objeto.stock && objeto.disponibilidad) {
                    productos.push(objeto);
                    console.log(productos);
                } else {
                    console.log("Faltan campos!");
                }
            } else {
                console.log("ERROR - Contraseña incorrecta");
            }
        },
        eliminar: function(clave, objeto) {
            if(clave === maquinaExpendedora.admin.secreto) {
                if(maquinaExpendedora.herramientas.esProducto(objeto) === false) {
                    console.log("ERROR - No existe");
                } else {
                    productos = productos.filter((producto => producto.nombre != objeto.producto));
                    console.log("Producto eliminado con exito");
                    console.log(productos);
                }
            } else {
                console.log("ERROR - Contraseña incorrecta");
            }
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
                console.log("ERROR - Contraseña Erronea!");
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
        },
        comprar: function(clave, usuario, codigo) {
            for(i=0; i<clientes.length;i++) {
                if((clientes[i].usuario === usuario) && (clientes[i].pass === clave)){
                    for(j=0;j<productos.length;j++) {
                        if(productos[j].codigo === codigo) {
                            saldo = clientes[i].presupuesto - productos[j].precio;
                            console.log("Gracias por comprar, su saldo actual es de " + saldo + "€.");
                            break;
                        } else {
                            console.log("El producto no existe");
                            break;
                        }
                    }
                   break;
                } else if (clientes[i].pass != clave) {
                    console.log("ERROR - Contraseña incorrecta");
                    break;
                } else if (maquinaExpendedora.herramientas.esUsuario(usuario) === false){
                    console.log("ERROR - Usuario incorrecto");
                    break;
                }
            }
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
maquinaExpendedora.gestionClientes.agregar("fictiziaMola", {
    usuario: "Juan"
}); // ERROR - El usuario ya existe!
maquinaExpendedora.gestionClientes.agregar("fictiziaMola", {
    usuario: "Ulises2",
    presupuesto: 1000
}); // ERROR - Faltan datos! 
maquinaExpendedora.gestionClientes.agregar("fictiziaMola", {
    usuario: "ulises2",
    presupuesto: 1000,
    tipo: "admin",
    pass: "pass2",
    nombre: "Ulises2"
}); // usuario Agregado con exito

// Testeando borrar:
maquinaExpendedora.gestionClientes.eliminar(); // ERROR - Contraseña Erronea!
maquinaExpendedora.gestionClientes.eliminar("fictiziaMola"); // ERROR - El usuario no existe!
maquinaExpendedora.gestionClientes.eliminar("fictiziaMola", "Yo mismo"); // ERROR - El usuario no existe!
maquinaExpendedora.gestionClientes.eliminar("fictiziaMola", "ulises2"); // Usuario Eliminado con exito


// Testeando Saldo:
maquinaExpendedora.gestionClientes.saldoTotal(); // -1
maquinaExpendedora.gestionClientes.saldoTotal("1234", "Juan"); // 100

// Testrando Gasto:
maquinaExpendedora.gestionClientes.gastoTotal(); // false
maquinaExpendedora.gestionClientes.gastoTotal("1234", "Bari"); // []

//PASO 4    

// Testeando esProducto:
maquinaExpendedora.herramientas.esProducto() // -1
maquinaExpendedora.herramientas.esProducto({
        codigo: "C10"
    }) // false
maquinaExpendedora.herramientas.esProducto({
        codigo: "C2"
    }) // true
maquinaExpendedora.herramientas.esProducto({
        producto: "Inventado"
    }) // false
maquinaExpendedora.herramientas.esProducto({
        producto: "Risketos"
    }) // true

// Testeando agregar producto:
maquinaExpendedora.gestionProducto.agregar() // ERROR - Contraseña Erronea!
maquinaExpendedora.gestionProducto.agregar("fictiziaMola", { 
        nombre: "Chetos"
    }) // ERROR - Faltan datos!
maquinaExpendedora.gestionProducto.agregar("fictiziaMola", {
        nombre: "Chetos",
        codigo: "C6",
        precio: 6,
        stock: 5,
        disponibilidad: true
    }) // Producto Agregado con exito    

// Testrando eliminar producto:
maquinaExpendedora.gestionProducto.eliminar() // ERROR - Contraseña Erronea!
maquinaExpendedora.gestionProducto.eliminar("fictiziaMola", {
        producto: "inventado"
    }) // ERROR - El producto no existe!
maquinaExpendedora.gestionProducto.eliminar("fictiziaMola", {
        producto: "Chetos"
    }); // Producto Eliminado con exito    

// Testeando Comprar producto:
var comprar = maquinaExpendedora.gestionClientes.comprar;
comprar() // ERROR - Contraseña Errónea!
comprar("1234", "Eduardo"); // ERROR - El usuario no existe!
comprar("asdf", "Juan"); // ERROR - Contraseña Incorrecta!
comprar("1234", "Juan", "A1"); // El producto no existe!
comprar("1234", "Juan", "C1");
// Saldo Restante: 99
// Gracias por comprar... que tenga un buen día!

////PASO 5