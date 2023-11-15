# Generated by Django 4.2.7 on 2023-11-15 19:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('book', '0001_initial'),
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='book',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='book.book'),
        ),
        migrations.AddField(
            model_name='order',
            name='buyer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='account.buyer'),
        ),
        migrations.AddField(
            model_name='order',
            name='seller',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='account.seller'),
        ),
        migrations.AddField(
            model_name='buyer',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
