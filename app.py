from flask import Flask, render_template, request, jsonify
import json
from earthquake import SeismicEvent, Earthquake

seismic_events_list = []

app = Flask(__name__)

def get_event(station_number):
    f = open("tests/ionian_test.json")
    x = json.load(f)
    return x['Event'][station_number]

@app.route('/', methods=['POST', 'GET'])
def index():

    return render_template('index.html')

@app.route('/read_station', methods=['POST'])
def read_station():
    event_num = request.json.get('event_num')
    event = get_event(event_num)
    seismic_event = SeismicEvent(event['name'], event['coord'], event['ptime'], event['stime'], event['max_amp'])
    seismic_events_list.append(seismic_event)
    return jsonify(status='success', lat=seismic_event.coord[0], lon=seismic_event.coord[1], radius=seismic_event.distance_to_ep*1000)


@app.route('/calculate')
def calculate():

    earthquake = Earthquake(seismic_events_list)
    coord, magnitude = earthquake.calculate_epicenter()

    magnitude = f"{magnitude:.2f}"
    print("Earthquake magnitude: %s" % magnitude)
    print("Coordinates of epicenter (lat,lon): %s" % (coord,))

    return jsonify(status='success', lat=coord[0], lon=coord[1])



if __name__ == "__main__":
    app.run(debug=True)