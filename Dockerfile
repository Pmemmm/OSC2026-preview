FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV HOST=0.0.0.0
ENV PORT=4174
ENV MGPIC_DB=/var/lib/mgpic/mgpic2026.sqlite3
ENV MGPIC_BACKUP_DIR=/var/lib/mgpic/backups
ENV MGPIC_MAX_BACKUPS=30

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p /var/lib/mgpic/backups

EXPOSE 4174

CMD ["python3", "server.py"]
