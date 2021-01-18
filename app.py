from flask import Flask, render_template, request, jsonify
import json

from flask.wrappers import Response
from earthquake import SeismicEvent, Earthquake
from intersect import intersection
from os import walk

seismic_events_list = []

app = Flask(__name__)
files_list = list()


def get_event(testFile, station_number):
    f = open("tests/" + testFile + ".json")
    x = json.load(f)
    return x['Event'][station_number]


@app.route('/', methods=['POST', 'GET'])
def index():

    return render_template('index.html')


@app.route('/get_tests')
def get_tests():
    for root, dirs, files in walk("./tests/"):
        for filename in files:
            files_list.append(filename.split('.', 1)[0])
    return jsonify(status='success', files=files_list)


@app.route('/get_events_names', methods=['POST', 'GET'])
def get_events_names():
    test = request.json.get('selectedTest')
    f = open("tests/" + test + ".json")
    x = json.load(f)
    events = list()
    for event in x['Event']:
        events.append(event['name'])

    return jsonify(status='success', events=events)


@app.route('/read_station', methods=['POST'])
def read_station():
    testFile = request.json.get('testFile')
    event_num = request.json.get('event_num')
    event = get_event(testFile, event_num)
    seismic_event = SeismicEvent(
        event['name'], event['coord'], event['ptime'], event['stime'], event['max_amp'])
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


@app.route('/intersect')
def intersect():

    p1 = seismic_events_list[0].coord
    r1 = seismic_events_list[0].distance_to_ep * 1000  # Meters

    p2 = seismic_events_list[1].coord
    r2 = seismic_events_list[1].distance_to_ep * 1000  # Meters
    inter1, inter2 = intersection(p1, r1, p2, r2)

    if(inter1 is not None and inter2 is not None):
        return jsonify(status='success', p1=inter1, p2=inter2)
    else:
        return jsonify(status=404)


if __name__ == "__main__":
    app.run(debug=True)
