import Modal from 'react-modal';
import { connect } from 'react-redux';
import { hideToggle } from '../../ducks/toggler/actions';
import { togglerStatus } from '../../ducks/toggler/selectors';
import { getCartByCartId } from "../../ducks/cart/selectors";
import { getProductsLits } from "../../ducks/products/selectors";
import { Form, Formik, Field, ErrorMessage } from "formik";
import '../../styles/Modal.scss';
import { updateCart } from '../../ducks/cart/operations';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  

const UserCartModal = ({userId, isOpen, hideToggle, updateCart, cart, products}) => {

    const initialValues = {
        checked: []
    }

    const handleUpdatingCart = (checked) => {
        const productsMapped = [...cart.products]
        checked.forEach(productId => parseInt(productId));
        checked.forEach(productId => {
            if (productsMapped.find(x => `${x.productId}` === `${productId}`)){
                productsMapped.find(x => `${x.productId}` === `${productId}`).quantity += 1;
            } else {
                productsMapped.push({
                    productId: parseInt(productId),
                    quantity: 1
                })
            }
        });
        console.log(productsMapped)
        const payload = {
            ...cart,
            products: productsMapped
        }
        updateCart(parseInt(cart.id), payload);
        hideToggle("cart-modal");
    }

    return (
        <Modal
            isOpen={isOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={hideToggle}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className="cartModal">
                <h2>Add to cart</h2>
                <button onClick={()=>{hideToggle("cart-modal")}}>close</button>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values)=>handleUpdatingCart(values.checked)}
                >
                    {({ values }) => (
                        <Form>
                        <div id="checkbox-group">Checked</div>
                        <div className="checkboxGroup" role="group" aria-labelledby="checkbox-group">
                            {products.map(product => 
                                <label key={product.id}>
                                <Field type="checkbox" name="checked" value={`${product.id}`} />
                                {product.title}
                                </label>
                            )}
                        </div>
                        <button type="submit">Confirm</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    )
};

const mapStateToProps = (state, otherProps) => {

    const { userId, cartId } = otherProps;
    console.log(cartId)
    return {
        userId,
        isOpen: togglerStatus(state, "cart-modal"),
        cart: getCartByCartId(state, cartId),
        products: getProductsLits(state)
    }
};

const mapDispatchToProps = {
    hideToggle,
    updateCart
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCartModal);