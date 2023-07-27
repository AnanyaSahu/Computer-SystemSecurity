import json
from database import databaseConnection


class backend:
  def __init__(self):
    pass


      # this method will get the message
  def getMessagesForUser(self,userId):
    list = []
    d = databaseConnection()
    cursor = d.openDbConnection()
    query = "select notificationId,messageText,senderId from [dbo].[notifications] where [isOpened] = 0 and [recieverId] = '"+str(userId)+"';" 
    record = cursor.execute(query).fetchall()
    r= [tuple(row) for row in record]
    return {'rows': r}
  

        # this method will create the message
  def createMessageForUser(self,message, recieverId, senderId):
    d = databaseConnection()
    cursor = d.openDbConnection()
    query = "insert into [dbo].[notifications]  values (?,?,?,?)" 
    print(message, recieverId, senderId)
    c= cursor.execute(query, str( senderId),  str(recieverId), str(message) , 0)
    c.commit()
    return {'msg': 'msg sent'}

 # this method will delete the opned message
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
    query = "select * from  [dbo].[userDetails];" 
    record = cursor.execute(query).fetchall()
    # print('all records')
    # print(record)
    query = "select [email],[pubKey] from [dbo].[userDetails] where [email] = '"+str(userId)+"';" 
    # print(query)
    # print(' records for user id')
    record = cursor.execute(query).fetchall()
    print(record)
    r= [tuple(row) for row in record]
    # for tup in r:
    #   newTuple = (tup[0], self.fernetObj.decrypt(tup[1]), tup[2])
    #   list.append(newTuple)
    
    return {'rows': r}
  
  def clearPublicKey (self, emailId):
    d = databaseConnection()
    cursor = d.openDbConnection()
    query = "update [dbo].[userDetails] set [pubKey] = '' where [email]= '"+str(emailId)+"';" 
    c = cursor.execute(query)
    c.commit()
    query = "    DELETE FROM [dbo].[notifications] WHERE [recieverId] = '"+str(emailId)+"';" 
    c = cursor.execute(query)
    c.commit()
    return {'msgs': 'Logged out successfully'}
  

  def setPublicKey (self, emailId, publicKey):
    d = databaseConnection()
    cursor = d.openDbConnection()
    # e, kty, n
    pubKEtTransformed = publicKey["e"]+ "|" + publicKey["kty"] + "|" + publicKey["n"]
    query = "update [dbo].[userDetails] set [pubKey] = '"+str(pubKEtTransformed)+"' where [email]= '"+str(emailId)+"';"
    # print(query) 
    c = cursor.execute(query)
    c.commit()
    return {'msgs': 'Logged in successfully, key saved'}
  

  def createUser(self, email):
    d = databaseConnection()
    cursor = d.openDbConnection()
    query = "select * from  [dbo].[userDetails] where [email] = '"+ email+ "';"
    record = cursor.execute(query).fetchall() 
    if(len(record) == 0):
      query = "INSERT INTO [dbo].[userDetails] ([email],[pubKey]) VALUES ('" + email +"','');" 
      c = cursor.execute(query)
      c.commit()
      print('new user created')
    print('user present in db')
    

    return {'msgs': 'Logged in successfully, key generated'}