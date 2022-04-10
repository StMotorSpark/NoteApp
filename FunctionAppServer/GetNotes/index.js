module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = req.query.useName;
    
    const responseMessage = [
        {
            name: "note1",
            created: "04/09/2022"
        },
        {
            name: "note2",
            created: "04/09/2022"
        }
    ]

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}