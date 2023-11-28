"""add yugi side

Revision ID: 8a31931b03f0
Revises: 477d8825ba0e
Create Date: 2023-11-28 11:31:03.074892

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8a31931b03f0'
down_revision = '477d8825ba0e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('yugicards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_yugicards'))
    )
    op.create_table('yugidecks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_yugidecks_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_yugidecks'))
    )
    op.create_table('yugiimages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('image_url', sa.String(), nullable=True),
    sa.Column('image_url_small', sa.String(), nullable=True),
    sa.Column('image_url_cropped', sa.String(), nullable=True),
    sa.Column('card_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['card_id'], ['yugicards.id'], name=op.f('fk_yugiimages_card_id_yugicards')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_yugiimages'))
    )
    op.create_table('yugideckcards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('deck_id', sa.Integer(), nullable=True),
    sa.Column('mtgcard_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['deck_id'], ['yugidecks.id'], name=op.f('fk_yugideckcards_deck_id_yugidecks')),
    sa.ForeignKeyConstraint(['mtgcard_id'], ['yugicards.id'], name=op.f('fk_yugideckcards_mtgcard_id_yugicards')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_yugideckcards'))
    )
    with op.batch_alter_table('mtgdecks', schema=None) as batch_op:
        batch_op.drop_column('type')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('mtgdecks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('type', sa.VARCHAR(), nullable=False))

    op.drop_table('yugideckcards')
    op.drop_table('yugiimages')
    op.drop_table('yugidecks')
    op.drop_table('yugicards')
    # ### end Alembic commands ###