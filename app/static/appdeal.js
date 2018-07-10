
// var url_name = "https://qvtsi28b2k.execute-api.us-east-1.amazonaws.com/kristen"


var url_name = "https://7srr0yyhjg.execute-api.us-east-1.amazonaws.com/jenny";


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
    
    //console.log(cognitoUser);
    document.getElementById("noUsername").innerHTML = "";
    document.getElementById("invalidCredentials").innerHTML = "";
    cognitoUser.authenticateUser(authenticationDetails, {
        
        onSuccess: function (result) {

        	
            //console.log('access token + ' + result.getAccessToken().getJwtToken());
            window.location.href = url_name + "/vendor";

            //test
		}, 
		onFailure: function(err){
            //console.log(err);
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

function registerDEAL(){
	var username = $('#registration_username').val();
	var given_name = $('#registration_given_name').val();
	var family_name = $('#registration_family_name').val();
	var email = $('#registration_email').val();
    var company = $('#registration_company').val();
        if (company == 'New Company'){
            company = $('#new_company').val();
        }
	var phone_number = $('#registration_phone_number').val();
	var address = $('#registration_address').val();	
	var password = $('#registration_password').val();
    var passwordC = $('#registrationC_password').val();

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

    document.getElementById("givennameError").innerHTML = "";
    document.getElementById("familynameError").innerHTML = "";
    document.getElementById("addressError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("phonenumberError").innerHTML = "";
    document.getElementById("usernameError").innerHTML = "";
    document.getElementById("companyError").innerHTML = "";
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
    if (company.length === 0){
        document.getElementById("companyError").innerHTML = "Please enter a company name.";
        e = true;
    }
    if (password.length === 0){
        document.getElementById("passwordError").innerHTML = "Please enter a password.";
        e = true;
    }
    if (password != passwordC){
        e = true;
    } 


    if (!e){
    	var cognitoUser;
    	userPool.signUp(username, password, attributeList, null, function(err, result){
            if (err) {
                if(err.code == "InvalidParameterException"){
                    var e1 = "Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6";
                    var e2 = "Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: [\\S]+";
                    var e3 = "Value at 'username' failed to satisfy constraint: Member must have length greater than or equal to 1";
                    var e4 = "Value at 'username' failed to satisfy constraint: Member must satisfy regular expression pattern: [\\p{L}\\p{M}\\p{S}\\p{N}\\p{P}]+";
                    var e5 = "Invalid phone number format.";
                    var e6 = "Invalid email address format.";
                    if (err.message.search(e3) != -1 || err.message.indexOf(e4) != -1){
                        document.getElementById("usernameError").innerHTML = "Please enter a valid username with length greater than 1.";
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

                //console.log(err);	
            }


            if(e)
                return;

        	cognitoUser = result.user;
            //console.log('user name is ' + cognitoUser.getUsername());
            window.location.href  = url_name + "/code_validation_dealer";

        });
    }
}

function validateDEAL() {
    var username = $('#code_username').val();
    var code = $('#code_code').val();

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolDataDEAL);

    var userData = {
        Username : username,
        Pool : userPool
	};
 	var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    document.getElementById("codeError").innerHTML = "";
    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
            //console.log(err);
            document.getElementById("codeError").innerHTML = "Invalid username or code";

            // alert(err);
            return;
        }
    //console.log('call result: ' + result);


    window.location.href = url_name + "/vendor";


});
}

function signOutDEAL(){
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolDataDEAL);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser !== null){
    	cognitoUser.signOut();
    }

    window.location.href  = url_name + "/";

}

