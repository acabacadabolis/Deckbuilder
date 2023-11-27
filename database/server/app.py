from model import db, User, MtgCard, MtgDeck, MtgDeckCard
from flask_migrate import Migrate
from flask import Flask, request, make_response, session
from flask_restful import Api, Resource
from flask_cors import CORS

import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.environ.get("secret_key")
CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

@app.route('/')
def home():
    return '<h1>Phase 5 Project</h1>'

@app.route('/users')
def all_users():
    body = [user.to_dict() for user in User.query.all()]
    return body, 200

@app.route('/mtgdecks')
def all_mtg_decks():
    body = [deck.to_dict() for deck in MtgDeck.query.all()]
    return body, 200

@app.route('/mtgcards')
def all_mtg_cards():
    body = [card.to_dict() for card in MtgCard.query.all()]
    return body, 200