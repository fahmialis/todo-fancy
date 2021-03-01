const bcrypt = require('bcryptjs');


const hashPassword = (password) =>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}


const comparePassword = (input, passwordDb) =>{
    return bcrypt.compareSync(input, passwordDb)
}

module.exports = {hashPassword, comparePassword}