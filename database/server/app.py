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
app.secret_key = os.environ.get("SECRET_KEY")
CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

@app.route('/')
def home():
    return '<h1>Phase 5 Project</h1>'

@app.route('/signup', methods=['POST'])
def all_users():
    data = request.get_json()
    try:
        new_user = User(
            name = data['name'], 
            username = data['username'], 
            email = data['email'])
        new_user.password_hash = data.get('password')
    except ValueError as e:
        return {'error':str(e)}, 400
    db.session.add(new_user)
    db.session.commit()

    return {'message':f'{new_user.username} added'}, 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter(User.username == data['username']).first()

    if not user:
        return {'message': 'user not found'}, 404
    
    if user.authenticate(data['password']):
        session['user_id'] = user.id
        return user.to_dict(), 201
    else:
        return {'message': 'login failed'}, 401

@app.route('/users/<int:id>', methods=['GET'])
def user_by_id(id):
    body = User.query.filter(User.id == id).first()
    if not body:
        return {'error':"user not found"}, 404
    elif request.method == 'GET':
        return body.to_dict(), 200

@app.route('/mtgdecks')
def all_mtg_decks():
    user_id = session.get('user_id')
    user = User.query.filter(User.id == user_id).first()

    if not user:
        # invalid cookie
        return {'message': 'invalid session'}, 401
    
    body = [deck.to_dict() for deck in MtgDeck.query.filter(MtgDeck.user_id == user.id).all()]
    return body, 200

@app.route('/mtgcards')
def all_mtg_cards():

    data = request.get_json()

    body = [card.to_dict() for card in MtgCard.query.filter().all()]
    return body, 200