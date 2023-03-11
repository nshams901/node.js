//importing file system module;
const fs = require('fs').promises

async function readDocument (filePath) {
    const data = await fs.readFile(filePath) // it returns array buffer, use toString() method to convert array buffer to string.
    return data.toString()
}

async function writeDocument (){
    await fs.writeFile("./groceries.txt", "Price, Quantity, Rate");
    console.log("file created with file name groceries.txt");
}

async function deleteFile (){
    await fs.unlink("./groceries.txt")
    console.log("file deleted");
}

async function moveFile(){
    const data = await fs.rename("./file-test.txt", "./file-system/file.txt");
    console.log(data, "file moved");
}

async function append(){
    await fs.appendFile("./file.txt", "Append data")
    console.log("data appended");
}

// readDocument('./file-test.txt')
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err, 'error'))


// writeDocument()
//     .then((res) => console.log(res));

// deleteFile()

// moveFile()

// append()