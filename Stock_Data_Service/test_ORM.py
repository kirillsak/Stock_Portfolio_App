from portfolio import Portfolio
from stock import Stock


def test_orderline_mapper_can_load_lines(session):
    session.execute(
        "INSERT INTO portfolios (id, name) VALUES "
        '(1, "Fund1"),'
        '(2, "Fund2"),'
        '(3, "Fund3")'
    )
    session.commit()

    portfolios = session.query(Portfolio).order_by(Portfolio.id).all()

    assert len(portfolios) == 3
    assert portfolios[0].name == "Fund1"
    assert portfolios[1].name == "Fund2"
    assert portfolios[2].name == "Fund3"
