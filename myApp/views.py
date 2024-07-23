# from django.shortcuts import render
# from myApp.models import TablePatient
# from django.http import JsonResponse

# # Create your views here.
# def patient_list(request):
#     myPatients = TablePatient.objects.all()
#     data={
#         'myPatinets':list(myPatients.values())
#     }
#     return JsonResponse(data)

# def patient_cid(request,cid):
#     myPatient = TablePatient.objects.get(cid=cid)
#     data={
#         'hc':myPatient.hc,
#         'cid':myPatient.cid,
#         'name':myPatient.full_name,
#     }
#     return JsonResponse(data)