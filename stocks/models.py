from django.db import models

# Create your models here.
class Esports(models.Model):
    name = models.CharField(max_length=30)
    dicription = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'esports'

class Teams(models.Model):
    name = models.CharField(max_length=30)
    cap = models.CharField(max_length=50)
    country_id = models.IntegerField()
    organization_id = models.IntegerField()
    award_id = models.IntegerField(blank=True, null=True)
    count = models.IntegerField()
    esports_id = models.IntegerField()
    dicription = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'teams'


class Organizations(models.Model):
    name = models.CharField(max_length=30)
    country_id = models.IntegerField()
    owner = models.CharField(max_length=50)
    dicription = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'organizations'



class Awards(models.Model):
    title = models.CharField(max_length=50)
    tournament = models.CharField(max_length=50)
    date = models.DateTimeField()
    dicription = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'awards'

