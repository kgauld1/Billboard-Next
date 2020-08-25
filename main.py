from flask import Flask, render_template, jsonify, request
import network
from os import environ
import requests
import json

client_id = environ.get('CLIENT_ID');
client_secret = environ.get('CLIENT_SECRET');
body_params = {'grant_type' : 'client_credentials'}
url='https://accounts.spotify.com/api/token'

response=requests.post(url, data=body_params, auth = (client_id, client_secret))

postDict = json.loads(response.text)
token = postDict['access_token']
print(token);



app = Flask(__name__, template_folder='templates', static_folder='static')

#Clears cache
@app.after_request
def add_header(r):
	r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
	r.headers["Pragma"] = "no-cache"
	r.headers["Expires"] = "0"
	r.headers['Cache-Control'] = 'public, max-age=0'
	return r

@app.route('/')
def index():
  return render_template("index.html")

@app.route('/previous')
def previous():
  return render_template("previous.html")

@app.route('/current')
def current():
  return render_template("current.html")

@app.route('/songs', methods=['POST'])
def songs():
  data = request.get_json()['type']
  
  if data == "this":
    rankings = network.getCurrent()[:10]
  elif data == 'last':
    rankings = network.getPrevious()[:10]
  else:
    rankings = network.predict()[:10]

  return jsonify(ranks=rankings, token=token)

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=8000, debug=True) 
