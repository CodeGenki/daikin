
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

    var userData = {
        Username : username,
        Pool : userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    console.log(cognitoUser);

    cognitoUser.authenticateUser(authenticationDetails, {

        onSuccess: function (result) {
        	console.log('access token + ' + result.getAccessToken().getJwtToken());
            window.location.href = "https://7srr0yyhjg.execute-api.us-east-1.amazonaws.com/jenny/customer";
            //test
		}, 
		onFailure: function(err){
			console.log(err);
            //alert(err);
            if(err.code == "InvalidParameterException"){
                document.getElementById("noUsername").innerHTML = "Please enter a valid username.";
                document.getElementById("invalidCredentials").innerHTML = "";
            }
            else if(err.code == "NotAuthorizedException" || err.code == "UserNotFoundException"){
                document.getElementById("invalidCredentials").innerHTML = "Incorrect username or password."
                document.getElementById("noUsername").innerHTML = "";
            }
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
            alert(err.message);
            document.getElementById("registerError").innerHTML = err.message;
            return;
        }
        cognitoUser = result.user;
        console.log(result)
        console.log('user name is ' + cognitoUser.getUsername());
        window.location.href  = "https://7srr0yyhjg.execute-api.us-east-1.amazonaws.com/jenny/code_validation";
    });
}

function validate () {
    var username = $('#code_username').val();
    var code = $('#code_code').val();
    
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var userData = {
        Username : username,
        Pool : userPool
	};
 	var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
        	console.log(err);
            alert(err);
            return;
        }
    console.log('call result: ' + result);
    window.location.href = "https://7srr0yyhjg.execute-api.us-east-1.amazonaws.com/jenny/customer";

});
}

function signOut(){
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null){
    	cognitoUser.signOut();
    }
    window.location.href  = "https://7srr0yyhjg.execute-api.us-east-1.amazonaws.com/jenny";
}

function setWelcome () {
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null){
        cognitoUser.getSession(function(err, session){
            if(err){
                alert(err);
                return;
            }
            console.log(cognitoUser);
            $('#username').html(cognitoUser.username);
        });
    }
    var url = "/api/protected_api";
    $.post(url,{'access_token' : cognitoUser.signInUserSession.accessToken.jwtToken})
    .done(function (data) {
        $('#data_from_protected_api').html(data);
    });
}

function update_database(){

    console.log("hello from app js")
}

function get_user(){
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if(cognitoUser != null){
        cognitoUser.getSession(function(err, session) {
            if(err){
                alert(err);
                return;
            }
            console.log('session validity: ' + session.isValid());
            console.log(cognitoUser.username);
            document.getElementById("usernamekey").innerHTML=cognitoUser.username;
        });
    }
}