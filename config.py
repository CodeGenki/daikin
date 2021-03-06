# config.py
import os

#YOUR USERNAME HERE

username = "kristen"
url_name = "https://qvtsi28b2k.execute-api.us-east-1.amazonaws.com/kristen"


username = "jenny"
url_name = "https://7srr0yyhjg.execute-api.us-east-1.amazonaws.com/jenny"



# Title of the site
SITE_TITLE = 'Daikin Summer 2018 Intern Project'
# The URL for static files/images
STATIC_URL = 'https://s3-us-west-2.amazonaws.com/flasklambdalab-static/'

FAV_ICON= 'https://www.bottomline.com/application/files/1414/7258/1857/logo_-_daikin-applied-americas.png'

AC_PIC='https://www.simplythebestac.com/wp-content/uploads/2014/06/residential-category-ac-heatpump.png'

MASCOT='https://sdl-stickershop.line.naver.jp/products/0/0/1/1308041/LINEStorePC/main.png?__=20161019'


DOUG="http://www.daikin.com/careers/employees/images/index_employees_05.png"

ADWAY="data:image/jpeg;base64,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"

BACKGROUND="https://ideasphere.com/wp-content/uploads/2016/08/Savin-NY-Website-Background-Web-1-1024x576.jpg"

CONTRACTOR="https://image.flaticon.com/icons/png/512/149/149071.png"
PAGES=[
    {'title':'Login', 'route':'login'},
    {'title':'Customer', 'route':'customer'},
    {'title':'Vendor','route':'vendor'},
    {'title':'Jenny','route':'customer'}
    ]

# Bootstrap CSS files to include in each page included in ./app/templates/base.html
CSS_INCLUDES=[
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cerulean/bootstrap.min.css',
    'https://cdn.datatables.net/1.10.15/css/dataTables.bootstrap.min.css', 
    "static/w3.css",
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
    ]

# Bootstrap JS files to include in each page included in ./app/templates/base.html
JS_INCLUDES=[
    'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
    'https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js',
    'https://cdn.datatables.net/1.10.15/js/dataTables.bootstrap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.1/jquery.form.min.js',
    'https://s3.amazonaws.com/flasklambdalab-dev-thumbnails-a261bdec/aws-sdk-2.254.1.min.js',
    '/' + username + '/static/amazon-cognito-identity.min.js',
    '/' + username + '/static/aws-cognito-sdk.min.js',
    'https://sdk.amazonaws.com/js/aws-sdk-2.259.1.min.js' 
    ]
