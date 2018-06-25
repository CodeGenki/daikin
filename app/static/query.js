
function query_db (){

var AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for user information.");

var params = {
    TableName : "Customer_information",
    KeyConditionExpression: "username = :v1",
    ExpressionAttributeValues: {
        "v1": "hagaman318" //place 
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.email + ": " + item.given_name);
        });
    }
});

}