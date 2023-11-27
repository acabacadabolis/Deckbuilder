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

    serialize_rules = ('-mtgdecks.user',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String, nullable=False)

    mtgdecks = db.relationship('MtgDeck', back_populates='user')

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

    def get_cards(self):
        actCards = [card.card.to_dict() for card in self.cards]
        return actCards

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

    serialize_rules = ('-card_faces.card',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    decks = db.relationship('MtgDeckCard', back_populates='card')
    card_faces = db.relationship('CardFace', back_populates='card')
    
class CardFace(db.Model, SerializerMixin):
    __tablename__ = 'cardfaces'

    serialize_rules = ('-card.card_faces','-decks.cards')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey('mtgcards.id'))

    image_uris = db.relationship('Imageurls', back_populates='card')
    card = db.relationship('MtgCard', back_populates='card_faces')

class Imageurls(db.Model, SerializerMixin):
    __tablename__ = 'imageurls'

    serialize_rules = ('-card.image_uris',)

    id = db.Column(db.Integer, primary_key=True)
    small = db.Column(db.String)
    normal = db.Column(db.String)
    large = db.Column(db.String)
    png = db.Column(db.String)
    art_crop = db.Column(db.String)
    border_crop = db.Column(db.String)
    card_id = db.Column(db.Integer, db.ForeignKey('cardfaces.id'))

    card = db.relationship('CardFace', back_populates='image_uris')