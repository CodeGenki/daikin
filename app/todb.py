def dbimport(uesrname,given_name,family_name,email,phone_number,address):	
	from __future__ import print_function
	import boto3
	dynamodb = boto3.resource('dynamodb')
	table = dynamodb.Table('Customer_information')	
	response = table.put_item(
	   	Item={
                "username": username,
                "given_name": given_name,
                "family_name": family_name,
                "email": email,
                "phone_number": phone_number,
                "address": address
        }
	)