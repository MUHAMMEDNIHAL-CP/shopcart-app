import HomeCard from './HomeCard'

const CardContainer = ({products}) => {
    return (
        <section className="py-4" id='shop'>
            <h4 style={{ textAlign: 'center' }}>Our Products</h4>

            <div className="container px-4 px-lg-5 mt-5" style={{ textAlign: 'center' }}>
                <div className="row justify-content-center">
                    {products.map(product => <HomeCard key={product.id} product={product}/>)}
                    
                </div>
            </div>
        </section>

    )
}

export default CardContainer
