//AWSCognito.config.region = 'us-east-1'; 
//var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
//var CognitoUser = AmazonCognitoIdentity.CognitoUser;
//var AuthenticationDetails = AmazonCognitoIdentity.AuthenticationDetails;

var poolData = {
	UserPoolId : 'us-east-1_QFcNXf7g8l', // Your user pool id here
	ClientId : '5jgc6qm3jjif4nfqlvh5kukfe6' // Your client id here
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
            window.location.href = "https://c1dz5i3grc.execute-api.us-east-1.amazonaws.com/dev/vendor";
            //test
		}, 
		onFailure: function(err){
			console.log(err);
            alert(err);
		}
	});

}

function register(){
	var username = $('#registration_username').val();
	var given_name = $('#registration_given_name').val();
	var family_name = $('#registration_family_name').val();
	var email = $('#registration_email').val();
    var company = $('#registration_company').val();
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
    var datacompany = {
        Name : 'company',
        Value : company
    };
    var attributegiven_name = new AmazonCognitoIdentity.CognitoUserAttribute(datagiven_name);
    var attributefamily_name = new AmazonCognitoIdentity.CognitoUserAttribute(datafamily_name);
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    var attributeaddress = new AmazonCognitoIdentity.CognitoUserAttribute(dataaddress);
    var attributephone_number = new AmazonCognitoIdentity.CognitoUserAttribute(dataphone_number);
    var attributecompany = new AmazonCognitoIdentity.CognitoUserAttribute(datacompany);


	attributeList.push(attributegiven_name);
	attributeList.push(attributefamily_name);
	attributeList.push(attributeEmail);
	attributeList.push(attributeaddress);
	attributeList.push(attributephone_number);
    attributeList.push(attributecompany);


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
    window.location.href = "https://c1dz5i3grc.execute-api.us-east-1.amazonaws.com/dev/vendor";

});
}

function signOut(){
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null){
    	cognitoUser.signOut();
    }
    window.location.href  = "https://c1dz5i3grc.execute-api.us-east-1.amazonaws.com/dev";
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