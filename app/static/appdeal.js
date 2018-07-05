
var poolDataDEAL = {
	UserPoolId : 'us-east-1_QFcNXf7g8', // Your user pool id here
	ClientId : '4ut1fjlf1v35jbj2v9cks6981l' // Your client id here
};

function signInDEAL(){
	var username = $('#sign_in_username').val();
	var password = $('#sign_in_password').val();

	var authenticationDataDEAL = {
		Username : username,
		Password : password,
	};

	var authenticationDetails = new  AmazonCognitoIdentity.AuthenticationDetails(authenticationDataDEAL);
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolDataDEAL);

    var userData = {
        Username : username,
        Pool : userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    console.log(cognitoUser);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
        	console.log('access token + ' + result.getAccessToken().getJwtToken());
            window.location.href = "https://qvtsi28b2k.execute-api.us-east-1.amazonaws.com/kristen/vendor";
            //test
		}, 
		onFailure: function(err){
			console.log(err);
            alert(err);
		}
	});

}

function registerDEAL(){
	var username = $('#registration_username').val();
	var given_name = $('#registration_given_name').val();
	var family_name = $('#registration_family_name').val();
	var email = $('#registration_email').val();
    var company = $('#registration_company').val();
	var phone_number = $('#registration_phone_number').val();
	var address = $('#registration_address').val();	
	var password = $('#registration_password').val();

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolDataDEAL);

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
        Name : 'custom:company',
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
        window.location.href  = "https://qvtsi28b2k.execute-api.us-east-1.amazonaws.com/kristen/code_validation_dealer";

});
}

function validateDEAL() {
    var username = $('#code_username').val();
    var code = $('#code_code').val();

	console.log(username);
	console.log(code);

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolDataDEAL);

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
    window.location.href = "https://qvtsi28b2k.execute-api.us-east-1.amazonaws.com/kristen/vendor";

});
}

function signOutDEAL(){
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolDataDEAL);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null){
    	cognitoUser.signOut();
    }
    window.location.href  = "https://qvtsi28b2k.execute-api.us-east-1.amazonaws.com/kristen/";
}

function setWelcomeDEAL() {
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolDataDEAL);
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

function get_userDEAL(){
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolDataDEAL);
    var cognitoUser = userPool.getCurrentUser();

    if(cognitoUser != null){
        cognitoUser.getSession(function(err, session) {
            if(err){
                alert(err);
                return;
            }

            console.log('session validity: ' + session.isValid());
            console.log(cognitoUser.username);
            $.ajax({
                type: "GET",
                url: "https://qvtsi28b2k.execute-api.us-east-1.amazonaws.com/kristen/testdeal?param=" + cognitoUser.username,
                success: function(data){
                    var tempInfoDEAL = JSON.parse(data); //save please
                    var userInfoDEAL = tempInfoDEAL[0];
                    console.log("got return statement - " + data);
                    console.log("got return statement - " + userInfoDEAL);
                    console.log("got return username - " + userInfoDEAL.username);
                    console.log("got return phone_number - " + userInfoDEAL.phone_number);
                    console.log("got return family_name - " + userInfoDEAL.family_name);
                    console.log("got return given_name - " + userInfoDEAL.given_name);
                    console.log("got return address - " + userInfoDEAL.address);
                    console.log("got return email - " + userInfoDEAL.email);



                    document.getElementById("usernameDEAL").innerHTML = userInfoDEAL.username;
                    document.getElementById("phone_numberDEAL").innerHTML = userInfoDEAL.phone_number;
                    document.getElementById("family_nameDEAL").innerHTML = userInfoDEAL.family_name;
                    document.getElementById("given_nameDEAL").innerHTML = userInfoDEAL.given_name;
                    document.getElementById("addressDEAL").innerHTML = userInfoDEAL.address;
                    document.getElementById("companyDEAL").innerHTML = userInfoDEAL.company;
                    document.getElementById("emailDEAL").innerHTML = userInfoDEAL.email;
                },
                data: cognitoUser.username
            }).done(function( o ) {
                console.log("Sent request to python file");
            });
        });
    }
}

