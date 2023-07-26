
const { MongoClient } = require('mongodb')
// const uri = 'YOUR_MONGODB_CONNECTION STRING';
const uri = 'mongodb+srv://nshams:mongodb901@cluster0.hdmwck1.mongodb.net/'

// connecting node js to mongodb database
const client = new MongoClient(uri);

const pipeline = [
    // stage 1: match the accounts with a balance less than 1000.
    { $match: { balance: { $lt: 1000 }}},

    // stage 2:
    {
        $group: {
            _id: "$account_type",
            total_balance: { $sum: '$balance'},
            avg_balance: { $avg: '$balance'}
        }
    }
]


const main = async () => {
    try{
        await client.connect();
        
        let accounts = await client.db('bank').collection('accounts');
        let result = await accounts.aggregate(pipeline);
        for await ( const doc of result){
            console.log(doc);
        }

    }catch(err){
        console.error(`Error connecting to the database`)
    }finally {
        await client.close()
    }
}
main()