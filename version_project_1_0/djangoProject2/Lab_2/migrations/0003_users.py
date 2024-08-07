# Generated by Django 4.1.1 on 2022-12-22 08:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Lab_2', '0002_awards_organizations_stavki_teams'),
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('login', models.CharField(db_column='Login', max_length=50, unique=True)),
                ('password', models.CharField(db_column='Password', max_length=50)),
                ('mail', models.CharField(max_length=100, unique=True)),
                ('status', models.IntegerField()),
            ],
            options={
                'db_table': 'users',
                'managed': False,
            },
        ),
    ]
