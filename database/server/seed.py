from random import choice as rc, randrange

from app import app
from model import db, User, MtgCard, MtgDeckCard, MtgDeck, CardFace, YugiCard, YugiDeck, YugiDeckCard
import requests

if __name__ == '__main__':
    with app.app_context():

        User.query.delete()
        MtgCard.query.delete()
        MtgDeck.query.delete()
        MtgDeckCard.query.delete()
        CardFace.query.delete()
        YugiCard.query.delete()
        YugiDeckCard.query.delete()
        YugiDeck.query.delete()

        u1 = User(username = 'fighter', name = 'firstname', _password_hash = 'password', email = 'email@email.com')
        print('adding user1')
        db.session.add(u1)
        d1 = MtgDeck(name = 'deck1', user=u1)
        print('adding deck1')
        db.session.add(d1)
        c1 = MtgCard(name = 'jace bewildered')
        print('adding card1')
        db.session.add(c1)
        cardface1 = CardFace(card = c1, image = "https://cards.scryfall.io/small/front/a/e/ae155ee2-008f-4dc6-82bf-476be7baa224.jpg?1576383667")
        print('adding cardface1')
        db.session.add(cardface1)
        dc1 = MtgDeckCard(deck = d1,card = c1)
        print('adding deckcard1')
        db.session.add(dc1)

        yd1 = YugiDeck(name = 'ydeck1', user=u1)
        print('adding ydeck1')
        db.session.add(yd1)
        yc1 = YugiCard(name = 'Yugi bewildered', image = "https://images.ygoprodeck.com/images/cards/87798440.jpg")
        print('adding ycard1')
        db.session.add(yc1)
        ydc1 = YugiDeckCard(yugi_deck = yd1,yugi_card = yc1)
        print('adding ydeckcard1')
        db.session.add(ydc1)
        db.session.commit()
        print('finished seeding')