import MySQLdb

db = MySQLdb.connect(
    host="localhost",
    user="dbuser",
    passwd="123",
    db="first_db"
)

c=db.cursor()
c.execute("INSERT INTO eSports (name, dicription) VALUES (%s, %s);", ('Heroic', 'Description'))

c.execute("Select * FROM `eSports`")
rows = c.fetchall()
for row in rows:
    print (row)

c.execute ("Update `eSports` Set dicription = 'CS:GO ESL Pro League' where name = 'Heroic' ")
c.execute("Select * FROM `eSports`")
rows = c.fetchall()
for row in rows:
    print (row)

c.execute ("Delete From `eSports` where name = 'Heroic' ")
c.execute("Select * FROM `eSports`")
rows = c.fetchall()
for row in rows:
    print (row)




db.commit()
c.close()
db.close()