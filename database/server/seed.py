from random import choice as rc, randrange

from app import app
from model import db, User, MtgCard, MtgDeckCard, MtgDeck, CardFace, Imageurls
import requests

if __name__ == '__main__':
    with app.app_context():

        User.query.delete()
        MtgCard.query.delete()
        MtgDeck.query.delete()
        MtgDeckCard.query.delete()
        CardFace.query.delete()
        Imageurls.query.delete()

        u1 = User(username = 'fighter', name = 'firstname', _password_hash = 'password', email = 'email@email.com')
        print('adding user1')
        db.session.add(u1)
        d1 = MtgDeck(name = 'deck1', type = 'magic', user=u1)
        print('adding deck1')
        db.session.add(d1)
        c1 = MtgCard(name = 'jace bewildered')
        print('adding card1')
        db.session.add(c1)
        cardface1 = CardFace(card = c1, name = 'jace bewildered')
        print('adding cardface1')
        db.session.add(cardface1)
        image1 = Imageurls(
            small = "https://cards.scryfall.io/small/front/a/e/ae155ee2-008f-4dc6-82bf-476be7baa224.jpg?1576383667",
            normal = "https://cards.scryfall.io/normal/front/a/e/ae155ee2-008f-4dc6-82bf-476be7baa224.jpg?1576383667",
            large =  "https://cards.scryfall.io/large/front/a/e/ae155ee2-008f-4dc6-82bf-476be7baa224.jpg?1576383667",
            png = "https://cards.scryfall.io/png/front/a/e/ae155ee2-008f-4dc6-82bf-476be7baa224.png?1576383667",
            art_crop = "https://cards.scryfall.io/art_crop/front/a/e/ae155ee2-008f-4dc6-82bf-476be7baa224.jpg?1576383667",
            border_crop = "https://cards.scryfall.io/border_crop/front/a/e/ae155ee2-008f-4dc6-82bf-476be7baa224.jpg?1576383667",
            card = cardface1
        )
        print('adding image1')
        db.session.add(image1)
        dc1 = MtgDeckCard(deck = d1,card = c1)
        print('adding deckcard1')
        db.session.add(dc1)
        db.session.commit()
        print('finished seeding')