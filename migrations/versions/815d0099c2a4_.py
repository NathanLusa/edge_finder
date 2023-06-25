"""empty message

Revision ID: 815d0099c2a4
Revises: 419394ef4ab5
Create Date: 2023-06-22 17:07:01.700317

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '815d0099c2a4'
down_revision = '419394ef4ab5'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('veiculo', sa.Column('cidade', sa.String(length=100), nullable=True))
    op.execute("update veiculo set cidade = ''")
    op.alter_column('veiculo', 'cidade', nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('veiculo', 'cidade')
    # ### end Alembic commands ###