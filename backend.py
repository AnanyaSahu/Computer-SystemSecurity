from database import databaseConnection


class getMovieShow:
  def __init__(self):
    pass
      # this method is used to get the list of movies from the selected theater
  def get_movies_by_theatre(self,theatreId):
    d = databaseConnection()
    cursor = d.openDbConnection()
    query = "" 
    record = cursor.execute(query).fetchall()
    r= [tuple(row) for row in record]
    return {'rows': r}


     
