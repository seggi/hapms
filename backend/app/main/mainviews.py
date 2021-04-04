from flask import (request, session, jsonify)
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS 
from flask_jwt_extended import jwt_required, get_jwt_identity


from . import main 
from .. db import RegisterDoctor
from ..models import NkReceivedRequest, NkReceivedRequest

CORS(main, resources={r'/*': {'origins': '*'}})

REG_DOCTOR = RegisterDoctor()
RECEIVEREQUEST = NkReceivedRequest()

@main.route("/api/select_doctors", methods=['GET', 'POST'])
def retrieveDoctors():
    getdoctorlist = REG_DOCTOR.selectDotorList()
    return jsonify(data=getdoctorlist)

@main.route('/api/request_appoinent', methods=['GET', 'POST'])
def requestAppointment():
    if not request.is_json:
        return jsonify(msg="Missing JSON in request"), 400
    
    selectdoctor = request.json.get('selectdoctor', None)
    contacte = request.json.get('contacte', None)
    fullname = request.json.get('fullname', None)
    picked_date = request.json.get('pickedDate', None)
    description = request.json.get('description', None)
    picked_time = request.json.get('pickedTime', None)

    if selectdoctor != None and contacte != None and fullname != None\
         and picked_date != None and description != None and picked_time != None:
        checkappointment = RECEIVEREQUEST.query.filter_by(
                doctor=selectdoctor,
                appointment_date=picked_date,
                appointment_time=picked_time
            ).first()
        if not checkappointment :
            REG_DOCTOR.saveRequestAppointment(selectdoctor, contacte, 
                        fullname, picked_date, picked_time, description)
            return jsonify(msg='Request sent sucessfuly')
        else:
            return jsonify(error='You already sent this appointment!')
    return jsonify(msg='Error from server!')



@main.route('/api/login_id' , methods=['GET', 'POST'])
@jwt_required
def getLoginUnsername():
    adminid = get_jwt_identity()[0]['username']
    return jsonify(data=adminid)

@main.route('/api/get_collection_data' , methods=['GET', 'POST'])
@jwt_required
def getCollectionData():
    adminid = get_jwt_identity()[0]['id']
    getcollectdata = REG_DOCTOR.collectPatient(adminid=adminid)
    getcollecttable = REG_DOCTOR.collectTableData(adminid=adminid)
    
    if len(getcollectdata) > 0 and len(getcollecttable) > 0:
        print(getcollecttable)
        return jsonify(data=getcollectdata, data1=getcollecttable)
   
    return jsonify(error="No data saved yet!")


@main.route('/api/confirm_request', methods=['GET', 'POST'])
@jwt_required
def confirmRequest():
    adminid = get_jwt_identity()[0]['id']

    if not request.is_json:
        return jsonify(msg="Missing JSON in request")

    confirmrequest = request.json.get('confirmrequest', None)
    confirmv = request.json.get('confirmv', None)

    if confirmrequest != None and confirmv != None:
        REG_DOCTOR.confirmedRequest(adminid, confirmrequest, confirmv)
        getcollectdata = REG_DOCTOR.collectPatient(adminid=adminid)
        getcollecttable = REG_DOCTOR.collectTableData(adminid=adminid)
        
        if len(getcollectdata) > 0 and len(getcollecttable) > 0:
            print(getcollecttable)
            return jsonify(data=getcollectdata, data1=getcollecttable)

    return jsonify('Error from server!')

@main.route('/api/responded_request', methods=['GET', 'POST'])
@jwt_required
def respondedRequest():
    adminid = get_jwt_identity()[0]['id']
    getcollecttable = REG_DOCTOR.respondedRequest(adminid=adminid)
    
    if len(getcollecttable) > 0:
        print(getcollecttable)
        return jsonify(data=getcollecttable)
   
    return jsonify(error="No data saved yet!")


@main.route('/api/retrieve_doctors', methods=['GET', 'POST'])
def retrieveDoctorList():
    getcollecttable = REG_DOCTOR.retrieveDoctor()
    
    if len(getcollecttable) > 0:
        print(getcollecttable)
        return jsonify(data=getcollecttable)
   
    return jsonify(error="No data saved yet!")

@main.route('/api/get_feed_back', methods=['GET', 'POST'])
def getFeedback():
    if not request.is_json:
        return jsonify(msg="Missing JSON in request")
    
    getpaitentcontacte = request.json.get("contacte")
    pickedDate = request.json.get("pickedDate")
  
    if getpaitentcontacte != None and pickedDate != None:
        getfeedback = REG_DOCTOR.feedBack(getpaitentcontacte, pickedDate)
        if len(getfeedback) > 0:
            return jsonify(data=getfeedback)
        else:
            jsonify(error="No data saved yet!")
    return jsonify(error="Empty field!")
