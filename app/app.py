from flask import Flask, render_template, jsonify, request
from datetime import datetime

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html", title="Dashboard")


@app.route("/about")
def about():
    return render_template("about.html", title="About")


@app.route("/features")
def features():
    return render_template("features.html", title="Features")


# --- REST API ---
@app.route("/api/stats")
def api_stats():
    stats = [
        {"label": "Users", "value": "12,430", "change": "+8%", "up": True},
        {"label": "Revenue", "value": "$94,200", "change": "+12%", "up": True},
        {"label": "Orders", "value": "3,280", "change": "-3%", "up": False},
        {"label": "Uptime", "value": "99.9%", "change": "+0.1%", "up": True},
    ]
    return jsonify(stats)


@app.route("/api/echo", methods=["POST"])
def api_echo():
    data = request.get_json(silent=True) or {}
    return jsonify({"echo": data, "timestamp": datetime.utcnow().isoformat()})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
