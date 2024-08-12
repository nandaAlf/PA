from rest_framework.pagination import LimitOffsetPagination,PageNumberPagination 

# class PatientPagination(LimitOffsetPagination):
#     default_limit=10 #check

class PatientPagination(PageNumberPagination ):
    page_size=3 # sets the default number of items to display on each page
    page_query_param='p' # name of the query parameter ,example, a URL like /pacientes?p=3
    page_size_query_param='size' #override the default page_size by providing a different value in the URL
    max_page_size=10 #sets an upper limit 
    last_page_strings='end'