
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

const docToUpdate = { _id:new ObjectId('64bebfc0b966d4f2548f6dd8')};
const update = { $inc: { balance: 6 }}

const filterForUpdate = { account_type: 'saving' };

const main = async () => {
    try{
        await connectToDatabase();
        let result =  await accountCollection.updateOne(docToUpdate, update);
        console.log(result.modifiedCount);

        let resp = await accountCollection.updateMany(filterForUpdate, update); // updateMany(<filter>, <updated value>)
        console.log(resp.modifiedCount);
    }catch(err){
        console.error(`Error connecting to the database`)
    }finally {
        await client.close()
    }
}
main()