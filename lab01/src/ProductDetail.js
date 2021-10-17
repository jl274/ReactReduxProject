import { Redirect, withRouter } from "react-router";

const ProductDetails = (props) => {

    const givenId = props.match.params.id;

    const productInfo = props.appUserList.filter(x => parseInt(x.id) === parseInt(givenId))
    console.log(productInfo)

    return (
        <div className="detailbox">
            {givenId}
        </div>
    )
}

export default withRouter(ProductDetails);