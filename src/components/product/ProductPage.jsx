import { useParams } from "react-router-dom"
import ProductPagePlaceHolder from "./ProductPagePlaceHolder"
import RelatedProducts from "./RelatedProducts"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../api"
import api from "../../api"
import { toast } from "react-toastify"

const ProductPage = ({setNumberCartItems}) => {

    const { slug } = useParams()
    const [product, setProduct] = useState({})
    const [similarProducts, setSimilarProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [inCart, setInCart] = useState(false)
    const cart_code = localStorage.getItem('cart_code')

    useEffect(function () {
        if (product.id) {
            api.get(`product_in_cart/?cart_code=${cart_code}&product_id=${product.id}`)
                .then(res => {
                    console.log(res.data)
                    setInCart(res.data.product_in_cart)
                })
                .catch(err => {
                    console.error(err.message)
                })
        }
    }, [cart_code, product.id])

    const newItem = { cart_code: cart_code, product_id: product.id }

    function add_item() {
        api.post('add_item/', newItem)
            .then(response => {
                console.log(response.data)
                setInCart(true)
                toast.success("Product added to Cart")
                setNumberCartItems(curr => curr + 1)
            }
            )
            .catch(err => {
                console.error(err.message)
            })
    }

    useEffect(function () {
        setLoading(true)
        api.get(`product_detail/${slug}`)
            .then(response => {
                console.log(response.data)
                setProduct(response.data)
                setSimilarProducts(response.data.similar_products)
                setLoading(false)
            })
            .catch(error => {
                console.log(error.message)
                setLoading(false)
            })
    }, [slug])

    if (loading) {
        return <ProductPagePlaceHolder />
    }

    return (
        <div>
            <section className="py-3">
                <div className="container px-3 px-lg-5" style={{ marginTop: '100px' }}>
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-lg-6">
                            <img
                                className="card-img-top mb-5 mb-md-0"
                                src={`${BASE_URL}${product.image}`}
                                style={{ borderRadius: '8px' }}
                                alt="..."
                            />
                        </div>
                        <div className="col-lg-6">
                            <div className="small mb-1">SKU: BST_498</div>
                            <h1 className="display-5 fw-bolder">{product.name}</h1>
                            <div className="fs-5 mb-5">
                                <span>₹{product.price}</span>
                            </div>
                            <p className="lead">{product.description}</p>
                            <div className="d-flex">
                                <button
                                    className="btn btn-outline-dark flex-shrink-0"
                                    type="button"
                                    onClick={add_item}
                                    disabled={inCart}
                                >
                                    <i className="bi-cart-fill me-1"></i>
                                    {inCart ? "Added to cart" : "Add to cart"}
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            <RelatedProducts products={similarProducts} />
        </div>
    )
}

export default ProductPage
