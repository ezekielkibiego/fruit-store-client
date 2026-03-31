import { useAuth } from "../context/AuthContext";

const emojis = {
    apple: '🍎',
    banana: '🍌',
    orange: '🍊',
    grape: '🍇',
    strawberry: '🍓',
    pineapple: '🍍',
    watermelon: '🍉',
};

const getEmoji = (name) => {
    const key = name?.toLowerCase();
    return emojis[key] || '🍑';
};


const FruitCard = ({ fruit, onEdit, onDelete }) => {
    const { isAdmin } = useAuth();

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-8 text-center">
                <div className="text-6xl">{getEmoji(fruit.name)}</div>
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{fruit.name}</h3>
                <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Price:</span>
                        <span className="text-xl font-bold text-orange-600">Ksh {fruit.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Quantity:</span>
                        <span className={`font-semibold ${fruit.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {fruit.quantity} {fruit.quantity === 1 ? 'item' : 'items'}
                        </span>
                    </div>
                </div>
                {isAdmin && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(fruit)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(fruit._id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FruitCard