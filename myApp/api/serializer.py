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
    print("VALUE ES:",value)
    if value is None or value==" " or value=="null" :return value
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
    

class DefunctSerializer(serializers.ModelSerializer):
    
    necropsy= serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='necropsia-detail',
        lookup_field='code'
    )
    class Meta:
        model = Fallecido
        # fields = '__all__'
        # except='hc'
        # except='hc'
        fields=['necropsy','provincia', 'municipio', 'direccion', 'app', 'apf', 'hea', 'apgar', 'edad_gest', 'fecha_muerte']

class PatientSerializer(serializers.ModelSerializer):
    # studiesList=StudySerializer(many=True, read_only=True) #Toda la data de los estudios de un paciente
    # studiesList=serializers.StringRelatedField(many=True,read_only=True)
    
    fallecido = DefunctSerializer(required=False, allow_null=True)
    studies = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='estudio-detail',
        lookup_field='code'
    )
    def create(self, validated_data):
        # Extraer los datos de fallecido si existen
        fallecido_data = validated_data.pop('fallecido', None)
        
        # Crear el paciente primero
        paciente = Paciente.objects.create(**validated_data)

        # Si el paciente es fallecido, insertar también el registro en Fallecido
        if paciente.es_fallecido and fallecido_data:
            Fallecido.objects.create(
                hc=paciente,  # asociamos el paciente recién creado
                **fallecido_data
            )

        return paciente
    
    def update(self, instance, validated_data):
        # Update Paciente instance
        fallecido_data = validated_data.pop('fallecido', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
      
        # Update or create Fallecido instance
        if instance.es_fallecido:
            if fallecido_data:
                paciente_instance = Paciente.objects.get(hc=instance.hc)
                Fallecido.objects.update_or_create(
                    hc=paciente_instance,
                    defaults=fallecido_data
                )
        else:
            # If paciente is not deceased, ensure there's no Fallecido record for this patient
            Fallecido.objects.filter(hc=instance.hc).delete()
            
        return instance
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
        
    

        
class NecropsySerializer(serializers.ModelSerializer):
    
    code = serializers.CharField(read_only=True) 
    class Meta:
        model = Necropsia
        fields = '__all__'



class DiagnosisSerializer(serializers.ModelSerializer):
   
    
    class Meta:
        model = Diagnostico
        # fields = '__all__'
        fields = ['diagnostico', 'observaciones']


       
class ProcessSerializer(serializers.ModelSerializer):
    diagnostico = DiagnosisSerializer( read_only=True)  # Usa related_name en la ForeignKey del diagnóstico

    class Meta:
        model = Proceso
        fields = '__all__'
        # fields = ['diagnostico', 'observaciones', 'fecha', 'finalizado']
        # fields = ['cod_est', 'descripcion_macro', 'no_fragmentos', 'no_bloques', 'exist_resto', 'descripcion_micro', 'malignidad', 'no_laminas', 'no_cr', 'no_ce', 'cod_necro', 'diagnostico']
        
class StudySerializer(serializers.ModelSerializer):
    
    code = serializers.CharField(read_only=True)  # El código es solo de lectura
    # proceso_est = ProcessSerializer(read_only=True)  # Si quieres incluir los datos del proceso
    # diagnostico = DiagnosisSerializer(read_only=True)  # Si hay varios diagnósticos relacionados

    class Meta:
        model=Estudio
        fields="__all__"
        # fields = ['code', 'tipo', 'imp_diag', 'pieza', 'fecha', 'entidad', 'hc_paciente', 'medico', 'especialista', 'proceso_est']
        
    # arreglar    
    # def validate_code(self, value):
    #     if value[0]=='B' and self.tipo!='B': raise serializers.ValidationError("El codigo del estudio no se corresponde con el tipo")
    
    def validate_hc(self,value):
        return hc_validator(value)
    def validate_fecha(self, value):
        return date_validator(value)
    def validate_entidad(self,value):
        return list_validator(value,["H","HC","CE"])
 