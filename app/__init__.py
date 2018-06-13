import boto3, botocore
import json
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


# class ReusableForm(Form):
#     fname = TextField('First Name:', validators=[validators.required()])
#     lname = TextField('Last Name:', validators=[validators.required()])
#     email = TextField('Email Address:', validators=[validators.required()])
#     phone = TextField('Phone Number:', validators=[validators.required()])

# class RForm(Form):
#     uname= TextField('Username:', validators=[validators.required()])
#     pword= PasswordField('Password:', validators=[validators.required()])

# class RetrieveInfo(json.JSONEncoder):
#     def default(self, o):
#         if isinstance(o, decimal.Decimal):
#             return str(o)
#         return super(DecimalEncoder, self).default(o)


#reading database helper function


# class DecimalEncoder(json.JSONEncoder):
#     def default(self, o):
#         if isinstance(o, decimal.Decimal):
#             if o % 1 > 0:
#                 return float(o)
#             else:
#                 return int(o)
#         return super(DecimalEncoder, self).default(o)

####


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

@app.route("/login")
def login():
	return redirect("https://project-intership.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=457v0csehtuoprbf6as9q3aenc&redirect_uri=https://c1dz5i3grc.execute-api.us-east-1.amazonaws.com/dev/")

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


