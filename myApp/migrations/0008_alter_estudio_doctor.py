# Generated by Django 5.0.7 on 2024-10-01 19:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0007_remove_estudio_medico_estudio_doctor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='estudio',
            name='doctor',
            field=models.ForeignKey(db_column='doctor', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='doctor', to='myApp.doctor'),
        ),
    ]
