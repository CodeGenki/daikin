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


class ReusableForm(Form):
    fname = TextField('First Name:', validators=[validators.required()])
    lname = TextField('Last Name:', validators=[validators.required()])
    email = TextField('Email Address:', validators=[validators.required()])
    phone = TextField('Phone Number:', validators=[validators.required()])

class RForm(Form):
    uname= TextField('Username:', validators=[validators.required()])
    pword= PasswordField('Password:', validators=[validators.required()])

# class RetrieveInfo(json.JSONEncoder):
#     def default(self, o):
#         if isinstance(o, decimal.Decimal):
#             return str(o)
#         return super(DecimalEncoder, self).default(o)


#reading database helper function


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

####

@app.route("/")
def index():
    """
    The Home Page for our app
    """

    return render_template('index1.html')

# @app.route("/login")
# def login():

#     return render_template('login.html')




@app.route("/form", methods=['GET', 'POST'])
def form():
    """
    A Page to Test Sending Data to Trigger a Lambda Function
    """

    form = ReusableForm(request.form)

    print form.errors
    if request.method == 'POST':
        fname =request.form['fname']
        lname =request.form['lname']
        email =request.form['email']
        phone =request.form['phone'] #added email field I hope it works 
        print fname
        print lname

        if form.validate():
            flash('Hello ' + fname + ' ' + lname)
            table = dynamodb.Table('users')
            table.put_item(
            Item = {"first_name": fname, "last_name": lname, "email_address": email, "Phonenumber": phone}
            )
            #json_data = json.dumps(data)
            #obj = s3.Object(bucketname,'users.json')
            #obj.put(Body=json.dumps(data))
            #print obj.get()['Body'].read()
        else:
            flash('All the form fields are required.')

    return render_template('form.html', form=form)

# @app.route("/loadgen")
# def loadgen():
#     """
#     A Web Page that generates load for perf testing
#     """

#     from time import time
#     # Params to set up the workload
#     iterations = 300000
#     i = 0
#     x = 2
#     # Ready Set go (capture start time)
#     start = time()
#     # do the useless work to generate CPU load
#     while i < iterations:
#         x = x * 2
#         i += 1
#     # We're done
#     end = time()
#     # Figure out the elapsed Seconds
#     seconds = end - start
#     # Pass it all to the template for presentation
#     return render_template('loadgen.html', iters=iterations,
#             duration = seconds)

# @app.route("/gallery")
# def gallery():
#     """
#     A Page to show the image contents of a S3 bucket
#     """

#     from boto3 import resource, client
#     from urllib import quote

#     # connect to s3
#     s3 = resource('s3')
#     s3client = client('s3')
#     bucket = s3.Bucket(app.config['UPLOAD_BUCKET'])
#     files = []

#     # iterate through the filtered list of objects
#     for object in bucket.objects.filter():
#         file = {}
#         file['name'] = object.key
#         # Get object URL (could use signed URLs)
#         object_url = 'http://' + object.bucket_name
#         object_url += '.s3.amazonaws.com/'
#         object_url += quote(object.key)
#         file['url'] = object_url
#         # Get the object size in KB
#         object_size = round(float(object.size) / 1024, 1)
#         file['size'] = object_size
#         # Get the object last modified date & time (w/ out secs)
#         object_date = str(object.last_modified).split("+")[0]
#         file['date'] = object_date
#         # Get thumburl if from object metadata
#         metadata = s3client.head_object(
#                 Bucket = object.bucket_name,
#                 Key = object.key)['Metadata']
#         file['thumburl'] = ''
#         if 'thumburl' in metadata:
#             file['thumburl'] = metadata['thumburl']
#         # append file to list of files
#         files.append(file)
#     return render_template('gallery.html', files = files)

# # Uploads Page
# @app.route('/upload')
# def upload():
#     """
#     A Really simple page to upload files to the S3 bucket
#     """

#     from boto3 import client
#     s3 = client('s3')
#     # Generate the POST URL & fields
#     # This allows web clients to upload files to S3 without authenticating
#     # to S3
#     post = s3.generate_presigned_post(
#         Bucket = app.config['UPLOAD_BUCKET'],
#         Fields = {'acl': 'public-read', 'content-type': 'image/png'},
#         Key =  '${filename}',
#         Conditions = [{'acl': 'public-read'}, {'content-type': 'image/png'}]
#     )
#     return render_template('upload.html', post = post)



@app.route("/customer", methods=['GET','POST'])
def customer():

	#pulls from RForm function to display form with just username/password
    form=RForm(request.form)

#     #idk why this is there- was just on website
    print form.errors
    if request.method == 'POST':

#     	#pulls data from RForm-uname/pword are in str form
        uname =request.form['uname']
        pword =request.form['pword']

        if form.validate():

        	#connects to userT table in dynamo db
            dynamodb=boto3.resource('dynamodb')
            table=dynamodb.Table('userT')
  

            try: 
            #tries to get username from db- if uname exists it returns a super jumbled up 
            #dictionary 
                response = table.get_item( Key={'uname': uname} )
                flash(response)
                item = response['Item']
            #aDicstr is a string representing a dictionary of db values 
                aDicstr= json.dumps(item, indent=4, cls=DecimalEncoder)    

            # this is supposed to flash system error if uname not in database but 
            # isn't doing it 
            except SystemError: 
                flash("invalid username!")
                #return render_template('customer.html', form=form)

        #ast.literal_eval turns the string into correct dictionary format 
		aDic= ast.literal_eval(aDicstr)
		a=aDic["pword"]
		b=aDic["utype"]
		#checks if entered password and password in db are the same- also utype 
		#should be customer if they are trying to login to the customer portal
		if a==pword and b=="customer":
			flash("Successful login!")



    return render_template('customer.html', form=form)