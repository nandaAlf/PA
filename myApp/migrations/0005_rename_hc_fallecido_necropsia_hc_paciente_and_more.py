# Generated by Django 5.0.7 on 2024-09-20 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0004_remove_diagnostico_fecha_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='necropsia',
            old_name='hc_fallecido',
            new_name='hc_paciente',
        ),
        migrations.AddField(
            model_name='necropsia',
            name='finalizado',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
