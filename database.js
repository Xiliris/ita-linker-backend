const mongo = require('./mongo');

module.exports =async  () => {
    await mongo().then((mongoose) => {
            console.log('> Conntected to Database')
    }).catch(err => {
        console.log(err)
    })
}