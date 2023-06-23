import { products } from sheetdata

export default function handler(req, res) {
    const { productId } = req.query
    const product = products.find( product => product.productId === parseInt(productId))
    res.status(200).json(product)
}