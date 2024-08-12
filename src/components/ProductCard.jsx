import { useState } from 'react';
import CloseIcon from '../assets/images/close-icon.svg'

const ProductCard = ({ product, onDelete }) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <div className="w-[300px] rounded-[20px] overflow-hidden hover:shadow-2xl duration-300 shadow-lg m-4 bg-white">
            <img className="object-cover" width={300} height={300} src={product.images[0]} alt={product.title} />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-gray-900">{product.title}</div>
                    <p className="text-gray-700 text-base">
                        Price: ${product.price}
                    </p>
                    <div className="mt-4 flex justify-between">
                        <button 
                            className="bg-red-500  hover:bg-red-700 text-white font-bold py-2 px-4 duration-300 rounded-[10px]" 
                            onClick={() => onDelete(product.id)}>
                            Delete
                        </button>
                        <button 
                            className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 duration-300 rounded-[10px]" 
                            onClick={handleShow}>
                            More
                        </button>
                    </div>
                </div>
            </div>

            {show && (
                <div className="fixed top-0 w-full h-[100vh] backdrop-blur-sm flex items-center justify-center bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg px-8 py-10 relative max-w-lg w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
                            <button 
                                className="duration-300 text-white absolute top-[5px] right-[5px]" 
                                onClick={handleClose}>
                                <img src={CloseIcon} alt="close icon" width={35} height={35} />
                            </button>
                        </div>
                        <p className="text-gray-700">{product.description}</p>
                        <div className="mt-4 flex justify-between">
                            {product.images.slice(1).map((image, index) => (
                                <img key={index} width={220} height={220} src={image} alt={product.title} className="rounded-[10px] object-cover" />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;
