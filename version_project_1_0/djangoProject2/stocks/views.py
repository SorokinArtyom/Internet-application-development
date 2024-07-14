from django.shortcuts import render

# Create your views here.

from Lab_2.models import Esports
from datetime import date

from rest_framework import viewsets
from stocks.serializers import TeamsSerializer
from stocks.models import Teams

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


class TeamsViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Teams.objects.all().order_by('id')
    serializer_class = TeamsSerializer  # Сериализатор для модели