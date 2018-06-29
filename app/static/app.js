// var url_name = "https://cl0igb14s8.execute-api.us-east-1.amazonaws.com/michael";
// var url_name = "https://qvtsi28b2k.execute-api.us-east-1.amazonaws.com/kristen";
var url_name = "https://7srr0yyhjg.execute-api.us-east-1.amazonaws.com/jenny";

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
    document.getElementById("noUsername").innerHTML = "";
    document.getElementById("invalidCredentials").innerHTML = "";
    cognitoUser.authenticateUser(authenticationDetails, {
        
        onSuccess: function (result) {

        	console.log('access token + ' + result.getAccessToken().getJwtToken());
            window.location.href = url_name + "/customer";
            //test
        }, 
        onFailure: function(err){
            console.log(err);
            //alert(err);
            if(err.code == "InvalidParameterException"){
                document.getElementById("noUsername").innerHTML = "Please enter a valid username.";
            }
            else if(err.code == "NotAuthorizedException" || err.code == "UserNotFoundException" || err.code == "UserNotConfirmedException"){
                document.getElementById("invalidCredentials").innerHTML = "Incorrect username or password.";
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

    document.getElementById("givennameError").innerHTML = "";
    document.getElementById("familynameError").innerHTML = "";
    document.getElementById("addressError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("phonenumberError").innerHTML = "";
    document.getElementById("usernameError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    
    var e = false;
    if (username.length === 0){
        document.getElementById("usernameError").innerHTML = "Please enter a username.";
        e = true;
    }
    if (given_name.length === 0){
        document.getElementById("givennameError").innerHTML = "Please enter a given name.";
        e = true;
    }
    if (family_name.length === 0){
        document.getElementById("familynameError").innerHTML = "Please enter a family name.";
        e = true;
    }
    if (address.length === 0){
        document.getElementById("addressError").innerHTML = "Please enter an address.";
        e = true;
    }
    if (phone_number.indexOf('+1') !== 0 || phone_number.length != 12){
        document.getElementById("phonenumberError").innerHTML = "Please enter a valid phone number in the following format: +11234567890.";
        e = true;
    }
    if (email.indexOf('@') == -1 || email.indexOf('.') == -1){
        document.getElementById("emailError").innerHTML = "Please enter a valid email.";
        e = true;
    }
    if (password.length === 0){
        document.getElementById("passwordError").innerHTML = "Please enter a password.";
        e = true;
    }

    if (!e){
    	var cognitoUser;
    	userPool.signUp(username, password, attributeList, null, function(err, result){
            
            
            if (err) {
                // var error_string = "4 validation errors detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6; Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: [\\S]+; Value at 'username' failed to satisfy constraint: Member must have length greater than or equal to 1; Value at 'username' failed to satisfy constraint: Member must satisfy regular expression pattern: [\\p{L}\\p{M}\\p{S}\\p{N}\\p{P}]+";
                if(err.code == "InvalidParameterException"){
                    var e1 = "Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6";
                    var e2 = "Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: [\\S]+";
                    var e3 = "Value at 'username' failed to satisfy constraint: Member must have length greater than or equal to 1";
                    var e4 = "Value at 'username' failed to satisfy constraint: Member must satisfy regular expression pattern: [\\p{L}\\p{M}\\p{S}\\p{N}\\p{P}]+";
                    var e5 = "Invalid phone number format.";
                    var e6 = "Invalid email address format.";
                    if (err.message.search(e3) != -1 || err.message.search(e4) != -1){
                        document.getElementById("usernameError").innerHTML = "Please enter a username with length greater than 1.";
                        e = true;      
                    }         
                    if (err.message.search(e1) != -1 || err.message.search(e2) != -1){
                        document.getElementById("passwordError").innerHTML = "Please enter a password with length greater than 6.";
                        e = true;
                    }
                    if (err.message.search(e5) != -1){
                        document.getElementById("phonenumberError").innerHTML = "Please enter a valid phone number in the following format: +11234567890.";
                        e = true;
                    }
                    if (err.message.search(e6) != -1){
                        document.getElementById("emailError").innerHTML = "Please enter a valid email.";
                        e = true;
                    }
                }
                if (err.code == "UsernameExistsException"){
                    var e7 = "User already exists";
                    if (err.message.search(e7) != -1){
                        document.getElementById("usernameError").innerHTML = e7 + ".";
                        e = true;
                    }
                }

            	console.log(err);
                // alert(err.message);
                // document.getElementById("registerError").innerHTML = err.message;
            }

            if(e)
                return;
            
            cognitoUser = result.user;
            console.log(result);
            console.log('user name is ' + cognitoUser.getUsername());

            window.location.href  = url_name + "/code_validation";

        });
    }
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
    document.getElementById("codeError").innerHTML = "";
    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
            console.log(err);
            document.getElementById("codeError").innerHTML = "Invalid username or code";

            // alert(err);
            return;
        }
    console.log('call result: ' + result);

    window.location.href = url_name + "/customer";

});
}

function signOut(){
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser !== null){
        cognitoUser.signOut();
    }
    window.location.href  = url_name + "/";

}

function setWelcome () {
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser !== null){
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

    console.log("hello from app js");
}

function get_user(){
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if(cognitoUser !== null){
        cognitoUser.getSession(function(err, session) {
            if(err){
                alert(err);
                return;
            }

            console.log('session validity: ' + session.isValid());
            console.log(cognitoUser.username);
            $.ajax({
                type: "GET",

                url: url_name + "/test?ci=" + cognitoUser.username,

                success: function(data){
                    var tempInfo = JSON.parse(data); //save please
                    var userInfo = tempInfo[0];
                    document.getElementById("usernamekey").innerHTML = userInfo.username;
                    document.getElementById("phone_numberkey").innerHTML = userInfo.phone_number;
                    document.getElementById("family_namekey").innerHTML = userInfo.family_name;
                    document.getElementById("given_namekey").innerHTML = userInfo.given_name;
                    document.getElementById("addresskey").innerHTML = userInfo.address;
                    document.getElementById("emailkey").innerHTML = userInfo.email;
                },
                data: cognitoUser.username
            }).done(function( o ) {
                console.log("Sent request to python file");
            });
        });
    }
}
function parseError(){
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if(cognitoUser !== null){
        cognitoUser.getSession(function(err, session) {
            if(err){
                alert(err);
                return;
            }

            console.log('session validity: ' + session.isValid());
            console.log(cognitoUser.username);

            var e1 = document.getElementById("errorcode1").innerHTML;
            var e2 = document.getElementById("errorcode2").innerHTML;
            var e3 = document.getElementById("errorcode3").innerHTML;
            var e4 = document.getElementById("errorcode4").innerHTML;
            
            var request = new XMLHttpRequest();
            request.open('GET', url_name + "/test?ec=" + cognitoUser.username, false);  // `false` makes the request synchronous
            request.send(null);

            if (request.status === 200) {
                console.log(request.response);
                var data = request.response;
                var tempInfo = JSON.parse(data); //save please

                document.getElementById("des1").innerHTML = "N/A";
                document.getElementById("des2").innerHTML = "N/A";
                document.getElementById("des3").innerHTML = "N/A";
                document.getElementById("des4").innerHTML = "N/A";
                var i = -1;
                if (e1 != "None") {

                    if (isNaN(parseInt(e1))){
                        if (e1 == "b0"){
                            i = 33;
                        }
                        else if (e1 == "b9"){
                            i = 34;
                        }
                        else if (e1 == "b9"){
                            i = 35;
                        }
                        else if (e1 == "d0"){
                            i = 36;
                        }
                        else if (e1 == "d1"){
                            i = 37;
                        }
                        else if (e1 == "d2"){
                            i = 38;
                        }
                        else if (e1 == "d3"){
                            i = 39;
                        }
                        else if (e1 == "d4"){
                            i = 40;
                        }
                    }
                    else {
                        i = parseInt(e1) - 11;
                    }
                    console.log("e1 index" + i);
                    document.getElementById("des1").innerHTML = tempInfo[i]['Descriptions'];

                }

                if (e2 != "None") {
                    if (isNaN(parseInt(e2))){
                        if (e2 == "b0"){
                            i = 33;
                        }
                        else if (e2 == "b9"){
                            i = 34;
                        }
                        else if (e2 == "b9"){
                            i = 35;
                        }
                        else if (e2 == "d0"){
                            i = 36;
                        }
                        else if (e2 == "d1"){
                            i = 37;
                        }
                        else if (e2 == "d2"){
                            i = 38;
                        }
                        else if (e2 == "d3"){
                            i = 39;
                        }
                        else if (e2 == "d4"){
                            i = 40;
                        }
                    }
                    else {
                        i = parseInt(e2) - 11;
                    }
                    console.log("e2 index" + i);
                    document.getElementById("des2").innerHTML = tempInfo[i]['Descriptions'];

                }
                if (e3 != "None") {
                    if (isNaN(parseInt(e3))){
                        if (e3 == "b0"){
                            i = 33;
                        }
                        else if (e3 == "b9"){
                            i = 34;
                        }
                        else if (e3 == "b9"){
                            i = 35;
                        }
                        else if (e3 == "d0"){
                            i = 36;
                        }
                        else if (e3 == "d1"){
                            i = 37;
                        }
                        else if (e3 == "d2"){
                            i = 38;
                        }
                        else if (e3 == "d3"){
                            i = 39;
                        }
                        else if (e3 == "d4"){
                            i = 40;
                        }
                    }
                    else {
                        i = parseInt(e3) - 11;
                    }
                    console.log("e3 index" + i);
                    document.getElementById("des3").innerHTML = tempInfo[i]['Descriptions'];
                }
                if (e4 != "None") {
                    if (isNaN(parseInt(e4))){
                        if (e4 == "b0"){
                            i = 33;
                        }
                        else if (e4 == "b9"){
                            i = 34;
                        }
                        else if (e4 == "b9"){
                            i = 35;
                        }
                        else if (e4 == "d0"){
                            i = 36;
                        }
                        else if (e4 == "d1"){
                            i = 37;
                        }
                        else if (e4 == "d2"){
                            i = 38;
                        }
                        else if (e4 == "d3"){
                            i = 39;
                        }
                        else if (e4 == "d4"){
                            i = 40;
                        }
                    }
                    else {
                        i = parseInt(e4) - 11;
                    }
                    console.log("e4 index" + i);
                    document.getElementById("des4").innerHTML = tempInfo[i]['Descriptions'];
                }
            }                   

        });
    }

}
               

function get_unit(){
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if(cognitoUser !== null){
        cognitoUser.getSession(function(err, session) {
            if(err){
                alert(err);
                return;
            }

            console.log('session validity: ' + session.isValid());
            console.log(cognitoUser.username);
            $.ajax({
                type: "GET",

                url: url_name + "/test?c=" + cognitoUser.username,

                success: function(data){
                    var tempInfo = JSON.parse(data); //save please
                    var userInfo = tempInfo[0];
                    // document.getElementById("username").innerHTML = userInfo.username;
                    document.getElementById("refrigerant").innerHTML = userInfo.refrigerantleak;
                    document.getElementById("unitstatus").innerHTML = userInfo.unithealth;
                    document.getElementById("t").innerHTML = userInfo.Time;
                    
                    var errorArray = userInfo.ErrorCode.split(" ");

                    document.getElementById("errorcode1").innerHTML = "None";
                    document.getElementById("errorcode2").innerHTML = "None";
                    document.getElementById("errorcode3").innerHTML = "None";
                    document.getElementById("errorcode4").innerHTML = "None";
                                              
                    if (errorArray.length > 0)
                        document.getElementById("errorcode1").innerHTML = errorArray[0];
                    
                    if (errorArray.length > 1)
                        document.getElementById("errorcode2").innerHTML = errorArray[1];
                    
                    if (errorArray.length > 2)
                        document.getElementById("errorcode3").innerHTML = errorArray[2];

                    if (errorArray.length > 3)
                        document.getElementById("errorcode4").innerHTML = errorArray[3];    
                     
                    
                //     document.getElementById("location").innerHTML = userInfo.location;
                //     document.getElementById("company").innerHTML = userInfo.company;
                },
                data: cognitoUser.username
            }).done(function( o ) {
                console.log("Sent request to python file");
            });
        });
    }
}

