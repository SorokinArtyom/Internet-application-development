from stocks.models import Teams
from rest_framework import serializers


class TeamsSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Teams
        # Поля, которые мы сериализуем
        fields = ["id", "name", "cap", "country_id", "organization_id", "award_id", "count", "esports_id", "dicription"]