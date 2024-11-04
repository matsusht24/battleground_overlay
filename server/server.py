from flask import Flask, jsonify
from flask_cors import CORS
import hero_selection

#app instance
app = Flask(__name__)
CORS(app)

@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message': 'Does this really work?'
    })

@app.route("/api/heroes", methods=['GET'])
def return_heroes():
    heroData = hero_selection.hero_parser()
    return jsonify({
        'heroData': heroData
    })
    

if __name__ == "__main__":
    app.run(debug=True, port=8080)