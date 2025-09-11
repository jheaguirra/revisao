from django.urls import path
from .import views

urlpatterns = [
    path('categorias/', views.categorialist.as_view(), name='categoria-list'),
    path('categorias/<int:pk>/', views.categoriadetail.as_view(),   name='categoria-detail'),
    path('produtos/', views.produtolist.as_view(), name='produto-list'),
    path('produtos/<int:pk>/', views.produtodetail.as_view(), name='produto-detail'),    
    ]