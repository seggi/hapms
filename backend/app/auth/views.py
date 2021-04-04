from flask import (request, session, jsonify)
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS 
from werkzeug.utils import secure_filename

# from PIL import Image

from flask_jwt_extended import (
    jwt_required, create_access_token, create_refresh_token, get_jwt_identity,

)

from . import auth 
from .. import db, jwt 
from ..models import NkRegisterDoctor 
from app.db import RegisterDoctor

CORS(auth, resources={r'/*': {'origins': '*'}})

REGISTER = NkRegisterDoctor()
GET_REGISTER = RegisterDoctor()

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

# @auth.route('/')
# def index():
#     return auth.send_static_file('index.html')

# # Register Doctor
# @auth.route('/login', methods=['GET', 'POST'])
# def login():
#     if not request.is_json:
#         return jsonify(msg="Missing JSON in request"), 400
    
#     # The user will login with username
#     username = request.json.get('username', None)
#     password = request.json.get("password", None)

#     if username != None and password != None:
#         user = NkRegisterDoctor.query.filter_by(email=username).first()

#         if not user or not check_password_hash(user.passwordhash, password):
#             return jsonify(error="Please check your login details and try again."), 400

#         else:
#             # Get admin user
#             # if user:
#             access = {
#                 'accessToken': create_access_token(
#                     identity = [{
#                         'id': user.id, 'username': user.username
#                     }]
#                 ),

#                 'refreshToken': create_refresh_token(
#                     identity=[
#                         {
#                             'id': user.id, 'username': username
#                         }
#                     ]
#                 )
#             }
#             return jsonify(accessToken=access)

#     return jsonify(error="You are not login")

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if not request.is_json:
        return jsonify(msg="Missing JSON in request"), 400

    # The user will login with just username

    username = request.json.get('username', None)
    password = request.json.get("password", None)

    if username != None and password != None:
        user = NkRegisterDoctor.query.filter_by(username=username).first()
        if not user or not check_password_hash(user.passwordhash, password):
            return jsonify(error="Please check your login details and try again."), 400

        else:
            # Get admin user
            # if user.is_admin == True:
            access = {
                'accessToken': create_access_token(
                    identity=[{'id': user.id, 'username': username }]),
                'refreshToken': create_refresh_token(
                    identity=[{'id': user.id, 'username': user.username }])
            }
            return jsonify(access), 200
            # # Get public users 
            # elif user.is_public == True:
            #     getempuser = EXTEND_REG.retrieveUserEmpBusiness(user.id)['businesscategory']       
            #     access = {
            #         'accessToken': create_access_token(
            #             identity=[{'id': user.id, 'username': username, 
            #                     'company': getempuser, 'authpub': user.is_public }]),
            #         'refreshToken': create_refresh_token(
            #             identity=[{'id': user.id, 'username': user.username, 
            #                     'company': getempuser, 'authpub': user.is_public }])
            #     }
            #     return jsonify(access), 200

    return jsonify(message="You are not login")


# GET new token after expiration

@auth.route("/api/refresh", methods=['GET', 'POST'])
@jwt_required
def refresh():
    current_user = get_jwt_identity()
    access = {'accessToken': create_access_token(indentity=current_user)}
    return jsonify(access), 200


# Sign up 
@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    if not request.is_json:
        return jsonify(msg="Missing JSON in request"), 400
    
    fullname = request.json.get("fullname", None)
    hospital = request.json.get("hospital", None)
    contacte = request.json.get("contacte", None)
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    reppassword = request.json.get("reppassword", None)
    # picture = request.json.get("file", None)
    function = request.json.get("function", None)

    if fullname != None and hospital != None and contacte != None and\
         username != None and password != None and reppassword != None and\
             function != None:

        register = NkRegisterDoctor.query.filter_by(email=contacte).first()

        if register:
            return jsonify(error="Email address already exist!")

        elif reppassword == password:
            try:
                GET_REGISTER.register(
                    fullname = fullname,
                    hospital = hospital,
                    contacte = contacte,
                    username = username,
                    function= function,
                    password =  generate_password_hash(password, method="sha256")
                )
                return jsonify(message="Successfuly register!"), 200
            except RecursionError:
                return jsonify(error="Error from server!."), 400
        else:
            return jsonify(error="Password did not match."), 400
    return jsonify(error="Please fill all field")

