# Jharkhand Tourism Chatbot (React + FastAPI)

## 📂 Structure
- **backend/** → FastAPI backend (Python)
- **frontend/** → React frontend (JavaScript)

## 🚀 Run Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate    # Windows
pip install -r requirements.txt
uvicorn app:app --reload
```

Backend available at: http://127.0.0.1:8000/chat

## 💻 Run Frontend
```bash
cd frontend
npm install
npm start
```

Frontend available at: http://localhost:3000
