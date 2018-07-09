import boto3, botocore
import json
import jwt
from jwt.contrib.algorithms.pycrypto import RSAAlgorithm
from flask import Flask, request, flash
from flask import render_template, redirect, url_for, request
from wtforms import Form, TextField, TextAreaField, validators, StringField, SubmitField, PasswordField

#importing functions to read db
import decimal
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
import ast

app = Flask(__name__)

app.config.from_object('config')
app.config.from_object('bucketConfig')
app.config['SECRET_KEY'] = '7d441f27d441f27567d441f2b6176a'

s3 = boto3.resource('s3')
bucketname = 'json-to-dynamodb-mh423'
s3.create_bucket(Bucket=bucketname)

dynamodb = boto3.resource('dynamodb')

global username
global usernameDEAL
#token validation code 
def is_token_valid(token):
        pem = ""
        try:
            decoded_token = jwt.decode(token, pem, algorithms=['RS256'])
            iss = "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_2o7S9Pswl"
            if decoded_token['iss'] != iss:
                print 'iss false'
                return false
            elif decoded_token['token_use'] != 'access':
                print 'access false'
                return False
            kid = 'kid from token'
            if jwt.get_unverified_header(token)['kid'] != kid:
                print 'kid false'
                return False
            return True
            #return decoded_token['username']
        except Exception:
            return False 

@app.route("/")
def index():
    """
    The Home Page for our app
    """
  # return redirect("https://project-intership.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=457v0csehtuoprbf6as9q3aenc&redirect_uri=https://c1dz5i3grc.execute-api.us-east-1.amazonaws.com/dev/") 
    #just using render_template for now to 

    return render_template('index1.html')


@app.route("/customer")
def customer():
    return render_template("customer.html")

@app.route("/vendor")
def vendor():

    return render_template("vendor.html")

@app.route("/logincustomer")
def logincustomer():

    return render_template("logincustomer.html")

@app.route("/logindealer")
def logindealer():
    return render_template("logindealer.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/unithealth")
def unithealth():

    return render_template("unithealth.html")

@app.route("/finddealer")
def finddealer():

    return render_template("finddealer.html")

@app.route("/contactus")
def contactus():

    return render_template("contactus.html")

@app.route("/aboutunitx")
def aboutunitx():

    return render_template("aboutunitx.html")

@app.route("/faqs")
def faqs():

    return render_template("faqs.html")
    
    #return render_template("login.html")

@app.route("/code_validation")
def code_validation():

    return render_template("code_validation.html")

@app.route("/code_validation_dealer")
def code_validation_dealer():

    return render_template("code_validation_dealer.html")

@app.route("/api/protected_api", methods=["POST"])
def protected_api():
    #access_token = request.from['access_token']
    if(is_token_valid(access_token)):
        return 'some protected data from api'
    else:
        return 'bad token', 401



@app.route("/kristen")
def kristen():

    return render_template('finddealer.html')


@app.route("/homehvac")
def homehvac():

    return render_template("homehvac.html")


@app.route("/employees")
def employees():

    return render_template("employees.html")

@app.route("/customers")
def customers():
    
    return render_template("customers.html")

@app.route("/suppliers")
def suppliers():

    return render_template("suppliers.html")


@app.route("/hvacaboutx")
def hvacaboutx():

    return render_template("hvacaboutx.html")

@app.route("/hvacfaqs")
def hvacfaqs():

    return render_template("hvacfaqs.html")

@app.route("/hvaccontactus")
def hvaccontactus():

    return render_template("hvaccontactus.html")


@app.route("/hvacaccount")
def hvacaccount():

    return render_template("hvacaccount.html")


@app.route("/test", methods=["GET", "POST"])
def test():
    #if request.method == "POST":
    global key
    
    tablenames = ["Customer_information", "customer", "ErrorCode","employees"]
    keynames = ["username","username","E","company"]
    
    ci = str(request.args.get('ci', ''))
    c = str(request.args.get('c',''))
    ec = str(request.args.get('ec',''))
    e = str(request.args.get('e',''))

    # print("@" +str(request.args.get('c', '')) + "@")

    if  ci != "":
        key = str(ci)
        tablename = tablenames[0]
        keyname = keynames[0]
    
    elif c != "":
        key = str(c)
        tablename = tablenames[1]
        keyname = keynames[1]

    elif ec != "":
        key = str(ec)
        tablename = tablenames[2]
        keyname = keynames[2]

    elif e != "":
        key = str(e)
        tablename = tablenames[3]
        keyname = keynames[3]

    # print("username is:@" + key + "@")
    # username = request.args.get('param', '')
    # tablename = request.args.get('table','')
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table(tablename)
    response = table.query(KeyConditionExpression=Key(keyname).eq(key))



    # print("posted: " + response['Items'])
    # return response['Items']
    print(json.dumps(response['Items']))
    return json.dumps(response['Items'])

