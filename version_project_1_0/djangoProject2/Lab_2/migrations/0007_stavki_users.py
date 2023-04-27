# Generated by Django 4.1.1 on 2022-12-25 20:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Lab_2', '0006_alter_stavki_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='stavki',
            name='Users',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь'),
        ),
    ]
