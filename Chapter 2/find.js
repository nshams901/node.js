
const { MongoClient, ObjectId } = require('mongodb')


// const uri = 'YOUR_MONGODB_CONNECTION STRING';

const uri = 'mongodb+srv://nshams:mongodb901@cluster0.hdmwck1.mongodb.net/'

// connecting node js to mongodb database
const client = new MongoClient(uri)
const dbname = 'bank';
const collection_name = 'accounts';

const accountCollection = client.db(dbname).collection(collection_name)

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log(`Connected to the ${dbname} database`);
    }catch(err){
        console.error(`Error connecting to the database`)
    }
}

const documentToFind = { balance: { $gt: 766566 }}
const docToFind = { _id:new ObjectId('64bebfc0b966d4f2548f6dd8')}

const main = async () => {
    try{
        await connectToDatabase();
        let result = accountCollection.find(documentToFind)
        let docCount = accountCollection.countDocuments(documentToFind)

        await result.forEach((doc) => console.log(doc))
        console.log(`Found ${await docCount} documents`);

        const res = await accountCollection.findOne(docToFind)
        console.log(res);
    }catch(err){
        console.error(`Error connecting to the database`)
    }finally {
        await client.close()
    }
}
main()