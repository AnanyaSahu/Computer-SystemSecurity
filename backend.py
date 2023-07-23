from database import databaseConnection


class backend:
  def __init__(self):
    pass
      # this method will get the message
  def getMessagesForUser(self,userId):
    d = databaseConnection()
    cursor = d.openDbConnection()
    query = "select notificationId,messageText,senderId from [dbo].[notifications] where [isOpened] = 0 and [recieverId] = "+str(userId)+";" 
    record = cursor.execute(query).fetchall()
    r= [tuple(row) for row in record]
    return {'rows': r}
  

        # this method will create the message
  def createMessageForUser(self,userId, params):
    d = databaseConnection()
    cursor = d.openDbConnection()
    query = "insert into [dbo].[notifications]  values (?,?,?,?)" 
    c= cursor.execute(query, str( userId),  str(params['recieverId']), str(params['message']), 1)
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
     
