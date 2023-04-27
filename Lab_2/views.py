from datetime import date
import datetime
# Create your views here.


from rest_framework import viewsets, generics, filters, status, mixins
from rest_framework.decorators import action, api_view
from rest_framework.views import APIView, Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.tokens import RefreshToken


from Lab_2.models import Esports
from Lab_2.serializers import TeamsSerializer, StavkiSerializer, UsersSerializer, LoginSerializer
from Lab_2.models import Teams, Stavki, Users
from Lab_2.permissions import IsAdminOrReadOnlyOwner, IsAdminOrReadOnly, IsAdminOrManager


from django.conf import settings
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.models import User


# import django_filters
import uuid
import redis



# Connect to our Redis instance
session_storage = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT)

# https://developer.mozilla.org/ru/docs/Learn/Server-side/Django/Authentication
# Важное по авторизации

# def auth_view(request):
#     username = request.POST["username"]  # допустим передали username и password
#     password = request.POST["password"]
#     user = authenticate(request, username=username, password=password)
#     if user is not None:
#         random_key = uuid.uuid4()
#         session_storage.set(random_key, username)
#
#         response = HttpResponse("{'status': 'ok'}")
#         response.set_cookie("session_id", random_key)  # пусть ключем для куки будет session_id
#         return response
#     else:
#         return HttpResponse("{'status': 'error', 'error': 'login failed'}")


@api_view(['POST'])
def getJson(request):
    if request.data['password'] == "":
        return HttpResponse("{'status': 'error', 'error': 'password incorrect'}")
    user = User.objects.create_user(request.data['username'], request.data['email'], request.data['password'])
    user.save()
    refresh = RefreshToken.for_user(user)
    return HttpResponse(
        '{"refresh": "' + str(refresh) + '", "access": "' + str(refresh.access_token) + '"}')
@api_view()

# class GetUserAPIView(APIView):
#     authentication_classes = [SessionAuthentication, BasicAuthentication]
#     permission_classes = [IsAuthenticated]
#     queryset = Users.objects.all()
#     serializer_class = UsersSerializer
#     def Post (self, request):
#         if request.data['access'] == "":
#             return HttpResponse("{'status': 'error', 'error': 'You are not authicate'}")
#         username = session_storage.get(request.data['access'])
#         user = User.objects.filter(username)
#         return HttpResponse('{"User_id": "' + str(user) + '"}')




# class ExampleView(APIView):
#     authentication_classes = [SessionAuthentication, BasicAuthentication]
#     permission_classes = [IsAuthenticated]
#
#     def get(self, request, format=None):
#         content = {
#             'user': str(request.user),  # `django.contrib.auth.User` instance.
#             'auth': str(request.auth),  # None
#         }
#         return Response(content)




def EsportsList(request):
    return render(request, 'eSports.html', {'data' : {
        'current_date': date.today(),
        'Esports': Esports.objects.all()
    }})

def GetEsports(request, id):
    return render(request, 'Esports.html', {'data' : {
        'current_date': date.today(),
        'Esport': Esports.objects.filter(id=id)[0]
    }})

def GetOrders(request):
    return render(request, 'orders.html', {'data' : {
        'current_date': date.today(),
        'orders': [
            {'title': 'CS:GO 1.6', 'id': 1},
            {'title': 'Dota 2', 'id': 2},
            {'title': 'Valorant', 'id': 3},
        ]
    }})


# def GetOrder(request, id):
#         return render(request, 'order.html', {'data' : {
#         'current_date': date.today(),
#         'id': id
#     }})

def GetOrder(request, id):
    if (id == 1):
        return render(request, 'order1.html', {'data' : {
        'current_date': date.today(),
        'id': id
    }})
    elif (id == 2):
         return render(request, 'order2.html', {'data': {
        'current_date': date.today(),
        'id': id
    }})
    else: return render(request, 'order3.html', {'data' : {
        'current_date': date.today(),
        'id': id
    }})


class TeamsViewSet(generics.ListCreateAPIView):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    permission_classes = (IsAdminOrReadOnly,)

    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Teams.objects.all()
    serializer_class = TeamsSerializer  # Сериализатор для модели


# class StavkiView (APIView):
#     def post (self, request):
#         serializer = StavkiSerializer(data = request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)

# class StavkiViewAdd (APIView):
#     permission_classes = (IsAuthenticated,)
#     def post (self, request, format = None):
#         serializer = StavkiSerializer(data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status = status.HTTP_201_CREATED)
#         return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)



