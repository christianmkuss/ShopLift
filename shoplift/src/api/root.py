import flask
from flask import request, jsonify
import requests as rq

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/ping', methods=['GET'])
def ping():
    return "pong"


@app.route('/findMarket', methods=['GET'])
def find_markets():
    try:
        if 'zip' in request.args:
            zipcode = int(request.args['zip'])
        else:
            return jsonify(error="Please specify a zip code to look for farmer's markets in")
        return find_markets_in_zip(zipcode)
    except:
        return jsonify(error="Error parsing zip code")


def find_markets_in_zip(zipcode):
    path = "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip={}".format(zipcode)
    r = rq.get(path).json()
    return r


@app.route('/getMarketDetails', methods=['GET'])
def get_market_details():
    try:
        if 'id' in request.args:
            id = int(request.args['id'])
        else:
            return jsonify(error="Could not find id in query parameters")
        return get_market_details_by_id(id)
    except:
        return jsonify(error="Error parsing market id - try again")


def get_market_details_by_id(id):
    path = "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id={}".format(id)
    return rq.get(path).json()


@app.route('/getAlternatives', methods=['GET'])
def get_alternatives():
    try:
        if 'item' in request.args:
            item = request.args['item']
        else:
            return jsonify(error="Could not find item in Query parameters")
        # do something with with the database
        return 1
    except:
        return jsonify(error="Error parsing request item")


app.run()

