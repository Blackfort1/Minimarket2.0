function checkRut(rut) {
   // Despejar Puntos
   var valor = rut.value.replace('.', '');
   // Despejar Guión
   valor = valor.replace('-', '');

   // Aislar Cuerpo y Dígito Verificador
   cuerpo = valor.slice(0, -1);
   dv = valor.slice(-1).toUpperCase();

   // Formatear RUN
   rut.value = cuerpo + '-' + dv

   // Calcular Dígito Verificador
   suma = 0;
   multiplo = 2;

   // Para cada dígito del Cuerpo
   for (i = 1; i <= cuerpo.length; i++) {

      // Obtener su Producto con el Múltiplo Correspondiente
      index = multiplo * valor.charAt(cuerpo.length - i);

      // Sumar al Contador General
      suma = suma + index;

      // Consolidar Múltiplo dentro del rango [2,7]
      if (multiplo < 7) {
         multiplo = multiplo + 1;
      }
      else {
         multiplo = 2;
      }

   }

   // Calcular Dígito Verificador en base al Módulo 11
   dvEsperado = 11 - (suma % 11);

   // Casos Especiales (0 y K)
   dv = (dv == 'K') ? 10 : dv;
   dv = (dv == 0) ? 11 : dv;

   // Validar que el Cuerpo coincide con su Dígito Verificador
   if (dvEsperado != dv) {
      rut.setCustomValidity("RUT Inválido")
         ;
      return false;
   }

   // Si todo sale bien, eliminar errores (decretar que es válido)
   rut.setCustomValidity('');
};

function validarTexto(texto) {
   let patron = /^[a-zA-z]*$/;
   let bandera = patron.test(texto.value);
   return bandera;
};


function validarNum(texto) {
   let patron = /^([0-9])*$/;
   let bandera = patron.test(texto.value);
   return bandera;
};


function validar(texto) {
   let patron = /^([a-zA-z0-9])*$/;
   let bandera = patron.test(texto.value);
   return bandera;
};

function validarFormulario() {
   //Se declaran las variable correspondientes
   let nombre = document.getElementById('NOMBRE');
   let paterno = document.getElementById('PATERNO');
   let materno = document.getElementById('MATERNO');
   let tel = document.getElementById('TEL');
   let num = document.getElementById('NUM');
   console.log(tel.length);

   /*Con la funcion validar se pasa por parametro cada variable y si no cumple las condiciones 
   de la funcion anterior el div_error cambiara por una frase que diga solo letras y desaparecerá en 4 segundos*/

   if (validarTexto(nombre) === false) {
      nombre.focus();
      document.getElementById("nombre_error").innerHTML = "Debe insertar solo letras";
      setInterval(function () { document.getElementById("nombre_error").innerHTML = ""; }, 4000);
      return false;
   } else if (validarTexto(paterno) === false) {
      paterno.focus();
      document.getElementById("paterno_error").innerHTML = "Debe insertar solo letras";
      setInterval(function () { document.getElementById("paterno_error").innerHTML = ""; }, 4000);
      return false;
   } else if (validarTexto(materno) === false) {
      materno.focus();
      document.getElementById("materno_error").innerHTML = "Debe insertar solo letras";
      setInterval(function () { document.getElementById("materno_error").innerHTML = ""; }, 4000);
      return false;
   } else if (validarNum(tel) === false) {
      tel.focus();
      document.getElementById("tel_error").innerHTML = "Debe insertar solo números";
      setInterval(function () { document.getElementById("tel_error").innerHTML = ""; }, 4000);
      return false;
   } 
};
