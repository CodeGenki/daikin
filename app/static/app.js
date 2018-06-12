
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
var CognitoUser = AmazonCognitoIdentity.CognitoUser;
var AuthenticationDetails = AmazonCognitoIdentity.AuthenticationDetails;

var poolData = {
	UserPoolId : 'us-east-1_2o7S9Pswl', // Your user pool id here
	ClientId : 'kqrsickoaotsll8j4fhfahgpt' // Your client id here
};

function signIn(){
	var username = $('#sign_in_username').val();
	var password = $('#sign_in_password').val();

	console.log(username);
	console.log(password);
}

function register(){
	var username = $('#registration_username').val();
	var givenname = $('#registration_givenname').val();
	var familyname = $('#registration_familyname').val();
	var email = $('#registration_email').val();
	var phonenumber = $('#registration_phonenumber').val();
	var address = $('#registration_address').val();	
	var password = $('#registration_password').val();

	var userPool = new CognitoUserPool(poolData);
   
    var attributeList = [];

    var datagivenname = {
        Name : 'givenname',
        Value : givenname
	};
    var datafamilyname = {
        Name : 'familyname',
        Value : familyname
	};  
    var dataEmail = {
        Name : 'email',
        Value : email
	};
	var dataaddress = {
        Name : 'address',
        Value : address
	};
	var dataphonenumber = {
        Name : 'phonenumber',
        Value : phonenumber
	};
    //var attributegivenname = new AmazonCognitoIdentity.CognitoUserAttribute(datagivenname);
    //var attributefamilyname = new AmazonCognitoIdentity.CognitoUserAttribute(datafamilyname);
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    //var attributeaddress = new AmazonCognitoIdentity.CognitoUserAttribute(dataaddress);
    //var attributephonenumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataphonenumber);

	//attributeList.push(attributegivenname);
	//attributeList.push(attributefamilyname);
	attributeList.push(attributeEmail);
	//attributeList.push(attributeaddress);
	//attributeList.push(attributephonenumber);

	userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
            alert(err);
            return;
        }
    	cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
});
}

function validate () {
    var username = $('#code_username').val();
    var code = $('#code_code').val();

	console.log(username);
	console.log(code);
}

function signOut(){
	console.log('sign out');
}