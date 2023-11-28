from model import db, User, MtgCard, MtgDeck, MtgDeckCard, CardFace, YugiCard, YugiDeck, YugiDeckCard
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
CORS(app,supports_credentials=True)

migrate = Migrate(app, db)

db.init_app(app)

@app.route('/')
def home():
    return '<h1>Phase 5 Project</h1>'

@app.route('/logout', methods=['DELETE'])
def logout():
    if "user_id" in session:
        session.pop('user_id')
    return {'message': 'logged out'}, 200

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

@app.route('/mtgcards', methods=['POST'])
def all_mtg_cards():

    data = request.get_json()
    if 'card_faces' in data:
        try:
            new_card = MtgCard(name =data.get('name'))
            new_deck_card = MtgDeckCard(deck = MtgDeck.query.filter(MtgDeck.id == data.get('deckid')).first(), card = new_card)
            new_cf = CardFace(card = new_card, image = data['image_uris'][0]['image_uris']['small'])
            new_cb = CardFace(card = new_card, image = data['image_uris'][1]['image_uris']['small'])
        except ValueError as e:
            return {'error':str(e)}, 400
        db.session.add(new_card)
        db.session.add(new_deck_card)
        db.session.add(new_cf)
        db.session.add(new_cb)
        db.session.commit()

        return new_card.to_dict(), 201
    
    elif 'card_faces' not in data:
        try:
            new_card = MtgCard(name =data.get('name'))
            new_deck_card = MtgDeckCard(deck = MtgDeck.query.filter(MtgDeck.id == data.get('deckid').first()), card = new_card)
            new_cf = CardFace(card = new_card, image = data['image_uris']['small'])
        except ValueError as e:
            return {'error':str(e)}, 400
        db.session.add(new_card)
        db.session.add(new_deck_card)
        db.session.add(new_cf)
        db.session.commit()

        return new_card.to_dict(), 201