# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.urls import reverse
from django.core.validators import MinValueValidator,MaxValueValidator
from user_app.models import CustomUser
from django.utils import timezone 

#arreglar el modelo asi
# edad = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(0), MaxValueValidator(120)])
#     sexo = models.CharField(max_length=1, blank=True, null=True, choices=[('M', 'Masculino'), ('F', 'Femenino')])
#     raza = models.CharField(max_length=1, blank=True, null=True, choices=[('B', 'Blanca'), ('N', 'Negra'), ('O', 'Otra')])

class Doctor(models.Model):
   
    cid = models.CharField(unique=True, max_length=11, blank=True, null=True)
    nombre = models.CharField(max_length=150)
    dpto=models.CharField(max_length=150)
   
    # class Meta:
    #     managed = True
    #     db_table = 'paciente'
        
    def __str__(self):
        return self.nombre
    
   
class Estudio(models.Model):
    code = models.CharField(primary_key=True, max_length=15)
    tipo = models.CharField(max_length=1)
    hc_paciente = models.ForeignKey('Paciente', models.CASCADE, db_column='hc_paciente',related_name='studies')
   
    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.SET_NULL,
        # limit_choices_to={'groups__name': 'DoctorsGroup'} ,
        db_column='doctor',
        related_name='doctor',
        null=True
    )
    imp_diag = models.CharField(blank=True, null=True,max_length=50)
    especialista = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'groups__name': 'LabStaffGroup'} ,
        db_column='especialista',
        related_name= 'specialist'
    )
    pieza = models.CharField(max_length=50)
    fecha = models.DateField(blank=True, null=True)
    entidad = models.CharField(max_length=2, blank=True, null=True)
    finalizado = models.BooleanField(blank=True, null=True,default=False)

    # class Meta:
    #     managed = True
    #     db_table = 'estudio'
    
    def save(self, *args, **kwargs):
        if not self.code:
            # Generar el código automáticamente
            self.code = self.generate_code()
        super(Estudio, self).save(*args, **kwargs)

    def generate_code(self):
        # Obtener el año actual
        current_year = timezone.now().year
        # Obtener el último código creado del mismo tipo en el mismo año
        last_study = Estudio.objects.filter(code__startswith=f"{self.tipo}-{current_year}-").order_by('code').last()
        
        if last_study:
            # Obtener el número secuencial y aumentarlo
            last_number = int(last_study.code.split("-")[-1])
            new_number = last_number + 1
        else:
            new_number = 1  # Si no existe, empezamos desde 1

        # Formatear el código con el tipo, año y número
        return f"{self.tipo}-{current_year}-{new_number:02d}"
        
    def __str__(self):
        return self.code


class Fallecido(models.Model):
    hc = models.OneToOneField('Paciente', models.CASCADE ,db_column='hc', primary_key=True,max_length=6)
    provincia = models.CharField(blank=True, null=True,max_length=50)
    municipio = models.CharField(blank=True, null=True,max_length=50)
    direccion = models.CharField(blank=True, null=True,max_length=50)
    app = models.CharField(blank=True, null=True,max_length=50)
    apf = models.CharField(blank=True, null=True,max_length=50)
    hea = models.CharField(blank=True, null=True,max_length=50)
    apgar = models.IntegerField(blank=True, null=True)
    edad_gest = models.IntegerField(blank=True, null=True)
    fecha_muerte = models.DateField(blank=True, null=True)

    # class Meta:
    #     managed = False
    #     db_table = 'fallecido'

        
    def __str__(self):
        return str(self.hc)

