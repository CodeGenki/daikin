from __future__ import print_function # Python 2/3 compatibility
import boto3
import json
import decimal

dynamodb = boto3.resource('dynamodb', region_name='us-west-2', endpoint_url="http://localhost:8000")

table = dynamodb.Table('Movies')

with open("employees.json") as json_file:
    employees = json.load(employees.json, parse_float = decimal.Decimal)
    for x in employees:
        table.put_item(x)