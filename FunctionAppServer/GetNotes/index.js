module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const userEmail = req.query.email;

    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    // Create connection to database
    var config = {
        server: process.env["db"],
        authentication: {
            type: 'default',
            options: {
                userName: process.env["dbUser"], // update me
                password: process.env["dbPassword"] // update me
            }
        },
        options: {
            database: 'NoteAppDb'
        }
    }
    var connection = new Connection(config);

    let sql = `
    select [NOTE_NAME], [CREATED_DATE] from [NOTES]
    where [USER_EMAIL] = N'${userEmail}'
    `;

    const responseMessage = [];

    return new Promise((resolve) => {
        // Attempt to connect and execute queries if connection goes through
        connection.on('connect', (err) => {
            if (err) {
                console.log(err);
            } else {
                request = new Request(sql, (err, rowCount) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(rowCount + ' rows');
                    }
                });

                request.on('row', function (columns) {
                    let rowItem = {
                        name: columns.filter(item => item.metadata.colName === "NOTE_NAME")[0].value,
                        created: columns.filter(item => item.metadata.colName === "CREATED_DATE")[0].value
                    };

                    responseMessage.push(rowItem);
                });

                request.on('doneProc', () => {
                    context.res = {
                        // status: 200, /* Defaults to 200 */
                        body: responseMessage
                    };
                    resolve();
                })

                connection.execSql(request);
            }
        });

        // Initialize the connection.
        connection.connect();
    })
}