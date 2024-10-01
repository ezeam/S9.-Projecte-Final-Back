const bcrypt = require('bcrypt');

async function testPassword() {
  const password = 'C123'; // Contraseña en texto claro
  const hashedPassword = await bcrypt.hash(password, 10); // Genera el hash

  console.log("Hash generado:", hashedPassword); // Imprime el hash
  
  // Ahora compara
  const match = await bcrypt.compare(password, hashedPassword);
  console.log("Las contraseñas coinciden:", match); // Esto debería ser true
}

testPassword();