import React, { Component } from 'react';
import { connect } from 'react-redux';
import items from './../assets/items.json';

class Home extends Component {

    displayItems = () => {
        return (
            items.map(item => {
                return (
                    <div className="card hoverable transparent lighten-5" key={item.id}
                        style={{
                            borderRadius: '4px',
                            marginBottom: '70px'
                        }}
                    >
                        <div className="card-image">
                            <img src={item.img_url} alt={item.name} />
                        </div>

                        <div className="card-content"
                            style={{
                                padding: '10px'
                            }}
                        >
                            <div className="row">
                                <div className="col s7 left-align"
                                    style={{
                                        padding: '0px',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    <b>
                                        {item.name}
                                    </b>
                                </div>
                                <div className="col s2"
                                    style={{
                                        textDecoration: 'line-through'
                                    }}
                                >
                                    {
                                        item.original_price ? `$${item.original_price}` : null
                                    }

                                </div>
                                <div className="col s3 left-align">
                                    <b>
                                        ${item.final_price}.00
                                    </b>

                                </div>
                            </div>
                            <p className="left-align">{item.description}</p>
                            {
                                this.displayCartButtons(item)
                            }
                        </div>
                    </div>
                );
            })
        );
    }

    displayCartButtons = (item) => {

        let selectedItem = this.props.addedItems.find(addedItem => addedItem.id === item.id);

        return selectedItem ? (
            <div className="row teal"
                style={{
                    border: '1px solid teal',
                    borderRadius: '3px',
                    margin: '20px 0px 0px 0px',
                    lineHeight: '35px',
                }}
            >

                <div className="col s4 center-align"
                    onClick={() => this.props.addQuantity(selectedItem)}
                >
                    <i className="tiny material-icons" style={{ verticalAlign: 'middle', paddingBottom: '3px', }}>add</i>
                </div>

                <div className="col s4 center-align white">
                    {selectedItem.quantity}
                </div>
                <div className="col s4 center-align" onClick={() => this.props.removeItemFromCart(selectedItem)}>
                    <i className="tiny material-icons" style={{ verticalAlign: 'middle', paddingBottom: '3px', }}>remove</i>
                </div>
            </div>
        ) : (
                <button className="btn white teal-text"
                    style={{
                        borderRadius: '2px',
                        border: '1px solid teal',
                        width: '100%',
                        marginTop: '20px',
                    }}
                    onClick={() => this.props.addItemToCart({ ...item, quantity: 1 })}
                >Add To Cart</button>
            );
    }


    render() {
        return (
            <div className="container">
                <h5 className="center" style={{ margin: '4vh 0vh 7vh 0vh' }}>
                    <b>Most Popular</b>
                </h5>

                <div className="box">
                    {
                        this.displayItems()
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.cart.addedItems,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (item) => {
            dispatch({ type: 'ADD_ITEM', item: item })
        },
        removeItemFromCart: (item) => {
            dispatch({ type: 'REMOVE_ITEM', item: item })
        },
        addQuantity: (item) => {
            dispatch({ type: 'INCREMENT_QUANTITY', item: item })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);