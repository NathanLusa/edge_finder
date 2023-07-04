# syntax=docker/dockerfile:1
# FROM python:3.11.4
# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1
# WORKDIR /code
# COPY requirements.txt /code/
# RUN pip install -r requirements.txt
# COPY . /code/


# syntax=docker/dockerfile:1
FROM python:3.11.4
WORKDIR /code
# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5151
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5151"]