@app.route("/testdeal", methods=["GET", "POST"])
def testdeal():
    #if request.method == "POST":
    global key
    
    tablenames = ["Vendor_information", "customer", "ErrorCode","employees", "Suppliers","Customer_information"]
    keynames = ["username","username","E","company","Affiliate","username"]
   
    vi = str(request.args.get('vi', ''))
    c = str(request.args.get('c',''))
    ec = str(request.args.get('ec',''))
    e = str(request.args.get('e',''))

    s = str(request.args.get('s',''))
    ci = str(request.args.get('ci',''))

    if  vi != "":
        key = str(vi)
        tablename = tablenames[0]
        keyname = keynames[0]
    
    elif c != "":
        key = str(c)
        tablename = tablenames[1]
        keyname = keynames[1]

    elif ec != "":
        key = str(ec)
        tablename = tablenames[2]
        keyname = keynames[2]

    elif e != "":
        key = str(e)
        tablename = tablenames[3]
        keyname = keynames[3]

    elif s != "":
        key = str(s)
        tablename = tablenames[4]
        keyname = keynames[4]
 
    elif ci != "":
        key = str(ci)
        tablename = tablenames[5]
        keyname = keynames[5]

    print("key is:@" + key + "@")
    # username = request.args.get('param', '')
    # tablename = request.args.get('table','')
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table(tablename)
    response = table.query(KeyConditionExpression=Key(keyname).eq(key))
    print(json.dumps(response['Items']))
    return json.dumps(response['Items'])

@app.route("/registeruser")
def registeruser():

    return render_template("registeruser.html")

@app.route("/registerdealer")
def registerdealer():

    return render_template("registerdealer.html")

@app.route("/management")
def management():
    
    return render_template("management.html")

@app.route("/writeDealer", methods=["GET", "POST"])
def writeDealer():
    #if request.method == "POST":
    global key
    
    tablenames = ["Customer_information"]
    keynames = ["username"]
    fieldnames = ["company"]

    ci = str(request.args.get('ci', ''))
    comp = str(request.args.get('comp',''))
   
    print(ci)
    print(comp)
    # print("@" +str(request.args.get('c', '')) + "@")

    if  ci != "":
        key = str(ci)
        tablename = tablenames[0]
        keyname = keynames[0]

        if comp != "":
            field = str(comp)
            fieldname = fieldnames[0]
 

    # print("username is:@" + key + "@")
    # username = request.args.get('param', '')
    # tablename = request.args.get('table','')
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table(tablename)
    old_comp = table.query(KeyConditionExpression=Key(keyname).eq(key))
    old_comp = old_comp['Items'][0].get(fieldname)
    # response = table.query(KeyConditionExpression=Key(keyname).eq(key))
    # # print("posted: " + response['Items'])
    # return response['Items']
    # print(json.dumps(response['Items']))
    # return json.dumps(response['Items'])
    table.update_item(
        Key={
            keyname: key
        },
        UpdateExpression='SET ' + fieldname + ' = :val1',
        ExpressionAttributeValues={
            ':val1': field
        }
    )

    if field != old_comp:
        table = dynamodb.Table("Vendor_information")
        response = table.scan()['Items']
        for i in response:
            if i.get(fieldname) == field:
                cus = i.get("customers")
                cus = cus.split(" ")
                cus.append(key)
                cus = set(cus)
                cus = list(cus)
                cus = " ".join(cus)
                table.update_item(
                    Key={
                        keyname: i.get(keyname)
                    },
                    UpdateExpression='SET customers = :val1',
                    ExpressionAttributeValues={
                        ':val1': cus
                    }
                )
            if i.get(fieldname) == old_comp:
                cus = i.get("customers")
                cus = cus.split(" ")
                cus = set(cus)
                cus.remove(key)
                cus = list(cus)
                cus = " ".join(cus)
                table.update_item(
                    Key={
                        keyname: i.get(keyname)
                    },
                    UpdateExpression='SET customers = :val1',
                    ExpressionAttributeValues={
                        ':val1': cus
                    }
                )


    print(json.dumps(response['Items']))
    return json.dumps(response['Items'])


@app.route("/getCompanies", methods=["GET", "POST"])
def getCompanies():
    dummy = str(request.args.get('dummy', ''))
    print(dummy)

    from boto3.dynamodb.conditions import Key, Attr
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("Vendor_information")

    response = table.scan();
   
    print(json.dumps(response['Items']))
    return json.dumps(response['Items'])

@app.route("/addMembers", methods=["GET", "POST"])
def addMembers():
    tablename  = str(request.args.get('table', ''))
    companyAffiliate = str(request.args.get('companyAffiliate', ''))
    name = str(request.args.get('name', ''))
    address = str(request.args.get('address', ''))
    phone = str(request.args.get('phone', ''))
    compemail = str(request.args.get('compemail', ''))
    ava = str(request.args.get('ava', ''))

    print(tablename)
    print(companyAffiliate)
    print(name)
    print(address)
    print(phone)
    print(compemail)
    print(ava)

    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table(tablename)

    if tablename == "Suppliers":
        response = table.put_item(
           Item={
                'Affiliate': companyAffiliate,
                'companyname': name,
                'address': address,
                'components': compemail,
                'number': phone
            }
        )
    elif tablename == "employees":
        response = table.put_item(
           Item={
                'company': companyAffiliate,
                'employeename': name,
                'address': address,
                'email': compemail,
                'number': phone,
                'available': ava
            }
        )
   
    return json.dumps(response.get('ResponseMetadata').get('HTTPStatusCode'))
