"""fix redunceny

Revision ID: 63744f7c6898
Revises: a1397e450d91
Create Date: 2023-11-28 17:45:07.631493

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '63744f7c6898'
down_revision = 'a1397e450d91'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('yugiimages')
    op.drop_table('imageurls')
    with op.batch_alter_table('cardfaces', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.String(), nullable=False))
        batch_op.drop_column('name')

    with op.batch_alter_table('yugicards', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('yugicards', schema=None) as batch_op:
        batch_op.drop_column('image')

    with op.batch_alter_table('cardfaces', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(), nullable=False))
        batch_op.drop_column('image')

    op.create_table('imageurls',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('small', sa.VARCHAR(), nullable=True),
    sa.Column('normal', sa.VARCHAR(), nullable=True),
    sa.Column('large', sa.VARCHAR(), nullable=True),
    sa.Column('png', sa.VARCHAR(), nullable=True),
    sa.Column('art_crop', sa.VARCHAR(), nullable=True),
    sa.Column('border_crop', sa.VARCHAR(), nullable=True),
    sa.Column('card_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['card_id'], ['cardfaces.id'], name='fk_imageurls_card_id_cardfaces'),
    sa.PrimaryKeyConstraint('id', name='pk_imageurls')
    )
    op.create_table('yugiimages',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('image_url', sa.VARCHAR(), nullable=True),
    sa.Column('image_url_small', sa.VARCHAR(), nullable=True),
    sa.Column('image_url_cropped', sa.VARCHAR(), nullable=True),
    sa.Column('card_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['card_id'], ['yugicards.id'], name='fk_yugiimages_card_id_yugicards'),
    sa.PrimaryKeyConstraint('id', name='pk_yugiimages')
    )
    # ### end Alembic commands ###
