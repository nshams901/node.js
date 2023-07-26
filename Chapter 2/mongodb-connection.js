
const fs = require('fs');
const { MongoClient } = require('mongodb')



// reading file data
fs.readFileSync('./file-test.txt', (err, data) => {
    console.log(data);
})



// const uri = 'YOUR_MONGODB_CONNECTION STRING';

const uri = 'mongodb+srv://nshams:mongodb901@cluster0.hdmwck1.mongodb.net/'

// connecting node js to mongodb database
const client = new MongoClient(uri)

const dbname = 'bank';

const connectToDatabase = async () => {
    try {
        await client.connect()
        console.log(`Connected to the ${dbname} database`);
    }catch(err){
        console.error(`Error connecting to the database`)
    }
}

const main = async () => {
    try{
        await connectToDatabase();
        // getting list of database 
        const databaseList = await client.db().admin().listDatabases()
        databaseList.databases.forEach(db => console.log(` - ${db.name}`))
    }catch(err){
        console.error(`Error connecting to the database`)
    }finally {
        await client.close()
    }
}
main()




// -------------- NOTES --------------
// 1. An application should use a single MongoClient instance for all database request.
// 2. Creating a new MongoClient is resourse intensive.
// 3. Creating a new MongoClient for each request will affect the application's performance.
// 4. Error :- 
//          fix network access error by adding IP address to the allowlist.
//          fix authentication error caused by an incorrect password or user in connection string.
