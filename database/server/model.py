from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property


convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)
bcrypt = Bcrypt()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-mtgdecks.user','-yugidecks.user')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String, nullable=False)

    mtgdecks = db.relationship('MtgDeck', back_populates='user')
    yugidecks = db.relationship('YugiDeck', back_populates='user')

    @hybrid_property
    def password_hash(self):
        return self._pass_hash
    
    @password_hash.setter
    def password_hash(self, new_pass):
        pass_hash = bcrypt.generate_password_hash(new_pass.encode('utf-8'))
        self._password_hash = pass_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash,
            password.encode('utf-8')
        )

class MtgDeck(db.Model, SerializerMixin):
    __tablename__ = 'mtgdecks'

    serialize_rules = ('-user.mtgdecks','-cards.deck')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='mtgdecks')
    cards = db.relationship('MtgDeckCard', back_populates='deck')

class MtgDeckCard(db.Model, SerializerMixin):
    __tablename__ = 'mtgdeckcards'

    serialize_rules = ('-deck.cards','-card.decks')

    id = db.Column(db.Integer, primary_key=True)
    deck_id = db.Column(db.Integer, db.ForeignKey('mtgdecks.id'))
    mtgcard_id = db.Column(db.Integer, db.ForeignKey('mtgcards.id'))

    deck = db.relationship('MtgDeck', back_populates='cards')
    card = db.relationship('MtgCard', back_populates='decks')


class MtgCard(db.Model, SerializerMixin):
    __tablename__ = 'mtgcards'

    serialize_rules = ('-card_faces.card','-decks')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    decks = db.relationship('MtgDeckCard', back_populates='card')
    card_faces = db.relationship('CardFace', back_populates='card')
    
class CardFace(db.Model, SerializerMixin):
    __tablename__ = 'cardfaces'

    serialize_rules = ('-card.card_faces',)

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String, nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey('mtgcards.id'))

    card = db.relationship('MtgCard', back_populates='card_faces')

class YugiDeck (db.Model, SerializerMixin):
    __tablename__ = 'yugidecks'

    serialize_rules = ('-user.yugidecks','-yugi_cards.yugi_deck')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='yugidecks')
    yugi_cards = db.relationship('YugiDeckCard', back_populates='yugi_deck')

class YugiDeckCard(db.Model, SerializerMixin):
    __tablename__ = 'yugideckcards'

    serialize_rules = ('-yugi_deck.cards','-yugi_card.decks')

    id = db.Column(db.Integer, primary_key=True)
    deck_id = db.Column(db.Integer, db.ForeignKey('yugidecks.id'))
    yugicard_id = db.Column(db.Integer, db.ForeignKey('yugicards.id'))

    yugi_deck = db.relationship('YugiDeck', back_populates='yugi_cards')
    yugi_card = db.relationship('YugiCard', back_populates='yugi_decks')

class YugiCard(db.Model, SerializerMixin):
    __tablename__ = 'yugicards'

    serialize_rules = ('-yugi_decks.yugi_card',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)

    yugi_decks = db.relationship('YugiDeckCard', back_populates='yugi_card')