from flask import Flask, render_template, request, jsonify
import json


app = Flask(__name__)

def get_station(station_number):
    f = open("tests/ionian_test.json")
    x = json.load(f)
    return x['Event'][station_number]

@app.route('/', methods=['POST', 'GET'])
def index():

    return render_template('index.html')

@app.route('/read_station', methods=['POST'])
def read_station():
    station_num = request.json.get('station_num')
    station = get_station(station_num)
    print(station)
    return jsonify(status='success', lat=10, lon=10)


if __name__ == "__main__":
    app.run(debug=True)