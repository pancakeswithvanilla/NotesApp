# Generated by Django 4.2.18 on 2025-02-18 10:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_teacher_name_subject_teacher_subjects'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subject',
            old_name='name',
            new_name='subjectName',
        ),
    ]
