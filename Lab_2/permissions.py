from rest_framework import permissions

class IsAdminOrReadOnlyOwner (permissions.BasePermission):
    def has_object_permission (self, request, view, obj):
        if bool(request.user and request.user.is_staff):
            return True
        if request.method in permissions.SAFE_METHODS:
            return obj.user == request.user

    # def has_permission (self, request, view):
    #     return bool (request.user and request.user.is_staff)

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission (self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool (request.user and request.user.is_staff)

class IsAdminOrManager(permissions.BasePermission):
    def has_permission (self, request, view):
        # return bool (request.user and ((request.user.groups == 1) or (request.user.is_staff))  )
        return bool(request.user and request.user.is_staff)