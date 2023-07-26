
const { MongoClient } = require('mongodb')


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

const sampleAccount = {
    account_holder : "Linus Trovalds",
    account_id: "MDB887655545",
    account_type: "checking",
    balance: 5646654,
    last_updated: new Date()
}
const sampleAccounts = [
    {
        account_holder : "Linus Trovalds",
        account_id: "MDB887655545",
        account_type: "checking",
        balance: 5646654,
        last_updated: new Date()
    },
    {
        account_holder : "Ibn Moosa",
        account_id: "MDB7678989895",
        account_type: "saving",
        balance: 766565,
        last_updated: new Date()
    }
]

const main = async () => {
    try{
        await connectToDatabase();
        let result = await accountCollection.insertOne(sampleAccount);

        let results = await accountCollection.insertMany( sampleAccounts);
        console.log(`inserted multiple document: ${results.insertedCount}`)
        console.log(`inserted document: ${result.insertedId}`);

    }catch(err){
        console.error(`Error connecting to the database`)
    }finally {
        await client.close()
    }
}
main()