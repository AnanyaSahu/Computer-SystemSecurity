from database import databaseConnection

# import required module
from cryptography.fernet import Fernet
global fernetObj;

class backend:
  def __init__(self):
    # key generation
    key = "b'Nse-YkE5Y_Me_nTciyCd9Elr0F3nlyj0uhkRGcsegD8='"
    self.fernetObj = Fernet(key)


      # this method will get the message
  def getMessagesForUser(self,userId):
    list = []
    d = databaseConnection()
    cursor = d.openDbConnection()
    query = "select notificationId,messageText,senderId from [dbo].[notifications] where [isOpened] = 0 and [recieverId] = "+str(userId)+";" 
    record = cursor.execute(query).fetchall()
    r= [tuple(row) for row in record]
    for tup in r:
      newTuple = (tup[0], self.fernetObj.decrypt(tup[1]), tup[2])
      list.append(newTuple)
    
    return {'rows': list}
  

        # this method will create the message
  def createMessageForUser(self,userId, params):
    d = databaseConnection()
    cursor = d.openDbConnection()
    query = "insert into [dbo].[notifications]  values (?,?,?,?)" 
    encryptedMsg = self.fernetObj.encrypt(params['message'])
    c= cursor.execute(query, str( userId),  str(params['recieverId']), encryptedMsg , 1)
    record = c.fetchall()
    r= [tuple(row) for row in record]
    return {'rows': r}


        # this method will delete the opned message
  def deleteUserMessages(self,msgId):
    d = databaseConnection()
    cursor = d.openDbConnection()
    query = "update [dbo].[notifications] set [isOpened] = 1 where [notificationId]= "+str(msgId)+";" 
    record = cursor.execute(query).fetchall()
    r= [tuple(row) for row in record]
    return {'rows': r}
     
