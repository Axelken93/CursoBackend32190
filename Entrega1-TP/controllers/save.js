const fs = require('fs');

async function save(obj) {   
    try {
        let data = await readFile(`public/${this.fileName}`)
        data.push(obj)
        let strData = JSON.stringify(data, null, 2)
        await fs.promises.writeFile(`public/${this.fileName}`, strData)
        return obj.id
    }
    catch (err) {
        console.log (`Hubo el siguiente error al agregar el objeto: ${err}`)
    }
};

module.exports = {
    save,
};