class Necropsia(models.Model):
    code = models.CharField(primary_key=True, max_length=10)
    hc_paciente= models.ForeignKey(Fallecido, models.CASCADE, db_column='hc_fallecido',related_name='necropsy')
    certif_defuncion = models.CharField(blank=True, null=True,max_length=50)
    # especialista = models.CharField(max_length=11, blank=True, null=True)
    especialista = models.ForeignKey(
         CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'groups__name': 'LabStaffGroup'} ,
        db_column='especialista'
    )
    fecha = models.DateField(blank=True, null=True)
    procedencia = models.CharField(blank=True, null=True,max_length=50)
    habito_externo = models.CharField(blank=True, null=True,max_length=50)
    analisis_por_cavidades = models.CharField(blank=True, null=True,max_length=50)
    analisis_por_aparatos = models.CharField(blank=True, null=True,max_length=50)
    hallazgos = models.CharField(blank=True, null=True,max_length=50)
    epicrisis = models.CharField(blank=True, null=True,max_length=50)
    finalizado = models.BooleanField(blank=True, null=True,default=False)

    # class Meta:
    #     managed = True
    #     db_table = 'necropsia'
    
    def save(self, *args, **kwargs):
        if not self.code:
            # Generar el código automáticamente
            self.code = self.generate_code()
        super(Necropsia, self).save(*args, **kwargs)

    def generate_code(self):
        # Obtener el año actual
        current_year = timezone.now().year
        # Obtener el último código creado en el mismo año
        last_necropsia = Necropsia.objects.filter(code__startswith=f"N-{current_year}-").order_by('code').last()
        
        if last_necropsia:
            # Obtener el número secuencial y aumentarlo
            last_number = int(last_necropsia.code.split("-")[-1])
            new_number = last_number + 1
        else:
            new_number = 1  # Si no existe, empezamos desde 1

        # Formatear el código con el tipo, año y número
        return f"N-{current_year}-{new_number:02d}"
        
    def __str__(self):
        return self.code

class Paciente(models.Model):
    hc = models.CharField(primary_key=True, max_length=6)
    cid = models.CharField(unique=True, max_length=11, blank=True, null=True)
    nombre = models.CharField(max_length=150)
    # edad = models.IntegerField(blank=True, null=True)
    edad = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(0), MaxValueValidator(120)])
    # sexo = models.CharField(max_length=1, blank=True, null=True)
    sexo = models.CharField(max_length=1, blank=True, null=True, choices=[('M', 'Masculino'), ('F', 'Femenino')])
    # raza = models.CharField(max_length=1, blank=True, null=True)
    raza = models.CharField(max_length=1, blank=True, null=True, choices=[('B', 'Blanca'), ('N', 'Negra')])
    es_fallecido = models.BooleanField(blank=True, null=True, default=False)

    # class Meta:
    #     managed = True
    #     db_table = 'paciente'
        
    def __str__(self):
        return self.nombre
    
    def get_absolute_url(self):
        return reverse('paciente-detail', args=[str(self.hc)])
    


class Proceso(models.Model):
    # id_proceso=models.IntegerField(primary_key=True,db_column='id_proceso')
    cod_est=models.OneToOneField('Estudio', models.CASCADE, db_column='cod_est', blank=True, null=True,related_name='proceso_est')
    cod_necro = models.OneToOneField('Necropsia', models.CASCADE, db_column='cod_necro', blank=True, null=True,related_name='proceso_necro')
    descripcion_macro = models.CharField(blank=True, null=True,max_length=50)
    no_fragmentos = models.IntegerField(blank=True, null=True)
    no_bloques = models.IntegerField(blank=True, null=True)
    exist_resto = models.BooleanField(blank=True, null=True)
    descripcion_micro = models.CharField(blank=True, null=True,max_length=50)
    malignidad = models.BooleanField(blank=True, null=True)
    no_laminas = models.IntegerField(blank=True, null=True)
    no_cr = models.IntegerField(blank=True, null=True)
    no_ce = models.IntegerField(blank=True, null=True)

    # class Meta:
    #     managed = True
    #     db_table = 'proceso'

        
    def __str__(self):
        return str(self.cod_necro) if str(self.cod_necro)!='None' else str(self.cod_est) 
    
class Diagnostico(models.Model):
    # id=models.IntegerField(primary_key=True)
    # id_proceso = models.ForeignKey('Proceso', db_column='id_proceso',on_delete=models.CASCADE,related_name='diagnostico')
    id_proceso=models.OneToOneField('Proceso', db_column='id_proceso',on_delete=models.CASCADE,related_name='diagnostico')
    diagnostico = models.CharField(blank=True, null=True,max_length=50)
    observaciones = models.TextField(blank=True, null=True,max_length=50)
    # fecha = models.DateField(blank=True, null=True)
    # finalizado = models.BooleanField(blank=True, null=True,default=False)

    # class Meta:
    #     managed = True
    #     db_table = 'diagnostico'
        
    def __str__(self):
        return f"Diagnóstico para proceso {self.id_proceso}"

