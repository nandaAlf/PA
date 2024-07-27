import datetime
from rest_framework import serializers

from myApp.models import *


def hc_validator(value):
    if len(value)!=6 or not value.isdigit():
        raise serializers.ValidationError("El numero de Historia Clinica(HC) debe ser de 6 digitos")
    else: return value

def date_validator(value):
    if value is None:return value
    if value > datetime.date.today():raise serializers.ValidationError("No es posible registrar una fecha superior a la actual")
    else: return value
    
def positive_number_validator(value,field):
    if value is None:return value
    if value <0:
        raise serializers.ValidationError(f"Se espera un numero positivo para {field}")
    else: return value
    
def list_validator(value,list):
    if value is None or value=="":return value
    if value not in list:raise serializers.ValidationError(f"Este valor no es aceptable , pruebe con {list}")
    else: return value

# def cid_validator(value):
    # if len(value)!=11:
    #     raise serializers.ValidationError("El numero de CID debe ser de 11 digitos")
    # if not value.isdigit():
    #     raise serializers.ValidationError("El CID debe estar compuesto por digitos")
    
    # year = int(value[:2])
    # month = int(value[2:4])
    # day = int(value[4:6])
    # rest= int(value[6:])
    
#     if year > datetime.date.today().year:
#         raise serializers.ValidationError("Anno incorrecto")
#   # Valida el month
#     if month < 1 or month > 12:
#         raise serializers.ValidationError("Mes incorrecto")
#     if month == 2 and day > 29:  # Febrero
#         raise serializers.ValidationError("Febrero no")
#     if month in [4, 6, 9, 11] and day == 31:  # monthes con 30 días
#         raise serializers.ValidationError("mal los dias")
    
class StudySerializer(serializers.ModelSerializer):
    class Meta:
        model=Estudio
        fields="__all__"
        
    # arreglar    
    # def validate_code(self, value):
    #     if value[0]=='B' and self.tipo!='B': raise serializers.ValidationError("El codigo del estudio no se corresponde con el tipo")
    
    def validate_hc(self,value):
        return hc_validator(value)
    def validate_fecha(self, value):
        return date_validator(value)
    def validate_entidad(self,value):
        return list_validator(value,["H","HC","CE"])
        

class PatientSerializer(serializers.ModelSerializer,):
    # studiesList=StudySerializer(many=True, read_only=True) #Toda la data de los estudios de un paciente
    # studiesList=serializers.StringRelatedField(many=True,read_only=True)
    
    studies = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='estudio-detail',
        lookup_field='code'
    )
    class Meta:
        model=Paciente
        fields="__all__"
        
    def validate_hc(self,value):
        return hc_validator(value)
    # def validate_cid(self,value):
    #     return 
    def validate_edad(self,value):
        return positive_number_validator(value,"EDAD")
    def validate_raza(self,value):
        return list_validator(value,["B","N","M"])
        
    
class DefunctSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fallecido
        fields = '__all__'
        
class NecropsySerializer(serializers.ModelSerializer):
    class Meta:
        model = Necropsia
        fields = '__all__'

class ProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proceso
        fields = '__all__'

class DiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnostico
        fields = '__all__'

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
        
    