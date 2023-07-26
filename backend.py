import json
from database import databaseConnection

# import required module
# from cryptography.fernet import Fernet
# global fernetObj;

class backend:
  def __init__(self):
    pass
    # key generation
    # key = "b'Nse-YkE5Y_Me_nTciyCd9Elr0F3nlyj0uhkRGcsegD8='"
    # self.fernetObj = Fernet(key)


      # this method will get the message
  def getMessagesForUser(self,userId):
    list = []
    d = databaseConnection()
    cursor = d.openDbConnection()
    query = "select notificationId,messageText,senderId from [dbo].[notifications] where [isOpened] = 0 and [recieverId] = "+str(userId)+";" 
    record = cursor.execute(query).fetchall()
    r= [tuple(row) for row in record]
    # for tup in r:
    #   newTuple = (tup[0], self.fernetObj.decrypt(tup[1]), tup[2])
    #   list.append(newTuple)
    
    return {'rows': r}
  

        # this method will create the message
  def createMessageForUser(self,message, recieverId, senderId):
    d = databaseConnection()
    cursor = d.openDbConnection()
    query = "insert into [dbo].[notifications]  values (?,?,?,?)" 
    # encryptedMsg = self.fernetObj.encrypt(params['message'])
    c= cursor.execute(query, str( senderId),  str(recieverId), message , 0)
    c.commit()
    # record = c.fetchall()
    # r= [tuple(row) for row in record]
    # return {'rows': r}
    return {'msg': 'msg sent'}

  #       # this method will delete the opned message
  # def getMessage(self,msgId):
  #   d = databaseConnection()
  #   cursor = d.openDbConnection()
  #   query = "select messageText from [dbo].[notifications]  where [notificationId]= "+str(msgId)+";" 
  #   record = cursor.execute(query).fetchall()
  #   r= [tuple(row) for row in record]
  #   return {'rows': r}

        # this method will delete the opned message
  def deleteUserMessages(self,msgId):
    d = databaseConnection()
    cursor = d.openDbConnection()
    query = "update [dbo].[notifications] set [isOpened] = 1 where [notificationId]= "+str(msgId)+";" 
    record = cursor.execute(query).fetchall()
    r= [tuple(row) for row in record]
    return {'rows': r}
     
      # this method will get the message
  def checkUserAvailabliity(self,userId):
    list = []
    d = databaseConnection()
    cursor = d.openDbConnection()
    query = "select [email],[pubKey] from [dbo].[userDetails] where [email] = "+str(userId)+";" 
    record = cursor.execute(query).fetchall()
    r= [tuple(row) for row in record]
    # for tup in r:
    #   newTuple = (tup[0], self.fernetObj.decrypt(tup[1]), tup[2])
    #   list.append(newTuple)
    
    return {'rows': r}
  
  def clearPublicKey (self, emailId):
    d = databaseConnection()
    cursor = d.openDbConnection()
    query = "update [dbo].[userDetails] set [pubKey] = '' where [email]= "+str(emailId)+";" 
    c = cursor.execute(query)
    c.commit()
    return {'msgs': 'Logged out successfully'}
  

  def setPublicKey (self, emailId, publicKey):
    # print(publicKey)
    d = databaseConnection()
    cursor = d.openDbConnection()
    # e, kty, n
    pubKEtTransformed = publicKey["e"]+ "|" + publicKey["kty"] + "|" + publicKey["n"]
    query = "update [dbo].[userDetails] set [pubKey] = '"+str(pubKEtTransformed)+"' where [email]= '"+str(emailId)+"';"
    print(query) 
    c = cursor.execute(query)
    c.commit()
    # query = "select * from  [dbo].[userDetails];" 
    # record = cursor.execute(query).fetchall()
    # print(record)
    return {'msgs': 'Logged in successfully, key saved'}
  

  def createUser(self, params):
    d = databaseConnection()
    cursor = d.openDbConnection()
    query = "select * from  [dbo].[userDetails];"
    record = cursor.execute(query).fetchall() 
    if(record.count == 0):
      query = "INSERT INTO [dbo].[userDetails] ([email],[pubKey]) VALUES ('" + params['emailId']+"','');" 
      c = cursor.execute(query)
      c.commit()
    

    return {'msgs': 'Logged in successfully, key generated'}