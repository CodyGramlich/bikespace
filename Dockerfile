FROM python:3.7.0
ENV PYTHONUNBUFFERED 1
RUN apt-get update && apt-get install -y python-dev
RUN mkdir /code
WORKDIR /code
COPY . /code/
RUN pip install -r requirements.txt
CMD python manage.py migrate && python manage.py runserver 0.0.0.0:8000