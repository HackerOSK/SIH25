import sys, os
from flask import Flask, request, jsonify
from flask_cors import CORS
from src.abcdef.src.retrieval.retriever import RetrieverQA
from src.abcdef.src.config import get_settings


# Ensure "src" is in path
sys.path.append(os.path.dirname(__file__))


# Load settings and initialize retriever
settings = get_settings()
qa = RetrieverQA(
    embedding_model=settings.embedding_model,
    qdrant_url=settings.qdrant_url,
    qdrant_api_key=settings.qdrant_api_key,
    collection="jh_tourism",
)

app = Flask(__name__)
CORS(app,
     origins={"http://localhost:8081"})

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        message = data.get("message")
        top_k = data.get("top_k", 5)
        temperature = data.get("temperature", 0.2)
        
        answer, sources = qa.answer(message, top_k=top_k, temperature=temperature)
        return jsonify({"reply": answer, "sources": sources})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

app.run(debug=True)

