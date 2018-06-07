# config.py
import os

# Title of the site
SITE_TITLE = 'Daikin Internship Website lol'
# The URL for static files/images
STATIC_URL = 'https://s3-us-west-2.amazonaws.com/flasklambdalab-static/'

FAV_ICON= 'https://www.bottomline.com/application/files/1414/7258/1857/logo_-_daikin-applied-americas.png'

# Pages to show on the nav menu (provide a url or route)
PAGES=[
    #{'title':'Lab Blog',
    #    'url':'https://www.cloudshiftstrategies.com/flasklambdalab.html'},
    {'title':'Form', 'route':'form'},
    # {'title':'Login', 'route':'login'},
    {'title':'Customer Portal','route':'customer'},
    #{'title':'Load Gen','route':'loadgen'},
    # {'title':'Gallery','route':'gallery'},
    #{'title':'Upload','route':'upload'},
    ]

# Bootstrap CSS files to include in each page included in ./app/templates/base.html
CSS_INCLUDES=[
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cerulean/bootstrap.min.css',
    'https://cdn.datatables.net/1.10.15/css/dataTables.bootstrap.min.css', 
    ]

# Bootstrap JS files to include in each page included in ./app/templates/base.html
JS_INCLUDES=[
    'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
    'https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js',
    'https://cdn.datatables.net/1.10.15/js/dataTables.bootstrap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.1/jquery.form.min.js',
    ]
