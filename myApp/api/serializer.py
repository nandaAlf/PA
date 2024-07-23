import datetime
from rest_framework import serializers

from myApp.models import TablePatient, TableStudy 


# def hc_validator(value):
#     if len(value)!=11:
#         raise serializers.ValidationError("El numero de HC debe ser de 11 digitos")
    
def cid_validator(value):
    if len(value)!=11:
        raise serializers.ValidationError("El numero de CID debe ser de 11 digitos")
    if not value.isdigit():
        raise serializers.ValidationError("El CID debe estar compuesto por digitos")
    
    year = int(value[:2])
    month = int(value[2:4])
    day = int(value[4:6])
    rest= int(value[6:])
    
    if year > datetime.date.today().year:
        raise serializers.ValidationError("Anno incorrecto")
  # Valida el month
    if month < 1 or month > 12:
        raise serializers.ValidationError("Mes incorrecto")
    if month == 2 and day > 29:  # Febrero
        raise serializers.ValidationError("Febrero no")
    if month in [4, 6, 9, 11] and day == 31:  # monthes con 30 días
        raise serializers.ValidationError("mal los dias")
    
class StudySerializer(serializers.ModelSerializer):
    class Meta:
        model=TableStudy
        fields="__all__"
    

class PatientSerializer(serializers.ModelSerializer):
    # studiesList=StudySerializer(many=True, read_only=True) #Toda la data de los estudios de un paciente
    # studiesList=serializers.StringRelatedField(many=True,read_only=True)
    # studiesList=serializers.HyperlinkedRelatedField(many=True,read_only=True,view_name='study-code',lookup_field='code')
    
    class Meta:
        model=TablePatient
        fields="__all__"
        


# class PatientSerializer(serializers.Serializer):
    
    # hc=serializers.CharField()
    # cid=serializers.CharField(validators=[cid_validator])
    # full_name=serializers.CharField()
    # age_month=serializers.IntegerField() 
    # age_year=serializers.IntegerField()
    # sex=serializers.CharField()
    # race=serializers.CharField()
    
    # def create(self, validated_data):
    #     return TablePatient.objects.create(**validated_data)
    
    # def update(self,instance,validate_data):
    #      instance.hc=validate_data.get('hc',instance.hc)
    #      instance.cid=validate_data.get('cid',instance.cid)
    #      instance.full_name=validate_data.get('full_name',instance.full_name)
    #      instance.age_month=validate_data.get('age_month',instance.age_month)
    #      instance.age_year=validate_data.get('age_year',instance.age_year)
    #      instance.sex=validate_data.get('sex',instance.sex)
    #      instance.race=validate_data.get('race',instance.race)
    #      instance.save()
    #      return instance
        
    