function setWelcomeDEAL() {
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolDataDEAL);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser !== null){
        cognitoUser.getSession(function(err, session){
            if(err){
                alert(err);
                return;
            }
            //console.log(cognitoUser);
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

    if(cognitoUser !== null){

        cognitoUser.getSession(function(err, session) {
            if(err){
                alert(err);
                return;
            }

            //console.log('session validity: ' + session.isValid());
            //console.log(cognitoUser.username);
            $.ajax({
                type: "GET",


                url: url_name + "/testdeal?vi=" + cognitoUser.username,

                success: function(data){
                    var tempInfo = JSON.parse(data); //save please
                    var userInfo = tempInfo[0];
                    document.getElementById("usernameDEAL").innerHTML = userInfo.username;
                    document.getElementById("companyDEAL").innerHTML = userInfo.company;
                },
                data: cognitoUser.username
            }).done(function( o ) {
                //console.log("Sent request to python file");
            });
        });
    }
}


function createTableEmp() {
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolDataDEAL);
    var cognitoUser = userPool.getCurrentUser();

    if(cognitoUser !== null){
        cognitoUser.getSession(function(err, session) {
            if(err){
                alert(err);
                return;
            }
            //console.log('session validity: ' + session.isValid());
            //console.log(cognitoUser.username);

            var request = new XMLHttpRequest();
            request.open('GET', url_name + "/testdeal?vi=" + cognitoUser.username, false);  // `false` makes the request synchronous
            request.send(null);

            if (request.status === 200) {
                //console.log(request.response);
                var data = request.response;
                var tempInfo = JSON.parse(data)[0]; //save please
                var comp = tempInfo.company;                    
                
                var request = new XMLHttpRequest();
                request.open('GET', url_name + "/testdeal?e=" + comp, false);  // `false` makes the request synchronous
                request.send(null);

                if (request.status === 200) {
                    //console.log(request.response);
                    var data = request.response;
                    var tableInfo = JSON.parse(data); //save please

                    var d = ["available","employeename","email","number"];
                    var rn = tableInfo.length;
                    var cn = document.getElementById("employees").rows[0].cells.length;
                    for(var r=1;r<=rn;r++) {
                    var x=document.getElementById('employees').insertRow(r);
                        for(var c=0;c<cn;c++) {
                           var y=  x.insertCell(c);
                            y.innerHTML=tableInfo[r-1][d[c]];
                        }
                    }
                }
            }
        });
    }
}

function createTableSup() {
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolDataDEAL);
    var cognitoUser = userPool.getCurrentUser();

    if(cognitoUser !== null){
        cognitoUser.getSession(function(err, session) {
            if(err){
                alert(err);
                return;
            }
            //console.log('session validity: ' + session.isValid());
            //console.log(cognitoUser.username);

            var request = new XMLHttpRequest();
            request.open('GET', url_name + "/testdeal?vi=" + cognitoUser.username, false);  // `false` makes the request synchronous
            request.send(null);

            if (request.status === 200) {
                //console.log(request.response);
                var data = request.response;
                var tempInfo = JSON.parse(data)[0]; //save please
                var comp = tempInfo.company;                    
                
                var request = new XMLHttpRequest();
                request.open('GET', url_name + "/testdeal?s=" + comp, false);  // `false` makes the request synchronous
                request.send(null);

                if (request.status === 200) {
                    //console.log(request.response);
                    var data = request.response;
                    var tableInfo = JSON.parse(data); //save please

                    var d = ["companyname","address","number","components"];
                    var rn = tableInfo.length;
                    var cn = document.getElementById("suppliers").rows[0].cells.length;
                    for(var r=1;r<=rn;r++) {
                    var x=document.getElementById('suppliers').insertRow(r);
                        for(var c=0;c<cn;c++) {
                           var y=  x.insertCell(c);
                            y.innerHTML=tableInfo[r-1][d[c]];
                        }
                    }
                }

            }
        });
    }
}

var saveCusData, allCusData,buttons;

function createTableCus() {
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolDataDEAL);
    var cognitoUser = userPool.getCurrentUser();
    saveCusData = [];
    allCusData = [];
    buttons = [];
    if(cognitoUser !== null){
        cognitoUser.getSession(function(err, session) {
            if(err){
                alert(err);
                return;
            }
            //console.log('session validity: ' + session.isValid());
            //console.log(cognitoUser.username);

            var request = new XMLHttpRequest();
            request.open('GET', url_name + "/testdeal?vi=" + cognitoUser.username, false);  // `false` makes the request synchronous
            request.send(null);

            if (request.status === 200) {
                //console.log(request.response);
                var data = request.response;
                var tempInfo = JSON.parse(data)[0]; //save please
                var customers = tempInfo.customers.split(" ");
                
                for (var j = 0, size = customers.length; j < size ; j++) {
                    var cus = customers[j];
                    var request = new XMLHttpRequest();
                    request.open('GET', url_name + "/testdeal?ci=" + cus, false);  // `false` makes the request synchronous
                    request.send(null);

                    if (request.status === 200) {
                        //console.log(request.response);
                        var data = request.response;
                        var tableInfo = JSON.parse(data); //save please

                        var d = ["unithealth","given_name","address","email","phone_number", "username","refrigerantleak","ErrorCode","company"];
                        // var rn = tableInfo.length;
                        var cn = document.getElementById("customersT").rows[0].cells.length;
                        
                        var x=document.getElementById('customersT').insertRow(1);
                        for(var c=0;c<cn;c++) {
                            var y =  x.insertCell(c);
                            if (d[c] == 'given_name'){
                                y.innerHTML=tableInfo[0][d[c]] + " " + tableInfo[0]['family_name'];   
                                allCusData.push(tableInfo[0][d[c]] + " " + tableInfo[0]['family_name']);
  
                            }
                            else {
                                y.innerHTML=tableInfo[0][d[c]];
                                allCusData.push(tableInfo[0][d[c]]);
                            }


                            
                            if (c == cn-1){
                                allCusData.push(tableInfo[0][d[c+1]]);
                                allCusData.push(tableInfo[0][d[c+2]]);
                                allCusData.push(tableInfo[0][d[c+3]]);
                                allCusData.push(tableInfo[0][d[c+4]]);
                            }
                        }
                        
                    }
                }
                

                 // var modal = document.getElementById('myModal');

                 //  var rows =  customers.length;
                 //  console.log(rows)
                 //  for(var r=1;r<=rows;r++) {
                 //    console.log(r)
                 //    var y = document.getElementById('customersT').rows[r].cells[0]
                 //    y.setAttribute("id","button"+r);
                 //    console.log(y.id);
                 //    // y.innerHTML = "hi";

                 //    // var btn = document.getElementById("button" + count);
                    
                 //    y.onclick = function() {
                 //      modal.style.display = "block";
                 //    }
                 //  }
                

                 // // Get the <span> element that closes the modal
                 //  var span = document.getElementsByClassName("close")[0];

                 //  // When the user clicks on <span> (x), close the modal
                 //  span.onclick = function() {
                 //      modal.style.display = "none";
                 //  }

                 //  // When the user clicks anywhere outside of the modal, close it
                 //  window.onclick = function(event) {
                 //      if (event.target == modal) {
                 //          modal.style.display = "none";
                 //      }
                 //  }

                  var rows =  customers.length;
                  //console.log(rows)
                  for(var r=1;r<=rows;r++) {
                    //console.log(r)
                    var y = document.getElementById('customersT').rows[r].cells[0]
                    y.setAttribute("id",r);
                    console.log(y.id);

                    // y.innerHTML = "hi";

                    // var btn = document.getElementById("button" + count);
                    buttons.push(document.getElementById(r));
                    y.onclick = function() {

                        var b = rows + 1 - this.id;
                        saveCusData=[]
                        saveCusData.push(allCusData[9*b-1]);
                        saveCusData.push(allCusData[9*b-2]);
                        saveCusData.push(allCusData[9*b-3]);
                        saveCusData.push(allCusData[9*b-4]);
                        saveCusData.push(allCusData[9*b-5]);
                        saveCusData.push(allCusData[9*b-6]);
                        saveCusData.push(allCusData[9*b-7]);
                        saveCusData.push(allCusData[9*b-8]);
                        saveCusData.push(allCusData[9*b-9]);
                        console.log(saveCusData);

                        localStorage.setItem('selected', saveCusData);

                        window.location.href = url_name + "/management";

                    }
                  }



                
            }
        });
    }
}

