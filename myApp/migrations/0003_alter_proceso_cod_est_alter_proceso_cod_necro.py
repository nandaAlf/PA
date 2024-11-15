# Generated by Django 5.0.7 on 2024-09-13 23:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proceso',
            name='cod_est',
            field=models.OneToOneField(blank=True, db_column='cod_est', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='proceso_est', to='myApp.estudio'),
        ),
        migrations.AlterField(
            model_name='proceso',
            name='cod_necro',
            field=models.ForeignKey(blank=True, db_column='cod_necro', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='proceso_necro', to='myApp.necropsia'),
        ),
    ]
