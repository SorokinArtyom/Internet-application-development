# Generated by Django 4.1.1 on 2023-01-15 11:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Lab_2', '0010_alter_stavki_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='stavki',
            name='time_Payment',
            field=models.DateTimeField(default='2006-10-25 14:30:59'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='stavki',
            name='time_calculated',
            field=models.DateTimeField(default='2023-01-15 15:00:00'),
            preserve_default=False,
        ),
    ]
