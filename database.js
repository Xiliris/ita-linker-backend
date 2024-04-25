const mongo = require('./mongo');

module.exports =async  () => {
    await mongo().then((mongoose) => {
            console.log('> Connected to Database')
    }).catch(err => {
        console.log(err)
    })
}