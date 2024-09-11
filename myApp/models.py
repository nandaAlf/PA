# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User,Group
from django.core.validators import MinValueValidator,MaxValueValidator

#arreglar el modelo asi
# edad = models.IntegerField(blank=True, null=True, validators=[MinValueValidator(0), MaxValueValidator(120)])
#     sexo = models.CharField(max_length=1, blank=True, null=True, choices=[('M', 'Masculino'), ('F', 'Femenino')])
#     raza = models.CharField(max_length=1, blank=True, null=True, choices=[('B', 'Blanca'), ('N', 'Negra'), ('O', 'Otra')])


class Estudio(models.Model):
    code = models.CharField(primary_key=True, max_length=15)
    tipo = models.CharField(max_length=1)
    hc_paciente = models.ForeignKey('Paciente', models.DO_NOTHING, db_column='hc_paciente',related_name='studies')
    # medico = models.CharField(max_length=11, blank=True, null=True)
    medico = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={'groups__name': 'DoctorsGroup'} ,
        db_column='medico',
        related_name='doctor'
    )
    imp_diag = models.CharField(blank=True, null=True)
    # especialista = models.CharField(max_length=11, blank=True, null=True)
    especialista = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={'groups__name': 'StaffGroup'} ,
        db_column='especialista',
        related_name= 'specialist'
    )
    pieza = models.CharField()
    fecha = models.DateField(blank=True, null=True)
    entidad = models.CharField(max_length=2, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'estudio'
        
        
    def __str__(self):
        return self.code


class Fallecido(models.Model):
    hc = models.OneToOneField('Paciente', models.DO_NOTHING, db_column='hc', primary_key=True,max_length=6)
    provincia = models.CharField(blank=True, null=True)
    municipio = models.CharField(blank=True, null=True)
    direccion = models.CharField(blank=True, null=True)
    app = models.CharField(blank=True, null=True)
    apf = models.CharField(blank=True, null=True)
    hea = models.CharField(blank=True, null=True)
    apgar = models.IntegerField(blank=True, null=True)
    edad_gest = models.IntegerField(blank=True, null=True)
    fecha_muerte = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fallecido'

        
    def __str__(self):
        return str(self.hc)

class Necropsia(models.Model):
    code = models.CharField(primary_key=True, max_length=10)
    hc_fallecido = models.ForeignKey(Fallecido, models.DO_NOTHING, db_column='hc_fallecido',related_name='necropsy')
    certif_defuncion = models.CharField(blank=True, null=True)
    # especialista = models.CharField(max_length=11, blank=True, null=True)
    especialista = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={'groups__name': 'StaffGroup'} ,
        db_column='especialista'
    )
    fecha = models.DateField(blank=True, null=True)
    procedencia = models.CharField(blank=True, null=True)
    habito_externo = models.CharField(blank=True, null=True)
    analisis_por_cavidades = models.CharField(blank=True, null=True)
    analisis_por_aparatos = models.CharField(blank=True, null=True)
    hallazgos = models.CharField(blank=True, null=True)
    epicrisis = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'necropsia'
        
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

    class Meta:
        managed = False
        db_table = 'paciente'
        
    def __str__(self):
        return self.nombre
    
    def get_absolute_url(self):
        return reverse('paciente-detail', args=[str(self.hc)])
    


class Proceso(models.Model):
    # id_proceso=models.IntegerField(primary_key=True,db_column='id_proceso')
    # cod_est = models.ForeignKey('Estudio', models.DO_NOTHING, db_column='cod_est', blank=True, null=True,related_name='proceso_est')
    cod_est=models.OneToOneField('Estudio', models.DO_NOTHING, db_column='cod_est', blank=True, null=True,related_name='proceso_est')
    cod_necro = models.ForeignKey('Necropsia', models.DO_NOTHING, db_column='cod_necro', blank=True, null=True,related_name='proceso_necro')
    descripcion_macro = models.CharField(blank=True, null=True)
    no_fragmentos = models.IntegerField(blank=True, null=True)
    no_bloques = models.IntegerField(blank=True, null=True)
    exist_resto = models.BooleanField(blank=True, null=True)
    descripcion_micro = models.CharField(blank=True, null=True)
    malignidad = models.BooleanField(blank=True, null=True)
    no_laminas = models.IntegerField(blank=True, null=True)
    no_cr = models.IntegerField(blank=True, null=True)
    no_ce = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'proceso'

        
    def __str__(self):
        return str(self.cod_necro) if str(self.cod_necro)!='None' else str(self.cod_est) 
    
class Diagnostico(models.Model):
    # id=models.IntegerField(primary_key=True)
    # id_proceso = models.ForeignKey('Proceso', db_column='id_proceso',on_delete=models.CASCADE,related_name='diagnostico')
    id_proceso=models.OneToOneField('Proceso', db_column='id_proceso',on_delete=models.CASCADE,related_name='diagnostico')
    diagnostico = models.CharField(blank=True, null=True)
    observaciones = models.TextField(blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)
    finalizado = models.BooleanField(blank=True, null=True,default=False)

    class Meta:
        managed = False
        db_table = 'diagnostico'
        
    def __str__(self):
        return f"Diagnóstico para proceso {self.id_proceso}"
