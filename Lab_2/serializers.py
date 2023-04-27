from Lab_2.models import Teams, Stavki, Users
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import datetime


class TeamsSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Teams
        # Поля, которые мы сериализуем
        fields = ["id", "name", "cap", "country_id", "organization_id", "award_id", "count", "esports_id", "dicription"]


class StavkiSerializer(serializers.ModelSerializer):
    # user_id = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # Users = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # time_Payment = serializers.HiddenField(default=date.today())
    # time_Payment = serializers.HiddenField(default=datetime.datetime.today().strftime('%Y-%m-%dT%H:%M:%S.770Z'))

    class Meta:
        # Модель, которую мы сериализуем
        model = Stavki
        # Поля, которые мы сериализуем
        # fields = ["id", "user_id", "summ", "time", "koeff", "match_id", "Status"]
        fields = "__all__"

    def update(self, instance, validated_data):

        print ("Instance:      ", "type:   ", type(instance), instance)
        print ("Validated_Data:      ", "type:   ", type(validated_data), validated_data)

        # print (instance.user_id, instance.summ, instance.time)
        # instance.user_id = validated_data['user_id']
        # instance.summ = validated_data['summ']
        # instance.time = validated_data['time']
        # instance.koeff = validated_data['koeff']
        # instance.match_id = validated_data['match_id']
        # instance.Status = validated_data['Status']
        # instance.time_Payment = validated_data['time_Payment']
        # instance.time_calculated = validated_data['time_calculated']

        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.summ = validated_data.get('summ', instance.summ)
        instance.time = validated_data.get('time', instance.time)
        instance.koeff = validated_data.get('koeff', instance.koeff)
        instance.match_id = validated_data.get('match_id', instance.match_id)
        instance.Status = validated_data.get('Status', instance.Status)
        instance.time_Payment = validated_data.get('time_Payment', instance.time_Payment)
        instance.time_calculated = validated_data.get('time_calculated', instance.time_calculated)

        instance.save()
        return instance




# class UsersSerializer(serializers.ModelSerializer):
#     class Meta:
#         # Модель, которую мы сериализуем
#         model = Users
#         # Поля, которые мы сериализуем
#         fields = ["id", "Login", "Password", "mail", "status"]

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(max_length=128, write_only=True)
    # Ignore these fields if they are included in the request.
    id = serializers.IntegerField(read_only=True)
    email = serializers.EmailField(read_only=True)
    is_worker = serializers.BooleanField(read_only=True)
    is_staff = serializers.BooleanField(read_only=True)
    is_superuser = serializers.BooleanField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    birth_date = serializers.DateField(read_only=True)
    sex = serializers.CharField(read_only=True)
    def validate(self, data) -> User:
        username = data.get('username', None)
        password = data.get('password', None)
        if username is None:
            raise serializers.ValidationError(
                'A username address is required to log in.'
            )
        if password is None:
            raise serializers.ValidationError(
                'A password is required to log in.'
            )
        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError(
                'A user with this username and password was not found.'
            )
        return user

