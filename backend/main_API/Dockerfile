FROM python:3.9.6

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

EXPOSE 8000



CMD ["uvicorn", "main:app"]