
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

const documentToDelete = { account_id:  "MDB887655545" };
const docToDelete = { $lt: { balance: 4005}}

const main = async () => {
    try{
        await connectToDatabase();
        let result = await accountCollection.deleteOne( documentToDelete );
        console.log(result.deletedCount === 1 ? "Deleted one document" : "Document not deleted");

        let res = await accountCollection.deleteMany( docToDelete );
        console.log(
            res.deletedCount > 0 
            ? `Total ${res.deletedCount} document deleted` 
            : "No document deleted");
    }catch(err){
        console.error(`Error connecting to the database`)
    }finally {
        await client.close()
    }
}
main()