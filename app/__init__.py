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

# @app.route("/form", methods=['GET', 'POST'])
# def form():
#     """
#     A Page to Test Sending Data to Trigger a Lambda Function
#     """

#     form = ReusableForm(request.form)

#     print form.errors
#     if request.method == 'POST':
#         fname =request.form['fname']
#         lname =request.form['lname']
#         email =request.form['email']
#         phone =request.form['phone']  
#         print fname
#         print lname

#         if form.validate():
#             flash('Hello ' + fname + ' ' + lname)
#             table = dynamodb.Table('users')
#             table.put_item(
#             Item = {"first_name": fname, "last_name": lname, "email_address": email, "Phonenumber": phone}
#             )
#         else:
#             flash('All the form fields are required.')

#     return render_template('form.html', form=form)




# @app.route("/customer", methods=['GET','POST'])
# def customer():

#     #pulls from RForm function to display form with just username/password
#     form=RForm(request.form)

# #     #idk why this is there- was just on website
#     print form.errors
#     if request.method == 'POST':

# #       #pulls data from RForm-uname/pword are in str form
#         uname =request.form['uname']
#         pword =request.form['pword']

#         if form.validate():

#             #connects to userT table in dynamo db
#             dynamodb=boto3.resource('dynamodb')
#             table=dynamodb.Table('userT')
  

#             try: 
#             #tries to get username from db- if uname exists it returns a super jumbled up 
#             #dictionary 
#                 response = table.get_item( Key={'uname': uname} )
#                 flash(response)
#                 item = response['Item']
#             #aDicstr is a string representing a dictionary of db values 
#                 aDicstr= json.dumps(item, indent=4, cls=DecimalEncoder)    

#             # this is supposed to flash system error if uname not in database but 
#             # isn't doing it 
#             except SystemError: 
#                 flash("invalid username!")
#                 #return render_template('customer.html', form=form)

#         #ast.literal_eval turns the string into correct dictionary format 
#         aDic= ast.literal_eval(aDicstr)
#         a=aDic["pword"]
#         b=aDic["utype"]
#         #checks if entered password and password in db are the same- also utype 
#         #should be customer if they are trying to login to the customer portal
#         if a==pword and b=="customer":
#             flash("Successful login!")



#     return render_template('customer.html', form=form)