class StavkiViewAdd (mixins.CreateModelMixin, GenericViewSet):
    queryset = Stavki.objects.all()
    # permission_classes = (IsAuthenticated,)
    serializer_class = StavkiSerializer

    def create (self, request, format = None):
        session_id = self.request.COOKIES.get('session_id')
        print(session_id)
        if session_id is not None:
            username = session_storage.get(session_id)
            if username is not None:
                s = username.decode('UTF-8')
                print(s)
                user = User.objects.filter(username=s)
                print ("То что нашло в Redis: ", user[0].id, "  То что передается в запросе: ",request.data["user_id"])

                if int(user[0].id) == int(request.data["user_id"]):
                    print (request.data)
                    serializer = StavkiSerializer(data = request.data)
                    print(serializer)
                    if serializer.is_valid():
                        print ("Ошибка возникла тут?")
                        serializer.save()
                        return Response(serializer.data, status = status.HTTP_201_CREATED)
                    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
                return Response({"status": "You can not create rates for others!"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({"status": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)


        # print("test")
        # text = request.data.get ("text")
        # print(text)
        # return Response('test', status = status.HTTP_201_CREATED)

class StavkiALL (mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):

    search_fields = ['user_id']
    filter_backends = (filters.SearchFilter,)

    queryset = Stavki.objects.all()
    serializer_class = StavkiSerializer


    # def get_queryset(self):
    #     pk = self.kwargs.get("pk")
    #     session_id = self.request.COOKIES.get('session_id')
    #     # print ("Почему вызывается Get? "+ str(session_id))
    #     # print ("А сюда выводит pk к которому идет обращение?: " + pk)
    #     if session_id is not None:
    #         username = session_storage.get(session_id)
    #         if username is not None:
    #             s = username.decode('UTF-8')
    #             user = User.objects.filter(username=s)
    #             if user[0].is_staff is True:
    #                 return Stavki.objects.all()
    #             print("Подошли к проверке pk и пользователя")
    #             if user[0] is not None:
    #                 if pk is not None:
    #                     print ("Проверка pk и пользователя выполнилась")
    #                     body = self.request.data['Status']
    #                     print (str (body))
    #                     stavka = Stavki.objects.filter(id = pk)
    #                     print ("Здесь еще выполняется?")
    #                     if ((stavka[0].Status == 1) and (body == 2)):
    #                         print ("Локализую ошибку")
    #
    #                         stavka[0].Status = 2
    #
    #                         print (stavka[0])
    #                         New_Stavka = {
    #                             'user_id': stavka[0].user_id,
    #                             'summ': stavka[0].summ,
    #                             'time': stavka[0].time,
    #                             'koeff': stavka[0].koeff,
    #                             'match_id': stavka[0].match_id,
    #                             'Status': stavka[0].Status,
    #                             'Users': stavka[0].Users
    #                         }
    #
    #                         serializer = StavkiSerializer(data=New_Stavka)
    #
    #                         print(serializer)
    #
    #                         if serializer.is_valid():
    #                             print("Сериализатор верный")
    #                             print(str(serializer.data))
    #
    #
    #                             serializer.save()
    #
    #                         print(str(serializer.data))
    #                         return Stavki.objects.filter(id = pk)
    #                     # serializer = StavkiSerializer(data = stavka)
    #                     # # return Stavki.objects.filter(user_id=user[0].id)
    #                     # if serializer.is_valid():
    #                     #     print ("Ошибка в проверке сериализатора")
    #                     #     serializer.save()
    #                     #     return Response(serializer.data, status=status.HTTP_201_CREATED)
    #                     # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #                 return Stavki.objects.filter(user_id=user[0].id)
    #                 # return Response({"status": "You are not allowed to change the status of a bid like this"}, status=status.HTTP_401_UNAUTHORIZED)
    #                 # return Stavki.objects.filter(pk=pk)
    #             # print("Проверка не прошла")
    #             # return Response({"status": "You are not Staff!"}, status=status.HTTP_401_UNAUTHORIZED)
    #     # return Response({"status": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
    #     return Stavki.objects.none()

    def get_queryset(self):
        pk = self.kwargs.get("pk")
        session_id = self.request.COOKIES.get('session_id')
        if session_id is not None:
            username = session_storage.get(session_id)
            if username is not None:
                s = username.decode('UTF-8')
                user = User.objects.filter(username=s)
                if user[0].is_staff is True:
                    if pk is not None:
                        body = self.request.data
                        print (body)
                        serializer = StavkiSerializer(data=body)
                        if serializer.is_valid():
                            serializer.save()
                        return Stavki.objects.filter(id=pk)
                    return Stavki.objects.all()
                if user[0] is not None:
                    if pk is not None:
                        body = self.request.data['Status']
                        print(self.request.data)
                        stavka = Stavki.objects.filter(id=pk)
                        if ((stavka[0].Status == 1) and (body == 2)):
                            # stavka[0].Status = 2
                            # New_Stavka = {
                            #     'user_id': stavka[0].user_id,
                            #     'summ': stavka[0].summ,
                            #     'time': stavka[0].time,
                            #     'koeff': stavka[0].koeff,
                            #     'match_id': stavka[0].match_id,
                            #     'Status': stavka[0].Status,
                            #     'time_Paymnet': date.today(),
                            #     'Users': stavka[0].Users
                            # }
                            # print (New_Stavka)

                            #
                            # New_Stavka = {
                            #     # 'Status': 2,
                            #     # 'time_Payment': datetime.datetime.today().strftime('%Y-%m-%d %H:%M:%S')
                            #     'time_Payment': datetime.datetime.today().strftime('%Y-%m-%dT%H:%M:%S.770Z')
                            # }
                            # print(New_Stavka['time_Payment'])

                            serializer = StavkiSerializer(data=body)

                            # print (serializer)
                            if serializer.is_valid():
                                serializer.save()
                            return Stavki.objects.filter(id=pk)
                        return Stavki.objects.none()
                    return Stavki.objects.filter(user_id=user[0].id)
        return Stavki.objects.none()



    def create (self, request, format = None):
        session_id = self.request.COOKIES.get('session_id')
        print(session_id)
        if session_id is not None:
            username = session_storage.get(session_id)
            if username is not None:
                s = username.decode('UTF-8')
                user = User.objects.filter(username=s)
                if user[0].is_staff is True:
                    serializer = StavkiSerializer(data = request.data)
                    print (serializer)
                    print (request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data, status = status.HTTP_201_CREATED)
                    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
                if user[0].id == request.data["user_id"]:
                    print (request.data)
                    serializer = StavkiSerializer(data = request.data)
                    print(serializer)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data, status = status.HTTP_201_CREATED)
                    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
                return Response({"status": "You can not create rates for others!"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({"status": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)


    # def delete (self, request, format = None):
    #     session_id = self.request.COOKIES.get('session_id')
    #     print(session_id)
    #     if session_id is not None:
    #         username = session_storage.get(session_id)
    #         if username is not None:
    #             s = username.decode('UTF-8')
    #             user = User.objects.filter(username=s)
    #             if user[0].is_staff is True:
    #                 serializer = StavkiSerializer(data = request.data)
    #                 if serializer.is_valid():
    #                     serializer.delete()
    #                     return Response(serializer.data, status = status.HTTP_204_DELETED)
    #                 return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    #             return Response({"status": "You are not Staff!"}, status=status.HTTP_401_UNAUTHORIZED)
    #     return Response({"status": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    @action(['post'], detail = True)
    def delete(self, request, pk = None):
        try:
            instance = Stavki.objects.filter(pk = int(pk))
            instance.delete()
            return Response({'Deleted'})
        except:
            return Response({'Not Deleted'})


    @action(['post'], detail = True)
    def Patch(self, request, pk = None):
        print(pk)
        session_id = self.request.COOKIES.get('session_id')
        # print("Это тут ошибка? " + session_id)
        if session_id is not None:
            username = session_storage.get(session_id)
            if username is not None:
                s = username.decode('UTF-8')
                user = User.objects.filter(username=s)
                if user[0].is_staff is True:
                    print ("Request.data", request.data)
                    # serializer1 = StavkiSerializer(data=request.data)
                    instance = Stavki.objects.get(pk = int(pk))
                    serializer = StavkiSerializer(instance, data=request.data)
                    if serializer.is_valid():
                        print ("Да, он валиден: ", serializer)
                    # serializer2 = StavkiSerializer(data=request.data, partioal = True)
                    # print("Patch вообще вызывается? ", serializer1)
                    print (type (instance) , "  ", instance)
                    # if serializer1.is_valid():
                    #     instance.delete()
                    #     serializer1.save()
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data, status=status.HTTP_200_OK)
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                instance = Stavki.objects.get(pk=int(pk))
                serializer = StavkiSerializer(instance, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)


                return Response({"status": "You are not Staff!"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({"status": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)



    # @action(methods=['patch'], detail = True)    #http://127.0.0.1:8000/Teams/1/Poisk/
    # team = Teams.objects.get(pk=pk)


    # def patch (self, request, format = None):
    #     print ("А может уже в Patch?")
    #     pk = self.kwargs("pk")
    #     print (pk)
    #     session_id = self.request.COOKIES.get('session_id')
    #     print("Это тут ошибка? "+ session_id)
    #     if session_id is not None:
    #         username = session_storage.get(session_id)
    #         if username is not None:
    #             s = username.decode('UTF-8')
    #             user = User.objects.filter(username=s)
    #             if user[0].is_staff is True:
    #                 serializer = StavkiSerializer(data = request.data)
    #                 print("Patch вообще вызывается? ", serializer)
    #                 if serializer.is_valid():
    #                     serializer.save()
    #                     return Response(serializer.data, status = status.HTTP_200_OK)
    #                 return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    #             return Response({"status": "You are not Staff!"}, status=status.HTTP_401_UNAUTHORIZED)
    #     return Response({"status": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        # return Stavki.objects.none()


    # def patch (self, request, pk=None):
    #     stavka = Stavki.objects.get(pk=pk)
    #     print (pk)
    #     return Response({'summ': stavka.summ})



    # def patch (self, request, format = None):
    #     session_id = self.request.COOKIES.get('session_id')
    #     print(session_id)
    #     if session_id is not None:
    #         username = session_storage.get(session_id)
    #         if username is not None:
    #             s = username.decode('UTF-8')
    #             user = User.objects.filter(username=s)
    #             if user[0].is_staff is True:
    #                 serializer = StavkiSerializer(data = request.data)
    #                 if serializer.is_valid():
    #                     serializer.save()
    #                     return Response(serializer.data, status = status.HTTP_200_OK)
    #                 return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    #             return Response({"status": "You are not Staff! "}, status=status.HTTP_401_UNAUTHORIZED)
    #     return Response({"status": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)


    def put (self, request, format = None):
        session_id = self.request.COOKIES.get('session_id')
        print(session_id)
        if session_id is not None:
            username = session_storage.get(session_id)
            if username is not None:
                s = username.decode('UTF-8')
                user = User.objects.filter(username=s)
                if user[0].is_staff is True:
                    serializer = StavkiSerializer(data = request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data, status = status.HTTP_201_CREATED)
                    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        return Response({"status": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)


    # permission_classes = (IsAdminOrManager,)






class StavkiViewGet (generics.ListCreateAPIView):

    search_fields = ['=user_id']
    filter_backends = (filters.SearchFilter,)
    permission_classes = (IsAdminOrReadOnlyOwner,)

    queryset = Stavki.objects.all()
    serializer_class = StavkiSerializer  # Сериализатор для модели

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """

        session_id = self.request.COOKIES.get('session_id')
        print (session_id)
        if session_id is not None:
            username = session_storage.get(session_id)
            # print("Session_id: "+ session_id + "Username: "+username)
            print("Session_id: " + session_id)
            s = username.decode('UTF-8')
            print ("BytesToString S: " + s)
            user = User.objects.filter(username = s)
            # print ("USER: "+user)
            return Stavki.objects.filter(user_id=user[0].id)
        print("Cookie not Found :(")
        return Stavki.objects.none()


class RegisterView (APIView):
    def post (self, request, format = None):
        serializer = UsersSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

# class LoginView (generics.ListCreateAPIView):
#
#     search_fields = ['login']
#     filter_backends = (filters.SearchFilter,)
#
#     queryset = Users.objects.all()
#     serializer_class = UsersSerializer  # Сериализатор для модели


class TeamsViewSetALL (viewsets.ModelViewSet):

    #queryset = Teams.objects.all()      #Если queryset закомментирован, следует добавить в router вызывающий
                                         #это представление базовое имя basename. Так как в данном случае DJango
                                         #не определит его как Teams самостоятельно.
    permission_classes = (IsAdminUser,)
    serializer_class = TeamsSerializer

    def get_queryset(self):                     #http://127.0.0.1:8000/Teams/1/
        pk = self.kwargs.get("pk")
        #print(self.kwargs)

        if not pk:
            return Teams.objects.all()[:3]
        try:
            return Teams.objects.filter(pk=pk)
        except Teams.DoesNotExist:
            return Response(TeamsSerializer.errors, status = status.HTTP_400_BAD_REQUEST)


    @action(methods=['get'], detail = True)    #http://127.0.0.1:8000/Teams/1/Poisk/
    def Poisk (self, request, pk=None):         #дополнительный роутинг
        team = Teams.objects.get(pk=pk)
        return Response({'name': team.name})


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')
    serializer_class = UsersSerializer  # Сериализатор для модели
    permission_classes = [IsAdminOrReadOnlyOwner]


    def get_queryset(self):
        session_id = self.request.COOKIES.get('session_id')
        print (session_id)
        if session_id is not None:
            username = session_storage.get(session_id)
            s = username.decode('UTF-8')
            user = User.objects.filter(username = s)
            return User.objects.filter(id=user[0].id)
        print("Cookie not Found :(")
        return User.objects.none()


class LogoutAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        session_id = request.COOKIES.get('session_id')
        print (str(session_id))
        if session_id:
            session_storage.delete(session_id)
            response = Response({"status": "logout"}, status=status.HTTP_200_OK)
            response.delete_cookie('session_id')
            return response

        return Response({"status": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)


class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer
    def post(self, request):
        username = request.data["username"]  # допустим передали username и password
        password = request.data["password"]
        print (username, password)
        user = authenticate(request, username=username, password=password)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        if user is not None:
            random_key = str(uuid.uuid4())
            session_storage.set(random_key, username)
            session_storage.expire(random_key, 1200)
            # response = HttpResponse("{'status': 'ok'}")
            refresh = RefreshToken.for_user(user)
            response = HttpResponse('{"refresh": "' + str(refresh) + '", "access": "' + str(refresh.access_token) + '"}')
            response.set_cookie(key = "session_id", value = random_key, domain = '127.0.0.1', path = '/', max_age = 1200, httponly=False, secure=True, samesite = 'None')  # пусть ключем для куки будет session_id
            # response.headers["Set-Cookie"] = random_key
            print (str(response.headers))
            return response
        else:
            return HttpResponse("{'status': 'error', 'error': 'login failed'}")




class GetUserAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UsersSerializer
    search_fields = ['username']
    queryset = User.objects.all()
    def post(self, request):
        # print (request.data)
        # session_id = request.data["session_id"]  # допустим передали username и password
        session_id = request.COOKIES.get('session_id')
        # session_id2 = request.COOKIES['session_id']
        for i in request.COOKIES: print('cookie: ' + i + '  ')

        print (str(session_id))

        if session_id is None:
            response = HttpResponse("{'status': 'error', 'error': 'User not found'}" + str(request.COOKIES.get('session_id')))
            print(response)
            return response
        # print (session_id)
        username = session_storage.get(session_id)
        # print (username)
        # print(type(username))
        s = username.decode('UTF-8')
        # print(s)
        user = User.objects.filter(username = s)
        # isStaff = str(user[0].is_staff)

        s = str(user[0].id)
        print(user[0].id)
        print (str(s))


        if user is not None:
            # response = HttpResponse(User[0])
            # response = HttpResponse('{ "id":'+s + ', "IsStaff":' +str(user[0].is_staff) + '}')
            # response = HttpResponse(thisUser)
            # response = HttpResponse('[{ "id":' +s+ ', "IsStaff":' +str(user[0].is_staff) + '}]')
            response = HttpResponse('{"id": "' + s + '", "IsStaff": "' + str(user[0].is_staff) + '"}')
            print(response)
            # response.set_cookie("username", user.email)
            # print (User.objects.all()[:3])
            # print (User.objects.filter(pk = 1))
            return response
            # return HttpResponse(User.username)
        else:
            return HttpResponse("{'status': 'error', 'error': 'User not found'}")

# class GoodsSearchViewSet(generics.ListCreateAPIView):
#     search_fields = ['name_good']
#     ordering_fields = ['price']
#     filter_backends = (filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter, )
#     filterset_class = GoodsFilter
#     queryset = Goods.objects.all()
#     name = 'Medicine'
#     serializer_class = GoodsSerializer