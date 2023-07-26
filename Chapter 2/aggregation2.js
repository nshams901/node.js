
const { MongoClient } = require('mongodb')
// const uri = 'YOUR_MONGODB_CONNECTION STRING';
const uri = 'mongodb+srv://nshams:mongodb901@cluster0.hdmwck1.mongodb.net/'

// connecting node js to mongodb database
const client = new MongoClient(uri);

const pipeline = [
    // stage 1: $match- filter the document <checking, balance<= 100>
    { $match: { account_type: 'checking', balance: { $lte: 1000 }}},

    // stage 2: $sort- sort the document in descending order( balance )
    { $sort: { balance: -1}},

    // stage 3: $project- projects only the requested fields and one computed field ()
    {
        $project: {
            _id: 0,
            account_type: 1,
            account_id: 1,
            balance: 1,
            // dollar_balance: { $divide : ['balance', 82]}
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