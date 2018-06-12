//AWSCognito.config.region = 'us-east-1'; 
//var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
//var CognitoUser = AmazonCognitoIdentity.CognitoUser;
//var AuthenticationDetails = AmazonCognitoIdentity.AuthenticationDetails;

var poolData = {
	UserPoolId : 'us-east-1_2o7S9Pswl', // Your user pool id here
	ClientId : 'kqrsickoaotsll8j4fhfahgpt' // Your client id here
};

function signIn(){
	var username = $('#sign_in_username').val();
	var password = $('#sign_in_password').val();

	var authenticationData = {
		Username : username,
		Password : password,
	};

	var authenticationDetails = new  AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(AmazonCognitoIdentity.authenticationDetails, {
        onSuccess: function (result) {
        	console.log('access token + ' + result.getAccessToken().getJwtToken());
            //window.location.href = "/welcome";
		}, 
		onFailure: function(err){
			console.log(err);
		}
	});

}

function register(){
	var username = $('#registration_username').val();
	var given_name = $('#registration_given_name').val();
	var family_name = $('#registration_family_name').val();
	var email = $('#registration_email').val();
	var phone_number = $('#registration_phone_number').val();
	var address = $('#registration_address').val();	
	var password = $('#registration_password').val();

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var attributeList = [];

    var datagiven_name = {
        Name : 'given_name',
        Value : given_name
	};
    var datafamily_name = {
        Name : 'family_name',
        Value : family_name
	};  
    var dataEmail = {
        Name : 'email',
        Value : email
	};
	var dataaddress = {
        Name : 'address',
        Value : address
	};
	var dataphone_number = {
        Name : 'phone_number',
        Value : phone_number
	};
    var attributegiven_name = new AmazonCognitoIdentity.CognitoUserAttribute(datagiven_name);
    var attributefamily_name = new AmazonCognitoIdentity.CognitoUserAttribute(datafamily_name);
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    var attributeaddress = new AmazonCognitoIdentity.CognitoUserAttribute(dataaddress);
    var attributephone_number = new AmazonCognitoIdentity.CognitoUserAttribute(dataphone_number);

	attributeList.push(attributegiven_name);
	attributeList.push(attributefamily_name);
	attributeList.push(attributeEmail);
	attributeList.push(attributeaddress);
	attributeList.push(attributephone_number);


	var cognitoUser;
	userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
        	console.log(err);
            alert(err);
            return;
        }
    	cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        window.location.href  = "https://c1dz5i3grc.execute-api.us-east-1.amazonaws.com/dev/code_validation";

});
}

function validate () {
    var username = $('#code_username').val();
    var code = $('#code_code').val();

	console.log(username);
	console.log(code);

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var userData = {
        Username : username,
        Pool : userPool
	};
 	var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
            alert(err);
            return;
        }
     console.log('call result: ' + result);
});
}

function signOut(){
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser !== null){
    	cognitoUser.signOut();
    }
    window.location.href  = "https://c1dz5i3grc.execute-api.us-east-1.amazonaws.com/dev";
}