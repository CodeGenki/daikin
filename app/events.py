import boto3, urllib
import json
from app import app

client = boto3.client('s3')
dynamo = boto3.resource('dynamodb')
table_name = 'users'

def s3_uploadTrigger(event, context):
    """
    Process a file upload.
    """
    bucket = event['Records'][0]['s3']['bucket']['name']
    json_file_name = event['Records'][0]['s3']['object']['key']
    json_object = client.get_object(Bucket=bucket,Key=json_file_name)
    jsonFileReader = json_object['Body'].read()
    jsonDict = json.loads(jsonFileReader)
    table = dynamo.Table('users')
    table.put_item(Item=jsonDict)
    return 'Hello from Lambda'