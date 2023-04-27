from django.db import models
from django.contrib.auth.models import User

from rest_framework import filters
from django_filters import FilterSet, AllValuesFilter
from django_filters import DateTimeFilter, NumberFilter
# from django.contrib.auth.models import AbstractUser


# Create your models here.
class Esports(models.Model):
    name = models.CharField(max_length=30)
    dicription = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'esports'


class Stavki(models.Model):
    user_id = models.IntegerField(db_column='User_id')  # Field name made lowercase.
    summ = models.IntegerField(db_column='Summ')  # Field name made lowercase.
    time = models.DateTimeField()
    koeff = models.FloatField()
    match_id = models.IntegerField(db_column='Match__id')  # Field name made lowercase. Field renamed because it contained more than one '_' in a row.
    Users = models.ForeignKey(User, verbose_name='Пользователь', on_delete=models.CASCADE, default = 1)
    Status = models.IntegerField()
    time_Payment = models.DateTimeField(null=True)
    time_calculated = models.DateTimeField(null=True)

    class Meta:
        managed = True
        db_table = 'stavki'


# class Stavki_New(models.Model):
#     user_id = models.IntegerField(db_column='User_id')  # Field name made lowercase.
#     summ = models.IntegerField(db_column='Summ')  # Field name made lowercase.
#     time = models.DateTimeField()
#     koeff = models.FloatField()
#     match_id = models.IntegerField(db_column='Match__id')  # Field name made lowercase. Field renamed because it contained more than one '_' in a row.
#     Users = models.ForeignKey(User, verbose_name='Пользователь', on_delete=models.CASCADE, default=1)
#
#     class Meta:
#         managed = False
#         db_table = 'stavki'






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


class Users(models.Model):
    login = models.CharField(db_column='Login', unique=True, max_length=50)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=50)  # Field name made lowercase.
    mail = models.CharField(unique=True, max_length=100)
    status = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'users'



# class GoodsFilter(FilterSet):
#     min_price = NumberFilter(field_name='price', lookup_expr='gte')
#     max_price = NumberFilter(field_name='price', lookup_expr='lte')
#
#         class Meta:
#         model = Goods
#         fields = [
#         'min_price',
#         'max_price'
#         ]
