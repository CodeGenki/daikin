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
#token validation code 
def is_token_valid(token):
        pem = "KEY HERE how do i get this "
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


@app.route("/customer", methods=["GET", "POST"])
def customer():
    return render_template("customer.html")

@app.route("/vendor")
def vendor():

    return render_template("vendor.html")

@app.route("/logincustomer")
def logincustomer():

    return render_template("logincustomer.html")
	#return redirect("https://project-intership.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=457v0csehtuoprbf6as9q3aenc&redirect_uri=https://c1dz5i3grc.execute-api.us-east-1.amazonaws.com/dev/")

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
    global username
    username = request.args.get('param', '')
    print("posted: " + username)
    return username