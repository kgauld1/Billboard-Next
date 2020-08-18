from flask import Flask, render_template
# import network

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



if __name__ == "__main__":
  app.run(host='0.0.0.0', port=8000, debug=True)
