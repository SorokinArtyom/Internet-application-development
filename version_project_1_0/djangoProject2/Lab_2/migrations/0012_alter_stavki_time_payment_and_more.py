# Generated by Django 4.1.1 on 2023-01-15 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Lab_2', '0011_stavki_time_payment_stavki_time_calculated'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stavki',
            name='time_Payment',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='stavki',
            name='time_calculated',
            field=models.DateTimeField(null=True),
        ),
    ]
