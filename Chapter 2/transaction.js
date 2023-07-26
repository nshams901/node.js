
const { MongoClient, ObjectId } = require('mongodb')


// const uri = 'YOUR_MONGODB_CONNECTION STRING';

const uri = 'mongodb+srv://nshams:mongodb901@cluster0.hdmwck1.mongodb.net/'

// connecting node js to mongodb database
const client = new MongoClient(uri)
const dbname = 'bank';

// collection
const accounts = client.db('bank').collection('accounts')
const transfers = client.db('bank').collection('transfer');

// Account Information
let account_id_sender = 'MDB887655545'
let account_id_reciever = 'MDB7678989895'
let transaction_amount = 5

// start the session
const session = client.startSession()

const main = async () => {
    try{
        const transactionResults = await session.withTransaction( async () => {
            // step 1: Update the account sender balance
            const updateSenderResults  = await accounts.updateOne(
                { account_id: account_id_sender},
                { $inc: { balance: -transaction_amount}},
                { session }
            )
            console.log(
                `${updateSenderResults.matchedCount} document(s) matched the filter,
                updated ${updateSenderResults.modifiedCount} document(s) for the sender account`
            );

            // step 2: Update the account reciever balance
            const updateRecieverResults = await accounts.updateOne(
                { account_id: account_id_reciever},
                { $inc: { balance: transaction_amount}},
                { session}
            )
            console.log(
                `${updateRecieverResults.matchedCount} document(s) matched the filter,
                updated ${updateRecieverResults.modifiedCount} document(s) for the reciever account`
            );

            // step 3: insert the transfer document
            const transfer = {
                transfer_id: 'TR437463746378',
                amount: transaction_amount,
                from_account: account_id_sender,
                to_account: account_id_reciever
            }

            const insertTransferResult = await transfers.insertOne(transfer, { session })
            console.log(
                `Successfully inserted ${insertTransferResult.insertedId} into the transfer collection`
            )

            // step 4: update the transfer_complete field for sender account
            const updateSenderTransferResult = await accounts.updateOne(
                { account_id: account_id_sender},
                { $push: { transfer_commplete : transfer.transfer_id}},
                { session }
            )
            console.log(
                `${updateSenderTransferResult.matchedCount} document(s) matched, 
                updated ${ updateSenderTransferResult.modifiedCount} document(s)`
            )

            // step 5: 
            const updateRecieverTransferResult = await accounts.updateOne(
                { account_id: account_id_reciever},
                { $push: { transfer_commplete: transfer.transfer_id}},
                { session }
            );
            console.log(
                `${updateRecieverTransferResult.matchedCount} document(s) matched, 
                updated ${ updateRecieverTransferResult.modifiedCount} document(s)`
            )
        });

        if( transactionResults){
            console.log('Transaction completed');
        }else{
            console.log('Transaction aborted');
        }
        
    }catch(err){
        console.error(`Transaction aborted: ${err}`);
        process.exit()
    }finally {
        await session.endSession()
        await client.close()
    }
}
main()