"""add card_faces

Revision ID: bba5d08334e1
Revises: 60149aa9cdbb
Create Date: 2023-11-27 10:39:49.806398

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bba5d08334e1'
down_revision = '60149aa9cdbb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cardfaces',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('image_uris', sa.String(), nullable=False),
    sa.Column('card_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['card_id'], ['mtgcards.id'], name=op.f('fk_cardfaces_card_id_mtgcards')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_cardfaces'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cardfaces')
    # ### end Alembic commands ###
