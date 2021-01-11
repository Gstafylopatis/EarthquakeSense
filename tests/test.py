import json

f = open('ionian_test.json')
x = json.load(f)
print(x['Event'][0])
