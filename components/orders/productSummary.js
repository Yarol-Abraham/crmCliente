const ProductSummary = ({ pedido, total }) => {
    return (
        <table className="w-full">
            <thead>
                    <tr>
                        <th className="text-gray-500 text-xs border-b-2 uppercase p-2" >Producto</th>
                        <th className="text-gray-500 text-xs border-b-2 uppercase p-2">Cantidad</th>
                    </tr>
            </thead>
            <tbody>
                { 
                    pedido.map( product => (
                    <tr key={product._id}>
                        <td className="border-b text-sm text-center font-thin p-2" >{product.nombre}</td>
                        <td className="border-b text-sm text-center font-thin p-2" >{product.cantidad}</td>
                    </tr>
                    )) 
                }
                <tr>
                    <td className="border-b text-sm text-center font-bold p-2">Total</td>
                    <td className="border-b text-sm text-center font-bold p-2">Q {total}</td>
                </tr>
            </tbody>
        </table>
      );
}
 
export default ProductSummary;