from datetime import datetime, date 

from app.conn import mysqlconn
from app.nkquery import NkSelet

# Registration 

now = datetime.now()
strnow = now.strftime('%Y-%m-%d %H:%M:%S')

class RegisterDoctor(NkSelet):
    def __init__(self, cursor=mysqlconn.cursor()):
        super().__init__(cursor, conn=mysqlconn)

    def register(self, fullname=None, hospital=None, contacte=None, username=None, password=None,
                    function= None):
        self.insertData(
            f'''
            INSERT INTO nk_register_doctor (fullname, hospital,email, username, passwordhash, created_date, function) 
                VALUES("{fullname}", "{hospital}", "{contacte}", "{username}", "{password}", "{strnow}", "{function}")
            ''')

    def saveClientRequest(self, fullname=None, contacte=None, doctorid=None, pickeddate=None, description=None):
        pass 

    def selectDotorList(self):
        return self.selectAll(f'''SELECT fullname, id  FROM nk_register_doctor''')

    def saveRequestAppointment(self, selectdoctor, contacte , fullname, picked_date, picked_time, description ):
        self.insertData(
            f'''
                INSERT INTO nk_received_request(fullname, contacte, appointment_date, appointment_time, doctor, sent_date, description, onhold)
                VALUES("{fullname}", "{contacte}" , "{picked_date}", "{picked_time}", {selectdoctor}, "{strnow}", "{description}", {0})
            ''')

    def collectPatient(self, adminid):
        return self.selectAll(f''' 
            SELECT COUNT(id) as pnumber, 
            (SELECT COUNT(onhold) FROM nk_received_request WHERE doctor={adminid} AND onhold={0}) as apnumber 
            FROM nk_received_request WHERE doctor={adminid}''')
    
    def collectTableData(self, adminid):
        return self.selectAll(
            f'''SELECT id, fullname, appointment_date, appointment_time, sent_date,
            contacte, description, onhold FROM nk_received_request WHERE doctor={adminid}''')

    def confirmedRequest(self, adminid, confirmrequest, confirmv):
        if confirmv == 1:
            self.updateData(
                f''' UPDATE nk_received_request SET nk_received_request.onhold={confirmv}
                WHERE nk_received_request.doctor={adminid} AND nk_received_request.id={confirmrequest}''')
        elif confirmv == 0:
            self.updateData(
                f''' UPDATE nk_received_request SET nk_received_request.onhold={confirmv}
                WHERE nk_received_request.doctor={adminid} AND nk_received_request.id={confirmrequest}''')
    
    def respondedRequest(self, adminid):
        return self.selectAll(
            f'''SELECT id, fullname, appointment_date, appointment_time, sent_date,
            contacte, description, onhold FROM nk_received_request WHERE doctor={adminid} AND onhold={1}''')

    def retrieveDoctor(self):
        return self.selectAll(
            f''' SELECT * FROM nk_register_doctor'''
        )

    def feedBack(self, contacte, pickedDate):
        return self.selectAll(
            f'''
                SELECT onhold, appointment_date as date FROM nk_received_request 
                WHERE contacte="{contacte}" AND appointment_date="{pickedDate}"
            '''
        )