// function loadCompanies(){
//     var request = new XMLHttpRequest();
//     request.open('GET', url_name + "/getCompanies?dummy=" + "dummy", false);  // `false` makes the request synchronous
//     request.send(null);

//     if (request.status === 200) {
//         console.log(request.response);
//         var data = request.response;
//         var tempInfo = JSON.parse(data);
//         var comp = [];
//         for(var i = 0, size = tempInfo.length; i < size ; i++){
//           comp.push(tempInfo[i]['company']);          
//         }
//         comp = new Set(comp);


//         var select = document.getElementById("registration_company"); 
//         for (let opt of comp) {
//             var el = document.createElement("option");
//             el.textContent = opt;
//             el.value = opt;
//             select.appendChild(el);
//         }
//         var el = document.createElement("option");
//         el.textContent = "--- New Company --- ";
//         el.value = "New Company";
//         select.appendChild(el);

//     }

//   }
function showCusInfo(){
    var saveCusData = localStorage.getItem('selected');
    saveCusData = saveCusData.split(",");

    // document.getElementById("cusName").innerHTML = "Customer Name: " + saveCusData[10];
    // document.getElementById("cusComp").innerHTML = "Customer Company: " + saveCusData[0];
    // document.getElementById("cusAddress").innerHTML = "Customer Address: " + saveCusData[6]+","+saveCusData[7]+","+saveCusData[8]+","+saveCusData[9];
    // document.getElementById("cusPhone").innerHTML = "Customer Phone Number: " + saveCusData[4];
    // document.getElementById("cusEmail").innerHTML = "CUstomer Email: " + saveCusData[5];
    // document.getElementById("cusHealth").innerHTML = "Customer Unit Health: " + saveCusData[11];
    // document.getElementById("cusCode").innerHTML = "Customer Unit Error Codes: " + saveCusData[1];
    // document.getElementById("cusLeak").innerHTML = "Customer Unit Refrigerant Leak: " + saveCusData[2] + "%";
    // console.log(saveCusData)

    document.getElementById("cusName").innerHTML = saveCusData[10];
    document.getElementById("cusComp").innerHTML = saveCusData[0];
    if (saveCusData[0] == "Daikin"){
        document.getElementById("cusComp").value = "distances_Daikin";
    } else if (saveCusData[0] == "McCann Services Inc."){
        document.getElementById("cusComp").value = "distances_McCann";
    }
    document.getElementById("cusAddress").innerHTML = saveCusData[6]+","+saveCusData[7]+","+saveCusData[8]+","+saveCusData[9];
    document.getElementById("cusPhone").innerHTML = saveCusData[4];
    document.getElementById("cusEmail").innerHTML = saveCusData[5];
    document.getElementById("cusHealth").innerHTML = saveCusData[11];
    document.getElementById("cusCode").innerHTML = saveCusData[1];
    document.getElementById("cusLeak").innerHTML = saveCusData[2];
    // console.log(saveCusData)

}
